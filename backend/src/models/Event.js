import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tags: [String],
  category: String,
  mode: { type: String, enum: ["online", "offline", "hybrid"], default: "offline" },
  location: String,
  time: Date,
  capacity: Number,
  rsvpCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

EventSchema.index({ title: "text", description: "text", tags: "text" });

export default mongoose.model("Event", EventSchema);
