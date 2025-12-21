import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [kullaniciAdi, setKullaniciAdi] = useState("");
  const [sifre, setSifre] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  const handleLogin = async () => {
    if (!kullaniciAdi || !sifre) {
      alert("Lütfen kullanıcı adı ve şifre girin");
      return;
    }

    try {
      const res = await fetch(
        "https://falsiz-kalma-backend-production.up.railway.app/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: kullaniciAdi,
            password: sifre,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Giriş başarılı!");
        window.location.reload(); // Header için gerekli
        navigate("/");
      } else {
        alert(data.message || "Giriş başarısız.");
      }
    } catch {
      alert("Sunucuya bağlanırken hata oluştu.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-black px-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-purple-300/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(168,85,247,0.3)]">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          {t("Giriş Yap")}
        </h2>

        {/* EMAIL */}
        <div className="mb-5">
          <label className="text-gray-200 font-semibold">{t("E-posta")}</label>
          <input
            type="email"
            className="w-full mt-1 px-4 py-2 bg-transparent border border-white/20 rounded text-white focus:ring-2 focus:ring-purple-500"
            onChange={(e) => setKullaniciAdi(e.target.value)}
          />
        </div>

        {/* ŞİFRE */}
        <div className="mb-6 relative">
          <label className="text-gray-200 font-semibold">{t("Şifre")}</label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full mt-1 px-4 py-2 bg-transparent border border-white/20 rounded text-white focus:ring-2 focus:ring-purple-500 pr-10"
            onChange={(e) => setSifre(e.target.value)}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] cursor-pointer text-purple-300 text-sm select-none"
          >
            {showPassword ? "Gizle" : "Göster"}
          </span>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded font-semibold text-white"
        >
          {t("Giriş Yap")}
        </button>
      </div>
    </div>
  );
}

export default Login;
