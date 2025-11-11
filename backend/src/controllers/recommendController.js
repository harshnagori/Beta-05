import Event from "../models/Event.js";
import User from "../models/User.js";
import axios from "axios";

/**
 * GET /api/recommend/:id
 * Uses ai_service to score events and returns ranked events.
 */
export const getRecommendations = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(`[recommendController] Requesting AI recommendations for user: ${userId}`);

    const user = await User.findById(userId).lean();
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // fetch candidate events (you can pre-filter by date/location in DB)
    const events = await Event.find({}).lean();

    // Build payload: send id + description for reliable mapping
    const payload = {
      user: `${(user.interests || []).join(" ")} ${(user.skills || []).join(" ")}`,
      events: events.map(e => ({ id: e._id.toString(), text: `${e.title} ${e.description} ${(e.tags||[]).join(" ")}` }))
    };

    const aiResp = await axios.post(
      `${process.env.AI_SERVICE_URL}/recommend`,
      payload,
      { timeout: 60000 } // increase timeout too
    );


    console.log("[recommendController] AI response received");

    // aiResp.data.recommendations expected: [{id,score}, ...]
    const ranking = aiResp.data.recommendations || [];

    // Map scores back to events
    const scored = events.map(ev => {
      const r = ranking.find(x => x.id === ev._id.toString());
      return { ...ev, score: r ? r.score : 0 };
    }).sort((a,b) => (b.score || 0) - (a.score || 0));

    return res.json({ success: true, recommendations: scored });
  } catch (err) {
    console.error("[recommendController] Error:", err.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
