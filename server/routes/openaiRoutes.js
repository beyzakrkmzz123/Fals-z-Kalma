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

    /* ===============================
       🧙‍♀️ FALCIYA GÖRE STİL
    =============================== */
    let falciPrompt = "";

    if (falTuru === "Aşk Falı") {
      // 💖 AYŞE
      falciPrompt = `
Sen romantik, duygusal ve detaycı bir fal yorumcususun.
Fotoğraflardaki küçük detaylara dikkat et:
- kalp benzeri şekiller
- birleşen yollar
- yumuşak geçişler
Uzun, betimleyici ve güven veren konuş.
`;
    } else if (falTuru === "Spiritüel Fal") {
      // 🔮 ZEYNEP
      falciPrompt = `
Sen sezgileri güçlü spiritüel bir falcısın.
Fotoğraflardaki enerji ve yoğunluk farklarını yorumla:
- koyu alanlar = blokaj
- açık alanlar = ferahlama
Sezgisel ama abartısız konuş.
`;
    } else {
      // ⚡ MEHMET
      falciPrompt = `
Sen net, kısa ve iddialı konuşan bir falcısın.
Fotoğraflara bak:
- açık yol var mı yok mu söyle
- belirsiz ifadelerden kaçın
Maddeli ve kesin konuş.
`;
    }

    /* ===============================
       🧠 ANA PROMPT
    =============================== */
    const prompt = `
${falciPrompt}

Kullanıcının sorusu:
${question || "Sorulmamış"}

Fotoğrafları gerçekten analiz et.
Eğer görüyorsan:
- telve yoğunluğunu
- açık / kapalı alanları
- fincan kenarındaki akıntıları
belirt.

Görmediğin hiçbir şeyi ASLA uydurma.
Genel fal cümlelerinden kaçın.
`;

    /* ===============================
       🔥 OPENAI VISION MESAJI
    =============================== */
    const safeImageUrls = Array.isArray(imageUrls) ? imageUrls : [];

    const messages = [
      {
        role: "system",
        content: "Sen deneyimli ve sezgileri güçlü bir fal yorumcusun.",
      },
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          ...safeImageUrls.map((url) => ({
            type: "image_url",
            image_url: { url },
          })),
        ],
      },
    ];

    // 🔴 DEBUG LOG (ÇOK ÖNEMLİ)
    console.log("🧠 OPENAI MESSAGES:", JSON.stringify(messages, null, 2));

    const completion = await client.chat.completions.create({
      model: "gpt-4o", // 🔥 vision için en stabil
      messages,
    });

    const answer = completion.choices[0].message.content;

    // 💾 FALI KAYDET
    const fal = await Fal.create({
      userId: req.user.userId,
      images: safeImageUrls,
      comment: answer,
      falTuru: falTuru || "Kahve Falı",
    });

    return res.json({
      success: true,
      answer,
      fal,
    });
  } catch (error) {
    console.error("❌ OPENAI ERROR RAW:", error);
    console.error("❌ OPENAI RESPONSE:", error?.response?.data);

    return res.status(500).json({
      success: false,
      message: "AI yorum üretirken hata oluştu.",
    });
  }
});

export default router;
