import express from "express";
import User from "../models/User.js";
import Event from "../models/Event.js";

const router = express.Router();


router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const events = await Event.find().lean();

    const scored = events.map(e => {
      const tags = e.tags || [];
      const title = e.title?.toLowerCase() || "";
      const interestMatches = (user.interests || []).filter(i =>
        tags.includes(i.toLowerCase()) || title.includes(i.toLowerCase())
      );
      const skillMatches = (user.skills || []).filter(s =>
        tags.includes(s.toLowerCase()) || title.includes(s.toLowerCase())
      );

      const score = interestMatches.length * 2 + skillMatches.length; 
      return { ...e, score };
    });

    const ranked = scored
      .sort((a, b) => b.score - a.score)
      .filter(e => e.score > 0);

    res.json({
      recommendations: ranked.length ? ranked : events.slice(0, 5), 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
