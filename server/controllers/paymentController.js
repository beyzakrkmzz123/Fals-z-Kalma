import User from "../models/User.js";

export const buyPremiumMock = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { plan } = req.body; // basic | pro | vip

    if (!["basic", "pro", "vip"].includes(plan)) {
      return res.status(400).json({
        success: false,
        message: "Geçersiz premium plan",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Kullanıcı bulunamadı" });
    }

    // ⏳ Premium süresi (30 gün)
    const now = new Date();
    const premiumUntil = new Date();
    premiumUntil.setDate(now.getDate() + 30);

    // 🎯 Paket bazlı ayarlar
    let dailyFalLimit = 3;

    if (plan === "basic") dailyFalLimit = 5;
    if (plan === "pro") dailyFalLimit = 999;
    if (plan === "vip") dailyFalLimit = 9999;

    user.isPremium = true;
    user.premiumPlan = plan;
    user.premiumUntil = premiumUntil;
    user.dailyFalLimit = dailyFalLimit;

    await user.save();

    res.json({
      success: true,
      message: "Premium başarıyla aktif edildi 🎉",
      premiumPlan: plan,
      premiumUntil,
    });
  } catch (err) {
    console.error("Premium satın alma hatası:", err);
    res.status(500).json({
      success: false,
      message: "Premium satın alma başarısız",
    });
  }
};
