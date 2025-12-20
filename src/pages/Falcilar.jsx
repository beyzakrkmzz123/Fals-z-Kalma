import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// ✅ Yerel görseller
import ayseImg from "../assets/ayse.jpg";
import mehmetImg from "../assets/mehmet.jpg";
import zeynepImg from "../assets/zeynep.jpg";

function Falcilar() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // 🔐 Giriş yapan kullanıcı
  const [user, setUser] = useState(null);

  // ✅ “Yarı gerçek” falcılar (AI karakter)
  const [falcilar, setFalcilar] = useState([]);

  // 🔹 Falcı listesi
  useEffect(() => {
    setFalcilar([
      {
        id: "ayse",
        name: "Ayşe",
        style: "romantik",
        info: t("Romantik ve yumuşak yorumlar yapar 💖"),
        image: ayseImg,
        isPremium: false,
      },
      {
        id: "mehmet",
        name: "Mehmet",
        style: "net",
        info: t("Net, kısa ve direkt konuşur ⚡"),
        image: mehmetImg,
        isPremium: false,
      },
      {
        id: "zeynep",
        name: "Zeynep",
        style: "spirituel",
        info: t("Spiritüel, enerjisel yorumlar yapar 🔮"),
        image: zeynepImg,
        isPremium: true, // 💎 Premium falcı
      },
    ]);
  }, [t]);

  // 🔹 Kullanıcıyı backend’den çek
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5000/api/auth/me", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUser(data.user);
      })
      .catch(() => {});
  }, []);

  // 🔒 Falcı tıklama kontrolü
  const handleFalciClick = (falci) => {
    // Premium falcı kontrolü
    if (falci.id === "zeynep" && !user?.isPremium) {
      alert("🔒 Bu falcı sadece Premium kullanıcılar içindir.");
      return;
    }

    navigate(`/falci/${falci.id}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white flex flex-col items-center px-6 py-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-black">
      {/* Arka plan efektleri */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-purple-600/30 blur-3xl rounded-full animate-morph"></div>
        <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-pink-500/30 blur-3xl rounded-full animate-morph animation-delay-2000"></div>
      </div>

      <div className="text-4xl md:text-5xl font-extrabold mb-4 relative z-10 bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(168,85,247,0.6)]">
        {t("Falcılar")}
      </div>

      <div className="text-purple-200 mb-10 italic text-center relative z-10 max-w-2xl">
        {t(
          "Seçtiğin falcıya fincanını gönder, senin için özel yorum yapsın ✨"
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl relative z-10 w-full">
        {falcilar.map((falci) => (
          <div
            key={falci.id}
            onClick={() => handleFalciClick(falci)}
            className="bg-white/10 backdrop-blur-md border border-purple-300/30 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_60px_rgba(168,85,247,0.6)] transition-all duration-500 p-6 flex flex-col items-center cursor-pointer hover:scale-105"
          >
            <div className="w-full flex justify-between items-center mb-3">
              <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-purple-400/30">
                {falci.style === "romantik"
                  ? "💖 Romantik"
                  : falci.style === "net"
                  ? "⚡ Net"
                  : "🔮 Spiritüel"}
              </span>

              {falci.isPremium && (
                <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-300/40 text-yellow-200">
                  💎 Premium
                </span>
              )}
            </div>

            <div className="relative w-32 h-32 mb-4">
              <div className="absolute inset-0 rounded-full blur-xl bg-purple-500/30 animate-pulse"></div>
              <img
                src={falci.image}
                alt={falci.name}
                className="relative w-full h-full object-cover rounded-full border-4 border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.5)]"
              />
            </div>

            <div className="text-purple-100 text-xl font-semibold mb-2">
              {falci.name}
            </div>

            <div className="text-purple-200 text-sm text-center italic">
              {falci.info}
            </div>

            <div className="mt-5 text-xs text-purple-300">
              {t("Tıkla ve fal gönder")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Falcilar;
