import express from "express";
import auth from "../middleware/authMiddleware.js";
import { buyPremiumMock } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/premium", auth, buyPremiumMock);

export default router;
