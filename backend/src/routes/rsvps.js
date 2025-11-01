import express from "express";
import { createRSVP, listRSVPs } from "../controllers/rsvpController.js";
const router = express.Router();

router.post("/", createRSVP);
router.get("/", listRSVPs);

export default router;
