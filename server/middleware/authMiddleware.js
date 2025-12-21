import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async function authMiddleware(req, res, next) {
  // 🔓 CORS preflight (OPTIONS) isteğine izin ver
  if (req.method === "OPTIONS") {
    return next();
  }

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.json({ success: false, message: "Token bulunamadı." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("isPremium");

    if (!user) {
      return res.json({
        success: false,
        message: "Kullanıcı bulunamadı.",
      });
    }

    req.user = {
      userId: decoded.id,
      isPremium: user.isPremium,
    };

    next();
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: "Token geçersiz veya süresi dolmuş.",
    });
  }
}
