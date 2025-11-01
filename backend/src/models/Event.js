import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], default: [] },
  time: { type: Date, required: true },
  rsvpCount: { type: Number, default: 0 },
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export default mongoose.model("Event", eventSchema);
