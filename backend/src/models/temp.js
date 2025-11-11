import mongoose from "mongoose";

const RsvpSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  status: { type: String, enum: ["going", "interested"], default: "going" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("RSVP", RsvpSchema);
