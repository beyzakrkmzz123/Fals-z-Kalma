import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function FalciDetay() {
  const { id } = useParams();
  const { t } = useTranslation();

  const [images, setImages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [falResult, setFalResult] = useState("");

  const falMesajlari = [
    t(
      "Kahvenin ortasında bir kalp var... Yakında aşk hayatında güzel gelişmeler olabilir "
    ),
    t("Bir yol görünmüş! Uzaklardan beklediğin haber yakında gelebilir "),
    t(
      "Kahve falında bir göz belirdi... Etrafında seni kıskanan biri olabilir "
    ),
    t("Para sembolleri görünüyor, maddi bir kazanç seni bulacak "),
    t("Bir kuş şekli var! Uzaktan gelen güzel bir haber kapıda "),
    t("Yıldızlar parlıyor, şanslı bir döneme giriyorsun "),
    t("Kahvenin dibinde bir gül açmış, kalbini ısıtacak bir haber var "),
    t("Bir dalga şekli görünüyor... Duyguların çok yoğun bir dönemdesin "),
    t("Kahve falında bir yüz beliriyor... Geçmişten biri seni hâlâ düşünüyor "),
    t("Bir anahtar şekli var! Yeni bir fırsat kapısı açılmak üzere "),
  ];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 3) {
      alert(t("En fazla 3 fotoğraf yükleyebilirsin ☕"));
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

  const sendToFalci = () => {
    if (images.length === 0) {
      alert(t("Lütfen en az bir fotoğraf yükle!"));
      return;
    }

    setIsSending(true);
    setFalResult("");

    setTimeout(() => {
      setIsSending(false);

      const randomIndex = Math.floor(Math.random() * falMesajlari.length);
      const randomFal = falMesajlari[randomIndex];

      setFalResult(randomFal);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-16 px-6 bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white">
      <div className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-300 bg-clip-text text-transparent">
        {t("Falcı")} #{id}
      </div>

      <div className="bg-white/10 p-8 rounded-2xl border border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.4)] text-center w-full max-w-md">
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

        {images.length > 0 && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative group rounded-lg overflow-hidden border border-purple-600 shadow-md"
              >
                <img
                  src={img.url}
                  alt={t(`Yüklenen ${index + 1}`)}
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

        <div className="text-sm text-purple-300 mt-6 italic">
          {t(
            "Not: En fazla 3 fotoğraf yükleyebilirsin. Daha fazla yükleme için Premium üyelik yakında!"
          )}
        </div>

        <button
          onClick={sendToFalci}
          className="mt-8 bg-gradient-to-r from-purple-500 to-pink-600 px-8 py-3 rounded-full font-semibold hover:opacity-90 transition"
          disabled={isSending}
        >
          {isSending ? t("Falcıya Gönderiliyor...") : t(" Falcıya Gönder")}
        </button>
      </div>

      <div className="mt-10 w-full max-w-2xl bg-white/10 backdrop-blur-lg border border-purple-600 rounded-2xl p-6">
        {isSending && (
          <div className="text-purple-300 text-center animate-pulse">
            {t("🔮 Falcı kahveni inceliyor...")}
          </div>
        )}
        {falResult && (
          <div className="text-left bg-purple-800/50 p-4 rounded-lg text-purple-100">
            <strong>{t("Falcı")}:</strong> {falResult}
          </div>
        )}
      </div>
    </div>
  );
}

export default FalciDetay;
