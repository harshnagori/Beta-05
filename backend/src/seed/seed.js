import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Event from "../models/Event.js";

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const seed = async () => {
  await User.deleteMany();
  await Event.deleteMany();
  const user = await User.create({ name: "Admin", email: "admin@test.com", password: "123456" });
  await Event.create({ title: "Hackathon", description: "AI Hack", date: new Date(), location: "Bhopal", createdBy: user._id });
  console.log("Database seeded");
  mongoose.connection.close();
};

seed();
