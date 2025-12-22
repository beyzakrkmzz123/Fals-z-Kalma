// server/routes/imageRoutes.js
import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import authMiddleware from "../middleware/authMiddleware.js";

console.log("🔥 imageRoutes.js LOADED");

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "falsiz-kalma/avatars",
  },
});

const upload = multer({ storage });

// 📌 AVATAR UPLOAD
router.post("/upload", authMiddleware, upload.single("image"), (req, res) => {
  try {
    res.json({
      success: true,
      url: req.file.path,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});
// 📌 FAL / YAPAY ZEKA – ÇOKLU FOTO UPLOAD
router.post(
  "/upload-multiple",
  authMiddleware,
  upload.array("images", 5),
  (req, res) => {
    console.log("🔥 upload-multiple HIT"); // 👈
    try {
      const isPremium = req.user?.isPremium;

      // 🔒 Premium değilse max 1 foto
      if (!isPremium && req.files.length > 1) {
        return res.status(403).json({
          success: false,
          message:
            "Sadece Premium kullanıcılar birden fazla fotoğraf yükleyebilir.",
        });
      }

      const urls = req.files.map((file) => file.path);

      res.json({
        success: true,
        urls,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false });
    }
  }
);

export default router;
