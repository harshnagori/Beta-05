import mongoose from "mongoose";
import dotenv from "dotenv";
import Event from "./src/models/Event.js";


dotenv.config();

const events = [
  {
    title: "AI Hackathon",
    description: "Build AI solutions for real-world problems.",
    tags: ["hackathon", "ai", "coding"],
    time: new Date("2025-11-10"),
    rsvpCount: 120
  },
  {
    title: "Music Fest 2025",
    description: "Live music and band performances.",
    tags: ["music", "singing", "band"],
    time: new Date("2025-11-15"),
    rsvpCount: 300
  },
  {
    title: "Dance Mania",
    description: "Dance battle and workshops.",
    tags: ["dance", "performance", "hiphop"],
    time: new Date("2025-11-18"),
    rsvpCount: 250
  },
  {
    title: "Esports Championship",
    description: "Compete in Valorant and CS2 tournaments.",
    tags: ["gaming", "esports", "competition"],
    time: new Date("2025-11-20"),
    rsvpCount: 200
  },
  {
    title: "Startup Ideathon",
    description: "Pitch your startup ideas to investors.",
    tags: ["ideathon", "startup", "entrepreneurship"],
    time: new Date("2025-11-12"),
    rsvpCount: 80
  },
  {
    title: "Photography Contest",
    description: "Capture moments that tell a story.",
    tags: ["photography", "art", "creativity"],
    time: new Date("2025-11-22"),
    rsvpCount: 140
  },
  {
    title: "Coding Bootcamp",
    description: "Learn MERN stack development.",
    tags: ["coding", "web", "javascript"],
    time: new Date("2025-11-25"),
    rsvpCount: 160
  },
  {
    title: "Sports Meet",
    description: "Cricket, football, and athletic events.",
    tags: ["sports", "fitness", "competition"],
    time: new Date("2025-11-30"),
    rsvpCount: 180
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Event.deleteMany({});
    await Event.insertMany(events);
    console.log("✅ Events seeded");
    process.exit();
  })
  .catch(err => console.error(err));
