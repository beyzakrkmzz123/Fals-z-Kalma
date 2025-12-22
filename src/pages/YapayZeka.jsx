import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function YapayZeka() {
  const { t } = useTranslation();

  const [images, setImages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isSending, setIsSending] = useState(false);

  // 🔐 BACKEND'DEN GELEN DEĞERLER
  const [dailyFalLimit, setDailyFalLimit] = useState(null);
  const [isPremium, setIsPremium] = useState(false);

  // (senin mevcut sistemin – bozulmadı)
  const MAX_QUESTIONS = 2;
  const [questionCount, setQuestionCount] = useState(0);

  // 🔥 KULLANICI BİLGİLERİ
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(
      "https://falsiz-kalma-backend-production.up.railway.app/api/auth/me",
      {
        headers: { Authorization: "Bearer " + token },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDailyFalLimit(data.user.dailyFalLimit);
          setIsPremium(data.user.isPremium);
        }
      });
  }, []);

  const uploadImagesToServer = async (images) => {
    const token = localStorage.getItem("token");
    console.log("TOKEN:", token);
    console.log(
      "FETCH URL:",
      "https://falsiz-kalma-backend-production.up.railway.app/api/image/upload-multiple"
    );

    const formData = new FormData();

    images.forEach((img) => {
      formData.append("images", img.file);
    });

    const res = await fetch(
      "https://falsiz-kalma-backend-production.up.railway.app/api/image/upload-multiple",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      }
    );

    const data = await res.json();
    return data.urls || [];
  };

  const isOnlyThanks = (text) => {
    const t = text.toLowerCase().trim();
    return (
      t.includes("teşekkür") ||
      t.includes("tesekkur") ||
      t.includes("sağ ol") ||
      t.includes("sag ol") ||
      t === "ok" ||
      t === "tamam"
    );
  };

  const handleSend = async () => {
    if (dailyFalLimit === 0) return;
    if (questionCount >= MAX_QUESTIONS) return;
    if (images.length === 0 && inputText.trim() === "") return;

    // kullanıcı mesajı
    if (inputText.trim() !== "") {
      setMessages((prev) => [...prev, { role: "user", text: inputText }]);
    }

    // 🙏 teşekkürse AI çağırma
    if (isOnlyThanks(inputText)) {
      setInputText("");
      return;
    }

    setQuestionCount((prev) => prev + 1);
    setIsSending(true);

    let uploadedImageUrls = [];
    if (images.length > 0) {
      uploadedImageUrls = await uploadImagesToServer(images);
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://falsiz-kalma-backend-production.up.railway.app/api/openai/comment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            question: inputText,
            imageUrls: uploadedImageUrls,
            falTuru: "Kahve Falı",
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setMessages((prev) => [...prev, { role: "ai", text: data.answer }]);

        // 🔥 frontend tarafında hak düşür
        if (!isPremium) {
          setDailyFalLimit((prev) => prev - 1);
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Bir hata oluştu ❌" },
      ]);
    }

    setInputText("");
    setIsSending(false);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    if (!isPremium && files.length > 1) {
      alert("Sadece Premium kullanıcılar birden fazla fotoğraf yükleyebilir.");
      return;
    }

    const selectedImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...selectedImages]);
  };

  const removeImage = () => setImages([]);

  const limitBitti = dailyFalLimit === 0;

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white flex flex-col items-center px-6 py-20">
      <div className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-300 bg-clip-text text-transparent">
        Yapay Zekaya Fal Baktır
      </div>

      {/* 🔐 HAK BİLGİSİ */}
      {dailyFalLimit !== null && (
        <div className="text-sm text-purple-300 mb-6">
          {isPremium
            ? "💎 Premium kullanıcı — sınırsız fal"
            : `Günlük kalan fal hakkı: ${dailyFalLimit}`}
        </div>
      )}

      <div className="bg-white/10 p-8 rounded-2xl border border-purple-500 w-full max-w-md text-center">
        {limitBitti && !isPremium && (
          <div className="mb-4 text-sm text-pink-300">
            Günlük fal hakkın doldu ✨ <br />
            Premium’a geçerek sınırsız fal bakabilirsin.
          </div>
        )}

        <>
          <label
            htmlFor="fileInput"
            className={`cursor-pointer px-6 py-3 rounded-full font-semibold ${
              limitBitti
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-pink-500"
            }`}
          >
            {images.length === 0 ? "Fotoğraf Yükle" : "➕ Fotoğraf Ekle"}
          </label>

          <input
            id="fileInput"
            type="file"
            accept="image/*"
            multiple={isPremium}
            onChange={handleImageUpload}
            className="hidden"
            disabled={limitBitti}
          />
        </>

        <div className="text-xs text-purple-300 mt-4 italic">
          Not: En fazla 1 fotoğraf. Premium’da daha fazlası ✨
        </div>

        {images.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-3">
            {images.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={img.url}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() =>
                    setImages((prev) => prev.filter((_, index) => index !== i))
                  }
                  className="absolute top-1 right-1 bg-black/60 px-2 py-1 rounded text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex mt-6">
          <input
            type="text"
            disabled={limitBitti}
            placeholder={limitBitti ? "Fal hakkın doldu" : "Sorunu yaz..."}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 p-3 rounded-l-lg bg-transparent border border-purple-600"
          />
          <button
            onClick={handleSend}
            disabled={isSending || limitBitti}
            className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 rounded-r-lg disabled:opacity-50"
          >
            Gönder
          </button>
        </div>
      </div>

      {/* CHAT */}
      <div className="mt-12 w-full max-w-4xl bg-white/10 border border-purple-600 rounded-2xl p-6 h-96 overflow-y-auto">
        {messages.length === 0 && (
          <div className="text-center text-purple-300">
            Falın burada görünecek...
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={msg.role === "user" ? "text-right" : "text-left"}
          >
            <div
              className={`inline-block px-4 py-2 rounded-lg mb-2 ${
                msg.role === "user"
                  ? "bg-purple-600 rounded-br-none"
                  : "bg-purple-800/50 rounded-bl-none"
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

export default YapayZeka;
