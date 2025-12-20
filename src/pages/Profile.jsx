import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [fallar, setFallar] = useState([]);
  const [selectedFal, setSelectedFal] = useState(null);

  // 🔥 YENİ: Premium bilgisi
  const [premiumInfo, setPremiumInfo] = useState(null);

  // 🔥 token helper
  const getToken = () => localStorage.getItem("token");

  // 🔥 falları yeniden çek
  const fetchFallar = () => {
    const token = getToken();
    fetch("http://localhost:5000/api/fallar", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setFallar(data.fallar);
      });
  };

  useEffect(() => {
    const token = getToken();

    // Profil bilgisi
    fetch("http://localhost:5000/api/auth/me", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.user);

          // 🔥 Premium state doldur
          setPremiumInfo({
            isPremium: data.user.isPremium,
            plan: data.user.premiumPlan,
            until: data.user.premiumUntil,
            dailyLimit: data.user.dailyFalLimit,
          });
        } else {
          navigate("/login");
        }
      });

    // Fallar
    fetchFallar();
  }, []);

  // ⭐ Favori toggle
  const toggleFavorite = async (fal) => {
    try {
      const token = getToken();
      const res = await fetch(
        `http://localhost:5000/api/fallar/favorite/${fal._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      const data = await res.json();
      if (!data.success) return;

      setFallar((prev) =>
        prev.map((f) =>
          f._id === fal._id ? { ...f, isFavorite: data.fal.isFavorite } : f
        )
      );

      setSelectedFal((prev) =>
        prev && prev._id === fal._id
          ? { ...prev, isFavorite: data.fal.isFavorite }
          : prev
      );
    } catch (e) {
      console.error("Favori güncelleme hatası:", e);
    }
  };

  // 🗑️ Sil
  const deleteFal = async (falId) => {
    try {
      const token = getToken();
      const res = await fetch(`http://localhost:5000/api/fallar/${falId}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
      });

      const data = await res.json();
      if (!data.success) return;

      setFallar((prev) => prev.filter((f) => f._id !== falId));
      setSelectedFal((prev) => (prev && prev._id === falId ? null : prev));
    } catch (e) {
      console.error("Fal silme hatası:", e);
    }
  };

  if (!user)
    return <div className="text-center text-white mt-20">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0d0018] to-[#24003a] text-white px-6 py-16 flex flex-col items-center">
      {/* PROFİL KARTI */}
      <div className="bg-white/10 border border-purple-500/40 rounded-3xl shadow-[0_0_40px_rgba(168,85,247,0.4)] p-8 max-w-2xl w-full text-center backdrop-blur-md">
        <div className="flex justify-center mb-4">
          <img
            src={user.profileImage || "https://i.imgur.com/3GvwNBf.png"}
            className="w-36 h-36 rounded-full border-4 border-purple-500 shadow-[0_0_25px_rgba(168,85,247,0.7)] object-cover"
            alt="Avatar"
          />
        </div>

        <h1 className="text-3xl font-bold">{user.username}</h1>
        <p className="text-purple-300">{user.email}</p>
        <p className="text-sm text-purple-400 mt-1">
          Üyelik Tarihi: {new Date(user.createdAt).toLocaleDateString("tr-TR")}
        </p>

        {/* ⭐ PREMIUM BİLGİSİ (YENİ) */}
        {premiumInfo?.isPremium ? (
          <div className="mt-6 bg-purple-800/40 border border-purple-500 rounded-xl p-4 text-sm text-purple-100">
            <div className="font-semibold mb-1">👑 Premium Üyelik Aktif</div>
            <div>
              Paket: <b>{premiumInfo.plan?.toUpperCase()}</b>
            </div>
            <div>
              Bitiş Tarihi:{" "}
              {new Date(premiumInfo.until).toLocaleDateString("tr-TR")}
            </div>
            <div>Günlük Fal Hakkı: {premiumInfo.dailyLimit}</div>
          </div>
        ) : (
          <div className="mt-6 bg-white/10 border border-purple-400/40 rounded-xl p-4 text-sm">
            <div className="mb-2">👑 Premium değil</div>
            <button
              onClick={() => navigate("/premium")}
              className="bg-gradient-to-r from-purple-500 to-pink-600 px-4 py-2 rounded-full text-sm"
            >
              Premium’a Geç
            </button>
          </div>
        )}

        <div className="flex justify-center gap-4 mt-6">
          <Link
            to="/settings"
            className="px-5 py-2 bg-purple-600/40 border border-purple-400 rounded-xl hover:bg-purple-700 transition"
          >
            Ayarlar
          </Link>

          <button
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            className="px-5 py-2 bg-red-600/40 border border-red-400 rounded-xl hover:bg-red-700 transition"
          >
            Çıkış Yap
          </button>
        </div>
      </div>

      {/* FAL GEÇMİŞİ */}
      <div className="w-full max-w-4xl mt-14">
        <h2 className="text-2xl font-semibold mb-4 text-purple-300">
          Gönderdiğin Fallar
        </h2>

        {fallar.length === 0 ? (
          <p className="text-gray-300">Henüz hiç fal gönderilmemiş ✨</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {fallar.map((fal) => (
              <div
                key={fal._id}
                onClick={() => setSelectedFal(fal)}
                className="cursor-pointer bg-white/10 p-3 border border-purple-600/30 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(fal);
                    }}
                    className="text-xs px-2 py-1 rounded-lg border border-purple-500/40 bg-white/5"
                  >
                    {fal.isFavorite ? "⭐ Favori" : "☆ Favori"}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteFal(fal._id);
                    }}
                    className="text-xs px-2 py-1 rounded-lg border border-red-500/40 bg-white/5 text-red-300"
                  >
                    🗑️ Sil
                  </button>
                </div>

                <img
                  src={fal.image}
                  className="w-full h-40 object-cover rounded-lg"
                  alt="Fal"
                />

                <p className="text-purple-200 text-sm mt-2">
                  {new Date(fal.createdAt).toLocaleString("tr-TR")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {selectedFal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
          onClick={() => setSelectedFal(null)}
        >
          <div
            className="bg-[#12001f] max-w-md w-full rounded-2xl p-6 border border-purple-600"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedFal(null)}
              className="absolute top-3 right-3 text-purple-300"
            >
              ✕
            </button>

            <img
              src={selectedFal.image}
              className="w-full h-56 object-cover rounded-xl mb-4"
              alt="Fal"
            />

            <div className="text-purple-100 text-sm whitespace-pre-line">
              {selectedFal.comment}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
