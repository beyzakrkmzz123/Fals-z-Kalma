import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  // Profil bilgileri
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // ⭐ EKLENDİ: Profil fotoğrafı
  const [profileImage, setProfileImage] = useState("");
  const [uploading, setUploading] = useState(false);

  // Şifre değiştir
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Şifre göster / gizle
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(
      "https://falsiz-kalma-backend-production.up.railway.app/api/auth/me",
      {
        headers: { Authorization: "Bearer " + token },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          navigate("/login");
          return;
        }
        setUser(data.user);
        setUsername(data.user.username || "");
        setEmail(data.user.email || "");
        setProfileImage(data.user.profileImage || ""); // ⭐ EKLENDİ
      });
  }, [navigate]);

  const uploadAvatar = async (file) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);

    try {
      const res = await fetch(
        "https://falsiz-kalma-backend-production.up.railway.app/api/image/upload",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (data.success) {
        // 🔥 1️⃣ Profil foto state
        setProfileImage(data.url);

        // 🔥 2️⃣ User state + localStorage (HEADER BURADAN OKUYOR)
        const updatedUser = {
          ...user,
          profileImage: data.url,
        };

        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } else {
        alert("Resim yüklenemedi");
      }
    } catch (err) {
      console.error("Avatar upload hatası:", err);
      alert("Resim yüklenirken hata oluştu");
    } finally {
      setUploading(false);
    }
  };

  // Profil kaydet
  const saveProfile = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "https://falsiz-kalma-backend-production.up.railway.app/api/auth/update",
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, profileImage }), // ⭐ profileImage eklendi
      }
    );

    const data = await res.json();
    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Profil bilgileri güncellendi");
      setUser(data.user);
    } else {
      alert(data.message || "Profil güncellenemedi");
    }
  };

  // Şifre değiştir
  const changePassword = async () => {
    const token = localStorage.getItem("token");

    if (!oldPassword || !newPassword) {
      alert("Lütfen tüm alanları doldurun");
      return;
    }

    const res = await fetch(
      "https://falsiz-kalma-backend-production.up.railway.app/api/auth/change-password",
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      }
    );

    const data = await res.json();
    if (data.success) {
      alert("Şifre başarıyla değiştirildi");
      setOldPassword("");
      setNewPassword("");
      setShowOldPassword(false);
      setShowNewPassword(false);
    } else {
      alert(data.message || "Şifre değiştirilemedi");
    }
  };

  if (!user)
    return <div className="text-white mt-20 text-center">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0d0018] to-[#24003a] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-10 text-purple-300">Ayarlar</h1>

      <div className="w-full max-w-2xl grid gap-8">
        {/* PROFİL BİLGİLERİ */}
        <div className="bg-white/10 border border-purple-500/40 rounded-3xl p-6 shadow-[0_0_30px_rgba(168,85,247,0.25)]">
          <h2 className="text-xl font-semibold mb-5">Profil Bilgileri</h2>

          {/* ⭐ EKLENDİ: Avatar */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={profileImage || "https://i.imgur.com/3GvwNBf.png"}
              className="w-32 h-32 rounded-full border-4 border-purple-500 object-cover mb-3"
              alt="Avatar"
            />

            <label className="cursor-pointer text-sm text-purple-300 hover:underline">
              {uploading ? "Yükleniyor..." : "Fotoğrafı Değiştir"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => uploadAvatar(e.target.files[0])}
              />
            </label>
          </div>

          <label className="text-sm text-purple-200">Kullanıcı Adı</label>
          <input
            className="w-full mt-1 mb-4 p-3 rounded-xl bg-white/10 border border-purple-500/40 outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="text-sm text-purple-200">E-posta</label>
          <input
            className="w-full mt-1 mb-4 p-3 rounded-xl bg-white/10 border border-purple-500/40 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={saveProfile}
            className="w-full bg-purple-700 hover:bg-purple-800 transition py-3 rounded-xl font-semibold"
          >
            Kaydet
          </button>
        </div>

        {/* ŞİFRE DEĞİŞTİR */}
        <div className="bg-white/10 border border-purple-500/40 rounded-3xl p-6 shadow-[0_0_30px_rgba(168,85,247,0.25)]">
          <h2 className="text-xl font-semibold mb-5">Şifre Değiştir</h2>

          <label className="text-sm text-purple-200">Eski Şifre</label>
          <div className="relative mb-4">
            <input
              type={showOldPassword ? "text" : "password"}
              className="w-full mt-1 p-3 pr-16 rounded-xl bg-white/10 border border-purple-500/40 outline-none"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <span
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-purple-300 cursor-pointer select-none"
            >
              {showOldPassword ? "Gizle" : "Göster"}
            </span>
          </div>

          <label className="text-sm text-purple-200">Yeni Şifre</label>
          <div className="relative mb-6">
            <input
              type={showNewPassword ? "text" : "password"}
              className="w-full mt-1 p-3 pr-16 rounded-xl bg-white/10 border border-purple-500/40 outline-none"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <span
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-purple-300 cursor-pointer select-none"
            >
              {showNewPassword ? "Gizle" : "Göster"}
            </span>
          </div>

          <button
            onClick={changePassword}
            className="w-full bg-pink-700 hover:bg-pink-800 transition py-3 rounded-xl font-semibold"
          >
            Şifreyi Değiştir
          </button>
        </div>

        <button
          onClick={() => navigate("/profile")}
          className="w-full border border-purple-500/40 hover:bg-purple-700/30 transition py-3 rounded-xl"
        >
          Profile Dön
        </button>
      </div>
    </div>
  );
}

export default Settings;
