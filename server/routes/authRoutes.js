// server/routes/authRoutes.js
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { register, login } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// 📌 Kayıt & Giriş
router.post("/register", register);
router.post("/login", login);

// 📌 PROFİL BİLGİLERİ
router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res.json({ success: false, message: "Token bulunamadı." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user)
      return res.json({ success: false, message: "Kullanıcı bulunamadı." });

    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Profil bilgisi alınamadı." });
  }
});

// 📌 PROFİL GÜNCELLEME (AVATAR DAHİL)
router.put("/update", authMiddleware, async (req, res) => {
  try {
    const { username, email, profileImage } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      { username, email, profileImage },
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      user: updatedUser,
      message: "Profil güncellendi",
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Güncelleme hatası" });
  }
});

// 📌 ŞİFRE DEĞİŞTİR
router.put("/change-password", authMiddleware, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user.userId);
    const match = await bcrypt.compare(oldPassword, user.password);

    if (!match)
      return res.json({ success: false, message: "Eski şifre yanlış" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ success: true, message: "Şifre değiştirildi" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Şifre değiştirilemedi" });
  }
});

export default router;
