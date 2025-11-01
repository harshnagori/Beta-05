import RSVP from "../models/RSVP.js";
import Event from "../models/Event.js";

export const createRSVP = async (req, res) => {
  try {
    const { userId, eventId, status } = req.body;
    if (!userId || !eventId) return res.status(400).json({ message: "Missing userId or eventId" });

    // prevent duplicate RSVP
    const exist = await RSVP.findOne({ userId, eventId });
    if (exist) return res.status(200).json(exist);

    const rsvp = new RSVP({ userId, eventId, status });
    await rsvp.save();

    // increment event count (best-effort)
    await Event.findByIdAndUpdate(eventId, { $inc: { rsvpCount: 1 } });

    res.status(201).json(rsvp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const listRSVPs = async (req, res) => {
  try {
    const rsvps = await RSVP.find().populate("userId", "name email").populate("eventId", "title");
    res.json(rsvps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
