import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, location, tags } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const event = new Event({
      title,
      description,
      date,
      time,
      location,
      tags: Array.isArray(tags)
        ? tags
        : typeof tags === "string"
        ? tags.split(",").map((t) => t.trim())
        : [],
    });

    const saved = await event.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Create event error:", err);
    res.status(500).json({ message: "Server error while creating event" });
  }
};

// Get all events
export const listEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    console.error("List events error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get one event
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    console.error("Get event error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
