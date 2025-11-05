import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Header() {
  const { t, i18n } = useTranslation();
  const [showLangMenu, setShowLangMenu] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowLangMenu(false);
  };

  return (
    <div className="w-full bg-[#0B0B17] px-8 py-4 flex justify-between items-center text-white select-none sticky top-0 z-50">
      <div className="flex items-center gap-3 cursor-pointer select-none">
        <img
          src={logo}
          alt="Falsız Kalma Logo"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="text-lg font-bold text-white">Falsız Kalma</div>
      </div>

      <div className="flex items-center space-x-8 text-sm font-medium">
        <Link to="/" className="hover:text-purple-400 cursor-pointer">
          {t("Ana Sayfa")}
        </Link>
        <Link to="/falcilar" className="hover:text-purple-400 cursor-pointer">
          {t("Falcılar")}
        </Link>
        <Link to="/yapayzeka" className="hover:text-purple-400 cursor-pointer">
          {t("Yapay Zeka")}
        </Link>
        <Link to="/falturleri" className="hover:text-purple-400 cursor-pointer">
          {t("Fal Türleri")}
        </Link>
        <Link to="/hakkimizda" className="hover:text-purple-400 cursor-pointer">
          {t("Hakkımızda")}
        </Link>
        <Link to="/iletisim" className="hover:text-purple-500 cursor-pointer">
          {t("İletişim")}
        </Link>
      </div>

      <div className="flex items-center space-x-4 relative">
        <div className="relative">
          <div
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="border border-gray-400 px-3 py-1 rounded-full hover:bg-gray-700 text-sm cursor-pointer select-none"
          >
            {t("Dil")}
          </div>

          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-28 bg-black border border-gray-600 rounded-md shadow-lg text-sm">
              <div
                className={`px-4 py-2 cursor-pointer hover:bg-purple-600 ${
                  i18n.language === "tr" ? "bg-purple-700" : ""
                }`}
                onClick={() => changeLanguage("tr")}
              >
                Türkçe
              </div>
              <div
                className={`px-4 py-2 cursor-pointer hover:bg-purple-600 ${
                  i18n.language === "en" ? "bg-purple-700" : ""
                }`}
                onClick={() => changeLanguage("en")}
              >
                English
              </div>
            </div>
          )}
        </div>

        <Link
          to="/login"
          className="bg-gradient-to-r from-purple-500 to-purple-800 px-4 py-2 rounded-full font-semibold hover:opacity-90 cursor-pointer select-none"
        >
          {t("Giriş Yap")}
        </Link>
        <Link
          to="/signup"
          className="border border-gray-400 px-4 py-2 rounded-full hover:bg-gray-700 cursor-pointer select-none"
        >
          {t("Üye Ol")}
        </Link>
      </div>
    </div>
  );
}

export default Header;
