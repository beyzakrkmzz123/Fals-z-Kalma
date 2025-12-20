import express from "express";
import Fal from "../models/Fal.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

/* ✅ FALLARI GETİR */
router.get("/", auth, async (req, res) => {
  try {
    const fallar = await Fal.find({
      userId: req.user.userId,
    }).sort({ createdAt: -1 });

    res.json({ success: true, fallar });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Sunucu hatası",
    });
  }
});

/* ⭐ FAVORİ / FAVORİDEN ÇIKAR */
router.put("/favorite/:id", auth, async (req, res) => {
  try {
    const fal = await Fal.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!fal) {
      return res.status(404).json({
        success: false,
        message: "Fal bulunamadı",
      });
    }

    fal.isFavorite = !fal.isFavorite;
    await fal.save();

    res.json({ success: true, fal });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Favori işlemi başarısız",
    });
  }
});

/* 🗑️ FAL SİL */
router.delete("/:id", auth, async (req, res) => {
  try {
    const fal = await Fal.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!fal) {
      return res.status(404).json({
        success: false,
        message: "Fal bulunamadı",
      });
    }

    res.json({ success: true, message: "Fal silindi" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Silme işlemi başarısız",
    });
  }
});

export default router;
