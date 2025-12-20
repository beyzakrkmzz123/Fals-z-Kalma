// server/routes/imageRoutes.js
import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "falsiz-kalma/avatars",
  },
});

const upload = multer({ storage });

// 📌 AVATAR UPLOAD
router.post("/upload", upload.single("image"), (req, res) => {
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

export default router;
