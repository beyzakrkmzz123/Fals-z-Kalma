import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "cloudinary";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Cloudinary ayarı
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "profile_images",
  },
});

const upload = multer({ storage });

// 📌 Profil fotoğrafı yükleme
router.post("/upload-photo", upload.single("image"), async (req, res) => {
  try {
    // Token alma
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.json({ success: false, message: "Token bulunamadı." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.json({ success: false, message: "Kullanıcı bulunamadı." });
    }

    // Cloudinary path -> user.profileImage
    user.profileImage = req.file.path;
    await user.save();

    return res.json({
      success: true,
      url: req.file.path,
    });
  } catch (error) {
    console.log("Profil fotoğrafı yükleme hatası:", error);
    return res.json({
      success: false,
      message: "Fotoğraf yüklenemedi.",
    });
  }
});

export default router;
