import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import auth from "../middleware/authMiddleware.js"; // 🔥 EKLENDİ
import Fal from "../models/Fal.js"; // 🔥 EKLENDİ

dotenv.config();
const router = express.Router();

// 🔥 OpenAI Client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 📌 POST → /api/openai/comment
router.post("/comment", auth, async (req, res) => {
  // 🔥 auth EKLENDİ
  try {
    const { question, imageUrl, falTuru } = req.body;

    if (!question && !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Mesaj veya fotoğraf gönderilmelidir.",
      });
    }

    const prompt = `
Sen profesyonel bir fal yorumcususun.
Fal türü: ${falTuru || "Kahve Falı"}
Kullanıcının sorusu: ${question || "Sorulmamış"}
Fotoğraf URL: ${imageUrl || "Yok"}

Fotoğraf varsa şekilleri ve enerjiyi hissettiğini söyle.
Samimi, spiritüel ve motive edici bir yorum yap.
Abartılı mistik bilgiler yazma; eğlence amaçlı yorum yap.
    `;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Sen deneyimli bir fal yorumcusun." },
        { role: "user", content: prompt },
      ],
    });

    const answer = completion.choices[0].message.content;

    // 🔥 FALI VERİTABANINA KAYDET (EN KRİTİK SATIRLAR)
    const fal = await Fal.create({
      userId: req.user.userId,
      image: imageUrl || "",
      comment: answer,
    });

    return res.json({
      success: true,
      answer,
      fal, // ister frontend’de kullan
    });
  } catch (error) {
    console.error("❌ OpenAI API / Fal Kayıt Hatası:", error);

    return res.status(500).json({
      success: false,
      message: "AI yorum üretirken bir hata oluştu.",
    });
  }
});

export default router;
