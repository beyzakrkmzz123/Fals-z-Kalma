import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import auth from "../middleware/authMiddleware.js";
import Fal from "../models/Fal.js";

dotenv.config();
const router = express.Router();

// 🔥 OpenAI Client (GÜNCEL)
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 📌 POST → /api/openai/comment
router.post("/comment", auth, async (req, res) => {
  try {
    const { question, imageUrls, falTuru } = req.body;

    if (!question && (!imageUrls || imageUrls.length === 0)) {
      return res.status(400).json({
        success: false,
        message: "Mesaj veya en az bir fotoğraf gönderilmelidir.",
      });
    }

    // 🧙‍♀️ PROMPT (TEXT KISMI)
    const prompt = `
Sen profesyonel bir fal yorumcususun.
Fal türü: ${falTuru || "Kahve Falı"}

Kullanıcının sorusu:
${question || "Sorulmamış"}

Eğer fotoğraflar varsa:
- Fotoğraflardaki şekilleri, sembolleri ve genel enerjiyi yorumla
- Gerçekçi ama eğlenceli ol
- Abartılı mistik bilgiler uydurma
    `;

    // 🔥 OPENAI VISION MESAJ YAPISI (EN KRİTİK YER)
    const messages = [
      {
        role: "system",
        content: "Sen deneyimli ve sezgileri güçlü bir fal yorumcusun.",
      },
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          ...(imageUrls || []).map((url) => ({
            type: "image_url",
            image_url: { url },
          })),
        ],
      },
    ];

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
    });

    const answer = completion.choices[0].message.content;

    // 💾 FALI KAYDET
    const fal = await Fal.create({
      userId: req.user.userId,
      images: imageUrls || [],
      comment: answer,
      falTuru: falTuru || "Kahve Falı",
    });

    return res.json({
      success: true,
      answer,
      fal,
    });
  } catch (error) {
    console.error("❌ OpenAI Hatası:", error);
    return res.status(500).json({
      success: false,
      message: "AI yorum üretirken hata oluştu.",
    });
  }
});

export default router;
