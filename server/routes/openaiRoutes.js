import express from "express";
import dotenv from "dotenv";
import auth from "../middleware/authMiddleware.js";
import Fal from "../models/Fal.js";

dotenv.config();
const router = express.Router();

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

    // 🧪 MOCK AI (TEST MODU)
    if (process.env.MOCK_AI === "true") {
      return res.json({
        success: true,
        answer:
          "🔮 (Test Modu)\nFalında güzel gelişmeler var.\nYakında seni mutlu edecek bir haber alacaksın.\nEnerjin yükseliyor ✨",
      });
    }

    // 🔥 BURADAN SONRA GERÇEK OPENAI (DİNAMİK IMPORT)
    const { default: OpenAI } = await import("openai");

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "OpenAI API key tanımlı değil.",
      });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    let imageInfo = "Fotoğraf yok.";
    if (imageUrls && imageUrls.length > 0) {
      imageInfo = `
Kullanıcı ${imageUrls.length} adet fotoğraf yükledi.
Tüm fotoğrafları birlikte analiz et.
`;
    }

    const prompt = `
Sen profesyonel bir fal yorumcususun.
Fal türü: ${falTuru || "Kahve Falı"}

Kullanıcının sorusu:
${question || "Sorulmamış"}

${imageInfo}

Samimi, spiritüel ve motive edici bir yorum yap.
Eğlence amaçlıdır.
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
    console.error("❌ OpenAI / Fal Hatası:", error);

    return res.status(500).json({
      success: false,
      message: "AI yorum üretirken bir hata oluştu.",
    });
  }
});

export default router;
