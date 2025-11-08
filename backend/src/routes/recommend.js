import express from "express";
import { getRecommendations } from "../controllers/recommendController.js";
import { protect as authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:id", authMiddleware, getRecommendations);

export default router;
