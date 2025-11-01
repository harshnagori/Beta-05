import Event from "../models/Event.js";
import RSVP from "../models/RSVP.js";

export const getAnalytics = async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments();
    const totalRSVPs = await RSVP.countDocuments();
    // top events by rsvpCount
    const topEvents = await Event.find().sort({ rsvpCount: -1 }).limit(5).select("title rsvpCount");
    res.json({ totalEvents, totalRSVPs, topEvents });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
