import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function SignUp() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [kullaniciAdi, setKullaniciAdi] = useState("");
  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    if (!kullaniciAdi || !email || !sifre) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: kullaniciAdi,
          email,
          password: sifre,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Kayıt başarılı! Giriş yapabilirsiniz.");
        navigate("/login");
      } else {
        alert(data.message || "Kayıt hatası.");
      }
    } catch {
      alert("Sunucu hatası.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-black px-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-purple-300/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(168,85,247,0.3)]">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          {t("Üye Ol")}
        </h2>

        {/* USERNAME */}
        <input
          placeholder="Kullanıcı Adı"
          className="w-full mb-4 px-4 py-2 bg-transparent border border-white/20 rounded text-white focus:ring-2 focus:ring-purple-500"
          onChange={(e) => setKullaniciAdi(e.target.value)}
        />

        {/* EMAIL */}
        <input
          placeholder="E-posta"
          className="w-full mb-4 px-4 py-2 bg-transparent border border-white/20 rounded text-white focus:ring-2 focus:ring-purple-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* ŞİFRE */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Şifre"
            className="w-full px-4 py-2 bg-transparent border border-white/20 rounded text-white focus:ring-2 focus:ring-purple-500 pr-10"
            onChange={(e) => setSifre(e.target.value)}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 cursor-pointer text-purple-300 text-sm select-none"
          >
            {showPassword ? "Gizle" : "Göster"}
          </span>
        </div>

        <button
          onClick={handleSignup}
          className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded font-semibold text-white"
        >
          {t("Üye Ol")}
        </button>

        <div className="text-center text-sm text-purple-300 mt-4 cursor-pointer hover:underline">
          <span onClick={() => navigate("/login")}>
            {t("Zaten üye misiniz? Giriş yapın")}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
