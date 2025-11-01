import express from "express";
import { createRSVP } from "../controllers/rsvpController.js";
const router = express.Router();

router.post("/", createRSVP);

export default router;
