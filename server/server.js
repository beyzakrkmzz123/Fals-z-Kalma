// server/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import openaiRoutes from "./routes/openaiRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import fallarRoutes from "./routes/fallarRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

// ENV
dotenv.config();

console.log("ENV dosyaları yüklendi ✅");

const app = express();

app.set("etag", false);

app.use(cors());
app.use(express.json());

// DB CONNECT
connectDB();

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/image", imageRoutes);
app.use("/api/openai", openaiRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/fallar", fallarRoutes);
app.use("/api/payment", paymentRoutes);

// TEST ROOT
app.get("/", (req, res) => {
  res.send("Server Çalışıyor ✔");
});

// PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor 🚀`));
