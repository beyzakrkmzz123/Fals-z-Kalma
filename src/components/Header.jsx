import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Header() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [user, setUser] = useState(null);

  const profileRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowLangMenu(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="w-full bg-[#0B0B17] px-8 py-4 flex justify-between items-center text-white sticky top-0 z-50">
      {/* LOGO */}
      <div className="flex items-center gap-3 select-none">
        <img
          src={logo}
          alt="Falsız Kalma Logo"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="text-lg font-bold">Falsız Kalma</div>
      </div>

      {/* MENÜ */}
      <div className="flex items-center space-x-8 text-sm font-medium">
        <Link to="/" className="hover:text-purple-400">
          {t("Ana Sayfa")}
        </Link>
        <Link to="/falcilar" className="hover:text-purple-400">
          {t("Falcılar")}
        </Link>
        <Link to="/yapayzeka" className="hover:text-purple-400">
          {t("Yapay Zeka")}
        </Link>
        <Link to="/falturleri" className="hover:text-purple-400">
          {t("Fal Türleri")}
        </Link>

        <Link to="/hakkimizda" className="hover:text-purple-400">
          {t("Hakkımızda")}
        </Link>
        <Link to="/iletisim" className="hover:text-purple-500">
          {t("İletişim")}
        </Link>
      </div>

      {/* SAĞ TARAF */}
      <div className="flex items-center space-x-4 relative">
        {/* DİL */}
        <div className="relative">
          <div
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="border border-gray-400 px-3 py-1 rounded-full cursor-pointer text-sm"
          >
            {t("Dil")}
          </div>

          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-28 bg-black border border-gray-600 rounded-md shadow-lg text-sm">
              <div
                onClick={() => changeLanguage("tr")}
                className="px-4 py-2 hover:bg-purple-600 cursor-pointer"
              >
                Türkçe
              </div>
              <div
                onClick={() => changeLanguage("en")}
                className="px-4 py-2 hover:bg-purple-600 cursor-pointer"
              >
                English
              </div>
            </div>
          )}
        </div>

        {/* AUTH */}
        {!user ? (
          <>
            <Link
              to="/login"
              className="bg-purple-700 px-4 py-2 rounded-full text-sm hover:opacity-90"
            >
              {t("Giriş Yap")}
            </Link>

            <Link
              to="/signup"
              className="border border-gray-400 px-4 py-2 rounded-full text-sm hover:bg-gray-700"
            >
              {t("Üye Ol")}
            </Link>
          </>
        ) : (
          <>
            {/* ⭐ PREMIUM CTA */}
            <Link
              to="/premium"
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90"
            >
              ⭐ Premium Al
            </Link>

            {/* AVATAR */}
            <div className="relative" ref={profileRef}>
              <img
                src={user.profileImage || "https://i.imgur.com/3GvwNBf.png"}
                alt="Avatar"
                className="w-10 h-10 rounded-full border-2 border-purple-500 cursor-pointer object-cover"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              />

              {showProfileMenu && (
                <div className="absolute right-0 mt-3 w-44 bg-black border border-purple-500 rounded-xl shadow-lg overflow-hidden text-sm">
                  <Link
                    to="/profile"
                    onClick={() => setShowProfileMenu(false)}
                    className="block px-4 py-3 hover:bg-purple-700"
                  >
                    Profilim
                  </Link>

                  <Link
                    to="/settings"
                    onClick={() => setShowProfileMenu(false)}
                    className="block px-4 py-3 hover:bg-purple-700"
                  >
                    Ayarlar
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 hover:bg-red-700"
                  >
                    Çıkış Yap
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
