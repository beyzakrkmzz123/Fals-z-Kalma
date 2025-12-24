import mongoose from "mongoose";

const FalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  comment: { type: String },
  isFavorite: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Fal", FalSchema);
