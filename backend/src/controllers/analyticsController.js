import Event from "../models/Event.js";
import RSVP from "../models/rsvpModel.js";

export const getAnalytics = async (req, res) => {
  const totalEvents = await Event.countDocuments();
  const totalRSVPs = await RSVP.countDocuments();
  res.json({ totalEvents, totalRSVPs });
};
