import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function YapayZeka() {
  const { t } = useTranslation();
  const [images, setImages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 3) {
      alert(t("En fazla 3 fotoğraf yükleyebilirsin !"));
      return;
    }
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSend = () => {
    if (images.length === 0 && inputText.trim() === "") {
      alert(t("Lütfen en az bir fotoğraf yükleyin veya mesaj yazın!"));
      return;
    }

    setIsSending(true);

    if (images.length > 0) {
      setMessages((prev) => [
        ...prev,
        { role: "user", text: t("Fotoğraf(lar) gönderildi") },
      ]);
    }

    if (inputText.trim() !== "") {
      setMessages((prev) => [
        ...prev,
        { role: "user", text: inputText.trim() },
      ]);
      setInputText("");
    }

    setTimeout(() => {
      const fakeReplies = [
        t("Fincanını inceledim, harika bir enerji var"),
        t("Kahvenin ortasında kalp şekli görünüyor"),
        t("Yakında seni heyecanlandıracak güzel bir haber alabilirsin"),
        t("Bugün enerjin çok yüksek görünüyor"),
        t("Falında bir yol gösterici işaret fark ettim"),
      ];
      const randomReply =
        fakeReplies[Math.floor(Math.random() * fakeReplies.length)];
      setMessages((prev) => [...prev, { role: "ai", text: randomReply }]);
      setIsSending(false);
      //setImages([]); // gönderim sonrası fotoğrafları temizle
    }, 2000);
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white flex flex-col items-center px-6 py-20 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-purple-600/30 blur-3xl rounded-full animate-morph"></div>
        <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-pink-500/30 blur-3xl rounded-full animate-morph animation-delay-2000"></div>
      </div>

      <div className="text-5xl font-bold mb-10 relative z-10 bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(168,85,247,0.6)] leading-relaxed">
        {t("Yapay Zekaya Fal Baktır")}
      </div>
      <div className="text-sm text-purple-300 mt-6 italic relative z-10 mb-8">
        {t(
          "Kahve fincanı, tabak veya telve fotoğraflarını yükle veya mesaj yaz. Yapay zekâ enerjini çözümleyecek!"
        )}
      </div>

      <div className="relative z-10 bg-white/10 p-8 rounded-2xl border border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.4)] text-center w-full max-w-md">
        {images.length < 3 && (
          <>
            <label
              htmlFor="fileInput"
              className="cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-full text-white font-semibold hover:opacity-90 transition"
            >
              {t("Fotoğraf Yükle")}
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </>
        )}

        <div className="text-sm text-purple-300 mt-6 italic">
          {t(
            "Not: En fazla 3 fotoğraf yükleyebilirsin. Daha fazla yükleme için Premium üyelik yakında!"
          )}
        </div>

        {images.length > 0 && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative group rounded-lg overflow-hidden shadow-lg border border-purple-600"
              >
                <img
                  src={img.url}
                  alt={`Yüklenen ${index + 1}`}
                  className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
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
            placeholder={t("Mesajını yaz...")}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 p-3 rounded-l-lg bg-transparent border border-purple-600 focus:outline-none text-white"
          />
          <button
            onClick={handleSend}
            disabled={isSending}
            className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 rounded-r-lg hover:opacity-90 transition"
          >
            {isSending ? t("Yapay Zeka Falına Bakıyor...") : t("Gönder")}
          </button>
        </div>
      </div>

      <div className="mt-12 w-full max-w-2xl bg-white/10 backdrop-blur-lg border border-purple-600 rounded-2xl p-6 relative z-10 flex flex-col space-y-4 h-96 overflow-y-auto">
        {messages.length === 0 && (
          <div className="text-purple-300 text-center">
            {t("Falın burada görünecek...")}
          </div>
        )}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${msg.role === "user" ? "text-right" : "text-left"}`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-purple-600 text-white rounded-br-none"
                  : "bg-purple-800/50 text-purple-100 rounded-bl-none"
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
