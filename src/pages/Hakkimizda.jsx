import React from "react";
import { useTranslation } from "react-i18next";

function Hakkimizda() {
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

      <div className="text-4xl md:text-5xl font-extrabold mb-10 relative z-10 bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(168,85,247,0.6)]">
        {t("Hakkımızda")}
      </div>

      <div className="max-w-4xl w-full p-10 md:p-12 rounded-3xl relative z-10 bg-white/10 backdrop-blur-md border border-purple-300/30 shadow-[0_0_50px_rgba(168,85,247,0.3)]">
        <div className="text-lg leading-relaxed text-purple-100 space-y-6">
          <div>
            {t(
              "Falsız Kalma, kahve falı geleneğini dijital dünyaya taşıyan, yenilikçi ve mistik bir deneyim platformudur.Amacımız, kullanıcılarımıza hem gerçek falcıların ruhsal sezgilerini hem de yapay zekânın objektif analiz gücünü bir arada sunmaktır.Teknolojiyi ruhla buluşturarak her kullanıcının kendi enerjisine, duygularına ve merakına özel bir deneyim yaşamasını istiyoruz."
            )}
          </div>
          <div>
            {t(
              "Gerçek falcılarımız, uzun yıllardır bu alanda deneyim sahibi kişilerden oluşur.Yapay zekâ sistemimiz ise OpenAI destekli altyapıyla saniyeler içinde kişisel yorumlar üretir.Her fal, yalnızca bir tahmin değil bir farkındalık yolculuğudur"
            )}
          </div>

          <div className="italic text-purple-200 font-semibold">
            {t(
              "“Fala inanma ama falsız kalma” sözünden yola çıkarak, hem eğlenceli hem de derin anlamlar taşıyan bir fal deneyimi yaratıyoruz."
            )}
          </div>

          <div>
            {t(
              "Çünkü bizce her fincan, bir hikâye anlatır. Ve her hikâye, biraz da senin enerjini taşır... 🔮"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hakkimizda;
