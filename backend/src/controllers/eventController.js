import Event from "../models/Event.js";

export const getEvents = async (req, res) => {
  const events = await Event.find().populate("createdBy", "name");
  res.json(events);
};

export const createEvent = async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.status(201).json(event);
};
