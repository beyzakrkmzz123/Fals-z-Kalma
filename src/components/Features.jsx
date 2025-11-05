import React from "react";
import { useTranslation } from "react-i18next";

function Features() {
  const { t } = useTranslation();
  return (
    <div
      className="relative bg-gradient-to-b from-[#3B0764] via-[#312E81] to-[#0F172A] py-20 px-6 text-center text-white select-none"
      id="features"
    >
      <div className="absolute top-[-60px] left-[15%] w-[250px] h-[250px] bg-pink-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-80px] right-[10%] w-[200px] h-[200px] bg-indigo-500/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 text-3xl font-bold mb-10">
        {t("Öne Çıkan Özellikler")}
        <div className="h-1 w-20 bg-gradient-to-r from-pink-400 to-indigo-400 rounded mt-2 mx-auto"></div>
      </div>

      <div className="relative z-10 grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-[0_0_25px_rgba(168,85,247,0.3)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] transition duration-500 cursor-default">
          <div className="text-pink-400 text-4xl mb-4">🔮</div>
          <div className="font-semibold mb-3 text-lg">
            {t("Gerçek Falcılar")}
          </div>
          <div className="text-gray-200 text-sm leading-relaxed">
            {t("Alanında deneyimli yorumcular ile kişisel fallar.")}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-[0_0_25px_rgba(168,85,247,0.3)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] transition duration-500 cursor-default">
          <div className="text-pink-400 text-4xl mb-4">⚡</div>
          <div className="font-semibold mb-3 text-lg">{t("Yapay Zeka")}</div>
          <div className="text-gray-200 text-sm leading-relaxed">
            {t(
              "OpenAI destekli sistemle saniyeler içinde detaylı fal yorumları."
            )}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-[0_0_25px_rgba(168,85,247,0.3)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] transition duration-500 cursor-default">
          <div className="text-pink-400 text-4xl mb-4">📳</div>
          <div className="font-semibold mb-3 text-lg">
            {t("Anlık Bildirim")}
          </div>
          <div className="text-gray-200 text-sm leading-relaxed">
            {t("Falın hazır olduğunda telefonuna bildirim gelir.")}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-[0_0_25px_rgba(168,85,247,0.3)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] transition duration-500 cursor-default">
          <div className="text-pink-400 text-4xl mb-4">☕️</div>
          <div className="font-semibold mb-3 text-lg">{t("Geçmiş Fallar")}</div>
          <div className="text-gray-200 text-sm leading-relaxed">
            {t("Önceki fallarını tekrar oku, kaybetme.")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
