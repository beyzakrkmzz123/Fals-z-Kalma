import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { useTranslation } from "react-i18next";

function Iletisim() {
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

      <div className="text-4xl font-bold mb-10 relative z-10 bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(168,85,247,0.6)] leading-relaxed">
        {t("İletişim Bilgilerimiz")}
      </div>

      <div className="grid gap-6 w-full max-w-2xl relative z-10">
        <div className="bg-white/10 backdrop-blur-md border border-purple-300/30 shadow-[0_0_30px_rgba(168,85,247,0.3)] p-6 rounded-2xl flex items-center gap-4 hover:shadow-[0_0_50px_rgba(168,85,247,0.5)] transition-all duration-300">
          <div className="bg-purple-400/40 p-3 rounded-full text-white border border-purple-200/40 backdrop-blur-sm">
            <FaLocationDot size={24} />
          </div>
          <div>
            <div className="font-semibold mb-1 text-purple-100">
              {t("Adres")}
            </div>
            <div className="text-purple-200">{t("Muğla, Türkiye")}</div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-purple-300/30 shadow-[0_0_30px_rgba(168,85,247,0.3)] p-6 rounded-2xl flex items-center gap-4 hover:shadow-[0_0_50px_rgba(168,85,247,0.5)] transition-all duration-300">
          <div className="bg-purple-400/40 p-3 rounded-full text-white border border-purple-200/40 backdrop-blur-sm">
            <FaPhone size={24} />
          </div>
          <div>
            <div className="font-semibold mb-1 text-purple-100">
              {t("Telefon")}
            </div>
            <div className="text-purple-200">+90 535 521 8381</div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-purple-300/30 shadow-[0_0_30px_rgba(168,85,247,0.3)] p-6 rounded-2xl flex items-center gap-4 hover:shadow-[0_0_50px_rgba(168,85,247,0.5)] transition-all duration-300">
          <div className="bg-purple-400/40 p-3 rounded-full text-white border border-purple-200/40 backdrop-blur-sm">
            <IoIosMail size={24} />
          </div>
          <div>
            <div className="font-semibold mb-1 text-purple-100">
              {t("E-posta")}
            </div>
            <div className="text-purple-200">info@falsizkalma.com</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Iletisim;
