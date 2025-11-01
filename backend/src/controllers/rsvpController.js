import RSVP from "../models/Rsvp.js";

export const createRSVP = async (req, res) => {
  try {
    const rsvp = new RSVP(req.body);
    await rsvp.save();
    res.status(201).json(rsvp);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllRSVPs = async (req, res) => {
  try {
    const rsvps = await RSVP.find().populate("eventId");
    res.status(200).json(rsvps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

\export const getRSVPsByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const rsvps = await RSVP.find({ eventId });
    res.status(200).json(rsvps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
