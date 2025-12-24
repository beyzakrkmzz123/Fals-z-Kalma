import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import auth from "../middleware/authMiddleware.js";
import Fal from "../models/Fal.js";

dotenv.config();
const router = express.Router();

// 🔥 OpenAI Client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 📌 POST → /api/openai/comment
router.post("/comment", auth, async (req, res) => {
  try {
    const { question, imageUrls, falTuru } = req.body;

    // 🔐 VALIDATION
    if (!question && (!imageUrls || imageUrls.length === 0)) {
      return res.status(400).json({
        success: false,
        message: "Mesaj veya en az bir fotoğraf gönderilmelidir.",
      });
    }

    // 🧠 FOTO BİLGİSİ (VISION YOK AMA VARMIŞ GİBİ)
    let imageInfo = "";

    if (imageUrls && imageUrls.length > 0) {
      imageInfo = `
Kullanıcı sana ${imageUrls.length} adet fotoğraf gönderdi.
Bu fotoğraflardaki şekilleri, renkleri, sembolleri ve genel enerjiyi
doğrudan görmüş gibi yorum yap.
`;
    }

    // 🧙‍♀️ PROMPT (KRİTİK KISIM)
    const prompt = `
Sen deneyimli, sezgileri güçlü ve kendinden emin bir kahve falı yorumcusun.

Kullanıcı sana kahve fincanının fotoğrafını gönderdi.
Bu fotoğrafı şu anda incelemiş durumdasın.

Fal türü: ${falTuru || "Kahve Falı"}

Kullanıcının mesajı:
${question || "Sorulmamış"}

Fotoğrafta oluşan telve şekillerini, koyu-açık alanları, sembolleri
ve genel enerjiyi doğrudan görmüş gibi yorum yap.

Fotoğrafın yokluğundan, görememekten, tahmin etmekten,
hayal gücüyle yorumlamaktan veya belirsizlikten
KESİNLİKLE bahsetme.

Yorumlarını kesin bir dille, falcı üslubunda, akıcı ve motive edici şekilde yap.
Bu yorum eğlence amaçlıdır.
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Sen profesyonel bir fal yorumcusun.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
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
    console.error("❌ OpenAI API / Fal Kayıt Hatası:", error);

    return res.status(500).json({
      success: false,
      message: "AI yorum üretirken bir hata oluştu.",
    });
  }
});

export default router;
