import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import auth from "../middleware/authMiddleware.js";
import Fal from "../models/Fal.js";

dotenv.config();
const router = express.Router();

// 🔥 OpenAI Client (mock kapalıyken kullanılır)
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 📌 POST → /api/openai/comment
router.post("/comment", auth, async (req, res) => {
  try {
    // 🧪 MOCK AI (TEST MODU)
    if (process.env.MOCK_AI === "true") {
      return res.json({
        success: true,
        answer:
          "🔮 (Test Modu)\nFalında güzel gelişmeler var.\nYakında seni mutlu edecek bir haber alacaksın.\nEnerjin yükseliyor ✨",
      });
    }

    // 🔥 SADECE imageUrls KULLANIYORUZ
    const { question, imageUrls, falTuru } = req.body;

    // 🔐 VALIDATION
    if (!question && (!imageUrls || imageUrls.length === 0)) {
      return res.status(400).json({
        success: false,
        message: "Mesaj veya en az bir fotoğraf gönderilmelidir.",
      });
    }

    // 🧠 FOTO BİLGİSİ
    let imageInfo = "Fotoğraf yok.";

    if (imageUrls && imageUrls.length > 0) {
      imageInfo = `
Kullanıcı ${imageUrls.length} adet fotoğraf yükledi.
Tüm fotoğrafları birlikte analiz et.
`;
    }

    // 🧙‍♀️ PROMPT
    const prompt = `
Sen profesyonel bir fal yorumcususun.
Fal türü: ${falTuru || "Kahve Falı"}

Kullanıcının sorusu:
${question || "Sorulmamış"}

${imageInfo}

Fotoğraf varsa şekilleri, sembolleri ve enerjiyi hissettiğini söyle.
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
