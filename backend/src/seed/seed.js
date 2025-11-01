import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Event from "../models/Event.js";

dotenv.config();

const MONGO = process.env.MONGO_URI;
if (!MONGO) throw new Error("MONGO_URI missing in .env");

const seed = async () => {
  await mongoose.connect(MONGO);

  await User.deleteMany();
  await Event.deleteMany();

  const user1 = new User({ name: "Alice Organizer", email: "alice@uni.edu", role: "organizer" });
  await user1.setPassword("password123");
  await user1.save();

  const user2 = new User({ name: "Bob Student", email: "bob@uni.edu", role: "user" });
  await user2.setPassword("password123");
  await user2.save();

  const events = [
    {
      title: "AI & ML Workshop",
      description: "Introductory hands-on workshop on ML.",
      organizerId: user1._id,
      tags: ["AI","Machine Learning"],
      category: "Technology",
      mode: "offline",
      location: "Main Hall",
      time: new Date(Date.now() + 7*24*3600*1000),
      capacity: 100
    },
    {
      title: "Startup Pitch Night",
      description: "Pitch your startup idea.",
      organizerId: user1._id,
      tags: ["startup","entrepreneurship"],
      category: "Business",
      mode: "hybrid",
      location: "Innovation Lab",
      time: new Date(Date.now() + 14*24*3600*1000),
      capacity: 80
    }
  ];

  await Event.insertMany(events);

  console.log("✅ Seed complete");
  mongoose.connection.close();
};

seed().catch((err)=>{ console.error(err); process.exit(1); });
