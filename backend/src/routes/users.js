import express from "express";
import User from "../models/User.js";
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const u = await User.findById(req.params.id).lean();
    if (!u) return res.status(404).json({ message: "User not found" });
    delete u.password;
    res.json(u);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const update = { ...req.body };

    if (update.interests && typeof update.interests === "string") {
      update.interests = update.interests.split(",").map(s => s.trim()).filter(Boolean);
    }
    if (update.skills && typeof update.skills === "string") {
      update.skills = update.skills.split(",").map(s => s.trim()).filter(Boolean);
    }

    const u = await User.findByIdAndUpdate(req.params.id, update, { new: true }).lean();
    if (!u) return res.status(404).json({ message: "User not found" });
    delete u.password;
    res.json(u);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
