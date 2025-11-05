import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Hero() {
  const { t } = useTranslation();

  return (
    <div className="relative bg-gradient-to-br from-[#3B0764] via-[#6D28D9] to-[#0F172A] text-white text-center px-4 py-28 select-none overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-purple-500/30 blur-3xl rounded-full animate-morph"></div>
        <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-pink-500/30 blur-3xl rounded-full animate-morph animation-delay-2000"></div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-12 relative z-10">
        <Link
          to="/yapayzeka"
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          {t("Yapay Zekaya Fal Baktır")}
        </Link>

        <div className="relative p-6 rounded-full shadow-[0_0_40px_rgba(168,85,247,0.7)] hover:shadow-[0_0_60px_rgba(168,85,247,0.9)] transition-all duration-700 animate-pulse-slow">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/30 to-pink-400/30 blur-2xl animate-spin-slow"></div>
          <div className="absolute inset-0 bg-purple-400/20 blur-3xl rounded-full"></div>

          <img
            src={logo}
            alt="Falsız Kalma Logo"
            className="object-contain w-64 h-64 md:w-72 md:h-72 relative z-10 drop-shadow-lg transition-transform duration-700 hover:scale-110"
          />
        </div>

        <Link
          to="/falcilar"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          {t("Gerçek Falcılara Fal Baktır")}
        </Link>
      </div>

      <div className="text-5xl font-extrabold mb-4 drop-shadow-lg text-white relative z-10">
        {t("Fala İnanma, Falsız Kalma 🔮")}
      </div>

      <div className="text-lg max-w-xl mx-auto leading-relaxed drop-shadow-md relative z-10 px-4">
        {t(
          "Kahve fincanını yükle, dakikalar içinde falın cebinde. Gerçek falcılar ve yapay zekâ destekli yorumlar seni bekliyor."
        )}
      </div>

      <div className="absolute inset-0 overflow-hidden">
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
    </div>
  );
}

export default Hero;
