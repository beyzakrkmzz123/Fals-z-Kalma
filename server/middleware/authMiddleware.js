// server/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.json({ success: false, message: "Token bulunamadı." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 SADECE BURASI ÖNEMLİ
    req.user = { userId: decoded.id };

    next();
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: "Token geçersiz veya süresi dolmuş.",
    });
  }
}
