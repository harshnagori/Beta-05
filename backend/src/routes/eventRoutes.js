import express from "express";
import { createEvent, listEvents, getEventById } from "../controllers/eventController.js";

const router = express.Router();

router.post("/", createEvent);
router.get("/", listEvents);
router.get("/:id", getEventById);

export default router;
