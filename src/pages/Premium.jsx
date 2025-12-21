import React from "react";
import { useNavigate } from "react-router-dom";

function Premium() {
  const navigate = useNavigate();

  const plans = [
    {
      id: "basic",
      title: "Başlangıç",
      price: "₺29 / ay",
      features: ["Günde 5 fal", "1 fotoğraf", "Standart AI yorum"],
    },
    {
      id: "pro",
      title: "Premium",
      price: "₺79 / ay",
      highlight: true,
      features: [
        "Sınırsız fal",
        "3 fotoğraf",
        "Detaylı AI yorum",
        "Özel falcılar",
      ],
    },
    {
      id: "vip",
      title: "VIP",
      price: "₺149 / ay",
      features: [
        "Sınırsız fal",
        "Sınırsız fotoğraf",
        "Öncelikli fal",
        "Premium falcılar",
      ],
    },
  ];

  const handleBuy = async (planId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      // 🔹 Premium satın alma (mock)
      const res = await fetch(
        "https://falsiz-kalma-backend-production.up.railway.app/api/payment/premium",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({ plan: planId }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Premium alınamadı");
        return;
      }

      // 🔄 GÜNCEL KULLANICIYI TEKRAR ÇEK
      const meRes = await fetch(
        "https://falsiz-kalma-backend-production.up.railway.app/api/auth/me",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const meData = await meRes.json();
      if (meData.success) {
        localStorage.setItem("user", JSON.stringify(meData.user));
      }

      alert("🎉 Premium aktif edildi!");
      navigate("/profile");
    } catch (err) {
      console.error("Premium satın alma hatası:", err);
      alert("Sunucu hatası");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-300 bg-clip-text text-transparent">
        Premium Üyelik
      </h1>

      <p className="text-center text-purple-200 mb-12">
        Daha fazla fal, daha detaylı yorumlar ve özel falcılar ✨
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-2xl p-6 border backdrop-blur-md shadow-lg ${
              plan.highlight
                ? "bg-white/20 border-pink-400 scale-105"
                : "bg-white/10 border-purple-400/40"
            }`}
          >
            <h2 className="text-2xl font-semibold mb-2 text-center">
              {plan.title}
            </h2>

            <div className="text-center text-3xl font-bold mb-4">
              {plan.price}
            </div>

            <ul className="space-y-2 mb-6 text-purple-100 text-sm">
              {plan.features.map((f, i) => (
                <li key={i}>✔ {f}</li>
              ))}
            </ul>

            <button
              onClick={() => handleBuy(plan.id)}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 py-3 rounded-full font-semibold hover:opacity-90 transition"
            >
              Satın Al
            </button>
          </div>
        ))}
      </div>

      <div className="text-center text-xs text-purple-300 mt-10">
        * Ödeme şu an simüle edilmektedir. Gerçek ödeme altyapısı hazırdır.
      </div>
    </div>
  );
}

export default Premium;
