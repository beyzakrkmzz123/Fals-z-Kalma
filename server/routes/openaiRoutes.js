import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import auth from "../middleware/authMiddleware.js";
import Fal from "../models/Fal.js";

dotenv.config();
const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/comment", auth, async (req, res) => {
  try {
    const { question, imageUrls, falTuru } = req.body;

    if (!question && (!imageUrls || imageUrls.length === 0)) {
      return res.status(400).json({
        success: false,
        message: "Mesaj veya en az bir fotoğraf gönderilmelidir.",
      });
    }

    // 🔮 FALCIYA GÖRE PROMPT
    let falciPrompt = "";

    if (falTuru === "Aşk Falı") {
      falciPrompt = `
Sen romantik, duygusal ve detaycı bir fal yorumcususun.
Fotoğraflardaki küçük detaylara dikkat et.
Yorumun uzun, yumuşak ve duygusal olsun.
`;
    } else if (falTuru === "Spiritüel Fal") {
      falciPrompt = `
Sen sezgileri güçlü spiritüel bir falcısın.
Enerji, yoğunluk ve dönüşüm temalarına odaklan.
Yorumun mistik ama abartısız olsun.
`;
    } else {
      falciPrompt = `
Sen net ve iddialı konuşan bir falcısın.
Belirsiz ifadeler kullanma.
Gördüğünü doğrudan söyle.
`;
    }

    // 🧠 USER TEXT
    const userText = `
${falciPrompt}

Kullanıcının sorusu:
${question || "Soru sorulmadı"}

Fotoğraf varsa, gördüğün şekilleri doğrudan yorumla.
`;

    // 🔥 OPENAI VISION FORMAT (DOĞRU)
    const messages = [
      {
        role: "system",
        content: "Sen deneyimli bir fal yorumcusun.",
      },
      {
        role: "user",
        content: [
          { type: "text", text: userText },
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
    console.error("❌ OPENAI ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "AI yorum üretirken hata oluştu.",
    });
  }
});

export default router;
