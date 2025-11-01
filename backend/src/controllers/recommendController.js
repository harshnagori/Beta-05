import User from "../models/User.js";
import Event from "../models/Event.js";
import { scoreEvent } from "../recommender/recommender.js";

export const getRecommendations = async (req, res) => {
  try {
    const { userId } = req.params;
    const limit = Number(req.query.limit || 12);

    const user = await User.findById(userId).lean();
    if (!user) return res.status(404).json({ message: "User not found" });

    const events = await Event.find().lean();

    const scored = events.map(ev => {
      const { score, breakdown } = scoreEvent({ user, event: ev });
      return { ...ev, score, breakdown };
    });

    scored.sort((a, b) => b.score - a.score);
    const top = scored.slice(0, limit);

    res.json({ recommendations: top });
  } catch (err) {
    console.error("Recommend error:", err);
    res.status(500).json({ message: err.message });
  }
};
