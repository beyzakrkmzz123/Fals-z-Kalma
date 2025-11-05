import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [kullaniciAdi, setKullaniciAdi] = useState("");
  const [sifre, setSifre] = useState("");

  const handleLogin = () => {
    if (kullaniciAdi && sifre) {
      navigate("/");
    } else {
      alert("Lütfen kullanıcı adı ve şifre girin");
    }
  };

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

      <div className="max-w-md w-full p-8 rounded-3xl relative z-10 bg-white/10 backdrop-blur-md border border-purple-300/30 shadow-[0_0_50px_rgba(168,85,247,0.3),0_0_18px_rgba(255,255,255,0.06)] select-none">
        <div className="text-2xl font-bold mb-6 text-center text-white">
          {t("Giriş Yap")}
        </div>

        <div className="flex flex-col mb-6">
          <div className="text-gray-200/90 mb-1 font-semibold">
            {t("Kullanıcı Adı")}
          </div>
          <div
            contentEditable
            className="border border-white/20 bg-transparent rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[38px] text-white"
            onInput={(e) => setKullaniciAdi(e.currentTarget.textContent)}
            role="textbox"
            spellCheck="false"
          ></div>
        </div>

        <div className="flex flex-col mb-6">
          <div className="text-gray-200/90 mb-1 font-semibold">
            {t("Şifre")}
          </div>
          <input
            type="password"
            className="border border-white/20 bg-transparent rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
            onChange={(e) => setSifre(e.target.value)}
          />
        </div>

        <div
          onClick={handleLogin}
          className="cursor-pointer w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded text-center select-none"
        >
          {t("Giriş Yap")}
        </div>
      </div>
    </div>
  );
}

export default Login;
