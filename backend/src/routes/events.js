import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { listEvents, createEvent } from "../controllers/eventController.js";

const router = express.Router();

// Public route — anyone can view events
router.get("/", listEvents);

// Protected route — only logged-in users (with JWT) can create events
router.post("/", protect, createEvent);

export default router;
