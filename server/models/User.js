import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    // ✔ Premium kullanıcı kontrolü
    isPremium: {
      type: Boolean,
      default: false,
    },
    // ✔ Premium paket tipi (basic / pro / vip)
    premiumPlan: {
      type: String,
      enum: ["basic", "pro", "vip", null],
      default: null,
    },

    // ✔ Premium bitiş tarihi
    premiumUntil: {
      type: Date,
      default: null,
    },

    // ✔ Günlük fal limiti (ileride kredi sistemi için)
    dailyFalLimit: {
      type: Number,
      default: 3,
    },

    // ✔ EKLEDİĞİMİZ ALAN → Profil Fotoğrafı
    profileImage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
