import React, { useMemo, useState, useEffect } from "react"; // useEffect eklendi
import { useParams } from "react-router-dom"; // Link eklendi
import { useTranslation } from "react-i18next";

// ✅ Yerel görseller
import ayseImg from "../assets/ayse.jpg";
import mehmetImg from "../assets/mehmet.jpg";
import zeynepImg from "../assets/zeynep.jpg";

function FalciDetay() {
  const { id } = useParams();
  const { t } = useTranslation();

  const [images, setImages] = useState([]);
  const [messages, setMessages] = useState([]); // chat
  const [inputText, setInputText] = useState("");
  const [isSending, setIsSending] = useState(false);

  // ✅ soru hakkı (Mesaj bazlı limit)
  const MAX_QUESTIONS = 2;
  const askedCount = useMemo(
    () => messages.filter((m) => m.role === "user").length,
    [messages]
  );

  // ✅ falcı verisi
  const falci = useMemo(() => {
    const map = {
      ayse: {
        id: "ayse",
        name: "Ayşe",
        style: "romantik",
        image: ayseImg,
        isPremium: false,
      },
      mehmet: {
        id: "mehmet",
        name: "Mehmet",
        style: "net",
        image: mehmetImg,
        isPremium: false,
      },
      zeynep: {
        id: "zeynep",
        name: "Zeynep",
        style: "spirituel",
        image: zeynepImg,
        isPremium: true,
      },
    };
    return map[id];
  }, [id]);

  // ✅ Falci bulunamazsa (route yanlışsa) sayfa patlamasın
  if (!falci) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white px-6">
        <div className="bg-white/10 border border-purple-500/40 rounded-2xl p-6 max-w-md w-full text-center">
          <div className="text-2xl font-bold mb-2">❌</div>
          <div className="text-purple-100 font-semibold">
            {t("Falcı bulunamadı")}
          </div>
          <div className="text-purple-300 text-sm mt-2">
            {t("URL doğru mu? Örn: /falci/ayse")}
          </div>
        </div>
      </div>
    );
  }

  // ✅ avatar animasyon
  const avatarRing = isSending
    ? "shadow-[0_0_45px_rgba(168,85,247,0.85)] animate-pulse"
    : "shadow-[0_0_25px_rgba(168,85,247,0.5)]";

  // ✅ Foto seç
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImages([
      {
        file,
        url: URL.createObjectURL(file),
      },
    ]);
  };

  const removeImage = () => setImages([]);

  // ✅ Cloudinary upload
  const uploadImageToServer = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      "https://falsiz-kalma-backend-production.up.railway.app/api/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    if (!data?.success) throw new Error("Cloudinary upload failed");
    return data.url;
  };

  // ✅ Fal gönder (AI)
  const sendToFalci = async () => {
    if (!images && inputText.trim() === "") {
      alert(t("Lütfen 1 fotoğraf yükle veya soru yaz!"));
      return;
    }

    if (askedCount >= MAX_QUESTIONS) {
      alert(t("Soru hakkın doldu ✨"));
      return;
    }

    setIsSending(true);

    // kullanıcı mesajı
    if (inputText.trim() !== "") {
      setMessages((prev) => [...prev, { role: "user", text: inputText }]);
    } else {
      setMessages((prev) => [
        ...prev,
        { role: "user", text: t("Fotoğraf gönderdim, yorumlar mısın?") },
      ]);
    }

    let uploadedImageUrl = null;

    try {
      if (images.length > 0) {
        uploadedImageUrl = await uploadImageToServer(images[0].file);
      }
    } catch (e) {
      console.error("Fotoğraf yükleme hatası:", e);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: t("Fotoğraf yüklenirken hata oluştu ❌") },
      ]);
      setIsSending(false);
      return;
    }

    // AI çağrısı
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://falsiz-kalma-backend-production.up.railway.app/api/openai/comment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: "Bearer " + token } : {}),
          },
          body: JSON.stringify({
            question: inputText || "",
            imageUrl: uploadedImageUrl,
            falTuru:
              falci.style === "romantik"
                ? "Aşk Falı"
                : falci.style === "net"
                ? "Genel Fal"
                : "Spiritüel Fal",
          }),
        }
      );

      const data = await res.json();

      // 🔴 BACKEND KONTROLLERİ
      if (!res.ok) {
        if (data.code === "AI_LIMIT_EXCEEDED") {
          alert(
            "Günlük yapay zeka fal hakkın doldu ✨ Premium’a geçebilirsin."
          );
          setIsSending(false);
          return;
        }

        alert(data.message || "Fal oluşturulamadı ❌");
        setIsSending(false);
        return;
      }

      if (data?.success) {
        const personaPrefix =
          falci.style === "romantik"
            ? `💖 ${falci.name}: `
            : falci.style === "net"
            ? `⚡ ${falci.name}: `
            : `🔮 ${falci.name}: `;

        const finalText =
          falci.style === "net"
            ? personaPrefix + data.answer.split("\n").slice(0, 6).join("\n")
            : personaPrefix + data.answer;

        setMessages((prev) => [...prev, { role: "ai", text: finalText }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "ai", text: t("AI yorum üretirken hata oluştu ❌") },
        ]);
      }
    } catch (e) {
      console.error("OpenAI hata:", e);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: t("Sunucu hatası ❌") },
      ]);
    }

    setInputText("");
    setIsSending(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-16 px-6 bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white">
      {/* Başlık */}
      <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-300 bg-clip-text text-transparent text-center">
        {falci.name} —{" "}
        {falci.style === "romantik"
          ? t("Romantik")
          : falci.style === "net"
          ? t("Net & Kısa")
          : t("Spiritüel")}
      </div>

      <div className="text-purple-200 mb-8 italic text-center max-w-2xl">
        {falci.isPremium
          ? t("💎 Premium falcı: Daha detaylı ve özel yorumlar yapar.")
          : t("Fotoğrafını gönder, falcı yorumlasın ✨")}
      </div>

      {/* Üst kart */}
      <div className="bg-white/10 p-8 rounded-2xl border border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.4)] text-center w-full max-w-2xl">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div
            className={`rounded-full border-4 border-purple-400 ${avatarRing}`}
          >
            <img
              src={falci.image}
              alt={falci.name}
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>

          <div className="text-left">
            <div className="text-purple-100 font-semibold text-lg">
              {falci.name}
            </div>
            <div className="text-purple-300 text-sm">
              {isSending ? t("⏳ Meşgul... kahveni inceliyorum") : t("Hazırım")}
            </div>

            <div className="mt-2 text-xs text-purple-300">
              {t("Soru hakkı")}: {askedCount}/{MAX_QUESTIONS}
            </div>
          </div>
        </div>

        {/* Foto upload */}
        {images.length === 0 ? (
          <>
            <label
              htmlFor="fileInput"
              className="cursor-pointer inline-block bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-full text-white font-semibold hover:opacity-90 transition"
            >
              {t("Fotoğraf Yükle")}
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </>
        ) : (
          <div className="mt-2">
            <div className="relative mx-auto w-full max-w-sm rounded-xl overflow-hidden border border-purple-600 shadow-md">
              <img
                src={images[0].url}
                alt={t("Yüklenen fotoğraf")}
                className="w-full h-56 object-cover"
              />
              <button
                onClick={removeImage}
                className="absolute top-2 right-2 bg-black/60 text-white text-xs px-3 py-1 rounded hover:bg-black/70 transition"
              >
                ✕ {t("Kaldır")}
              </button>
            </div>
          </div>
        )}

        {/* Chat input */}
        <div className="flex mt-6">
          <input
            type="text"
            placeholder={
              askedCount >= MAX_QUESTIONS
                ? t("Soru hakkın doldu")
                : t("Sorunu yaz (opsiyonel)...")
            }
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={askedCount >= MAX_QUESTIONS}
            className="flex-1 p-3 rounded-l-lg bg-transparent border border-purple-600 text-white focus:outline-none"
          />
          <button
            onClick={sendToFalci}
            disabled={isSending || askedCount >= MAX_QUESTIONS}
            className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 rounded-r-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {isSending ? t("Gönderiliyor...") : t("Gönder")}
          </button>
        </div>
      </div>

      {/* Chat alanı */}
      <div className="mt-10 w-full max-w-2xl bg-white/10 backdrop-blur-lg border border-purple-600 rounded-2xl p-6 flex flex-col space-y-4 h-96 overflow-y-auto">
        {messages.length === 0 && (
          <div className="text-purple-300 text-center">
            {t("Fal sohbeti burada görünecek...")}
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={msg.role === "user" ? "text-right" : "text-left"}
          >
            <div
              className={`inline-block max-w-[85%] px-4 py-2 rounded-2xl ${
                msg.role === "user"
                  ? "bg-purple-600 text-white rounded-br-md"
                  : "bg-purple-800/50 text-purple-100 rounded-bl-md"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FalciDetay;
