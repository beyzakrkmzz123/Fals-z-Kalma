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

    /* =====================================================
       🧙‍♀️ FALCIYA GÖRE PROMPT (STİL AYRIMI)
    ===================================================== */
    let falciPrompt = "";

    if (falTuru === "Aşk Falı") {
      // 💖 AYŞE
      falciPrompt = `
Sen romantik, duygusal ve detaycı bir fal yorumcususun.
Fotoğraflardaki küçük detaylara özellikle dikkat et:
- kalp benzeri şekiller
- birleşen yollar
- açık alanlar ve yumuşak geçişler

Yorumun:
- uzun
- betimleyici
- duygusal güven veren
olmalı.

Kesin konuşma ama romantik ihtimaller sun.
`;
    } else if (falTuru === "Spiritüel Fal") {
      // 🔮 ZEYNEP
      falciPrompt = `
Sen derin sezgilere sahip spiritüel bir falcısın.
Fotoğraflardaki enerjiyi ve yoğunluk farklarını yorumla:
- koyu telve = yük / blokaj
- açık alan = ferahlama
- akıntılar = dönüşüm

Yorumun:
- sezgisel
- mistik ama abartısız
- ruhsal farkındalık içeren
olmalı.

Enerji dili kullan.
`;
    } else {
      // ⚡ MEHMET (GENEL / NET)
      falciPrompt = `
Sen net, iddialı ve kısa konuşan bir falcısın.
Fotoğraflara bakarak:
- ne görüyorsan onu söyle
- varsa açık yol, yoksa açıkça söyle
- belirsiz ifadelerden kaçın

Yorumun:
- maddeli
- kısa
- kesin ifadeli
olsun.

"Olabilir" yerine "görünüyor / yok" gibi ifadeler kullan.
`;
    }

    /* =====================================================
       🧠 ANA PROMPT (GÜVEN VEREN KISIM)
    ===================================================== */
    const prompt = `
${falciPrompt}

Kullanıcının sorusu:
${question || "Sorulmamış"}

Fotoğrafları gerçekten analiz et.
Eğer fotoğraflarda şunları görüyorsan mutlaka belirt:
- telvenin yoğunluğu
- açık ve kapalı alan oranı
- fincan kenarında akıntı izi
- birden fazla fotoğraf varsa aralarındaki fark

Görmediğin hiçbir şeyi ASLA uydurma.
Genel geçer fal cümlelerinden kaçın.
Yorumun fotoğraflarla birebir ilişkili olsun.
`;

    /* =====================================================
       🔥 OPENAI VISION MESSAGE YAPISI
    ===================================================== */
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
