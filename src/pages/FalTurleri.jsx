import React from "react";
import { useTranslation } from "react-i18next";

function FalTurleri() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen relative overflow-hidden text-white flex flex-col items-center justify-center px-6 py-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-purple-600/30 blur-3xl rounded-full animate-morph"></div>
        <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-pink-500/30 blur-3xl rounded-full animate-morph animation-delay-2000"></div>
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-20 animate-ping"
            style={{
              width: Math.random() * 3 + "px",
              height: Math.random() * 3 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animationDelay: Math.random() * 3 + "s",
              animationDuration: 3 + Math.random() * 2 + "s",
            }}
          ></div>
        ))}
      </div>

      <div className="text-4xl md:text-5xl font-extrabold mb-12 relative z-10 bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(168,85,247,0.6)]">
        {t("Fal Türleri")}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl relative z-10">
        <div className="bg-white/10 backdrop-blur-md border border-purple-300/30 shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_50px_rgba(168,85,247,0.5)] transition-all duration-300 rounded-2xl p-6 flex flex-col items-center">
          <img
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh94XQ2NPwrU0HFQ6WlLPttQOPaJpfhED12fCs3i_hnmuWmjNFx9aBwb4ClixXdE0Gs2gVZF3UsXil1JyHly9P48NUvcQnNg4vy9lJ3JXcxgZmUkLEMqvb02iNMNaqlG5Cf_Gteu2wmntC0/s800/kahve-fali-sozlugu.jpg"
            alt="Kahve Falı"
            className="w-full h-60 object-cover rounded-md mb-4"
          />
          <div className="text-purple-100 text-lg font-semibold mb-2">
            {t("Kahve Falı")}
          </div>
          <div className="text-purple-200 text-sm text-center">
            {t("Geleneksel kahve telvesinden geleceği yorumlama sanatı.")}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-purple-300/30 shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_50px_rgba(168,85,247,0.5)] transition-all duration-300 rounded-2xl p-6 flex flex-col items-center">
          <img
            src="https://www.uplifers.com/app/uploads/2021/07/tarot-fali.jpg"
            alt="Tarot Falı"
            className="w-full h-60 object-cover rounded-md mb-4"
          />
          <div className="text-purple-100 text-lg font-semibold mb-2">
            {t("Tarot Falı")} {t("(Yakında...)")}
          </div>
          <div className="text-purple-200 text-sm text-center">
            {t("Kartların sembolleri ile geleceğe dair ipuçları.")}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-purple-300/30 shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_50px_rgba(168,85,247,0.5)] transition-all duration-300 rounded-2xl p-6 flex flex-col items-center">
          <img
            src="https://phebus.s3.eu-north-1.amazonaws.com/products/19389/68.jpg"
            alt="El Falı "
            className="w-full h-60 object-cover rounded-md mb-4"
          />
          <div className="text-purple-100 text-lg font-semibold mb-2">
            {t("El Falı")} {t("(Yakında...)")}
          </div>
          <div className="text-purple-200 text-sm text-center">
            {t("Avuç içindeki çizgilerden yaşam yolunuzu okur.")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FalTurleri;
