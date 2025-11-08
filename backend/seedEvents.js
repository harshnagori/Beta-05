import mongoose from "mongoose";
import dotenv from "dotenv";
import Event from "./src/models/Event.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const events = [
  {
    title: "AI Hackathon 2025",
    description: "48-hour hackathon to build innovative AI-driven solutions for real-world problems.",
    tags: ["AI", "Hackathon", "ML", "Innovation"]
  },
  {
    title: "Ideathon Ignite",
    description: "Pitch your unique startup or social innovation ideas to investors and mentors.",
    tags: ["Entrepreneurship", "Innovation", "Startup", "Pitching"]
  },
  {
    title: "Campus Marathon",
    description: "Join the 10K marathon to promote fitness and sustainability in the community.",
    tags: ["Marathon", "Fitness", "Health", "Sports"]
  },
  {
    title: "Dance Mania",
    description: "Showcase your moves in the ultimate inter-college dance battle.",
    tags: ["Dance", "Competition", "Cultural", "Performance"]
  },
  {
    title: "Battle of Bands",
    description: "Rock bands across colleges perform live and compete for the grand prize.",
    tags: ["Music", "Band", "Cultural", "Performance"]
  },
  {
    title: "CodeSprint 2.0",
    description: "A competitive programming contest testing logic, speed, and algorithmic skills.",
    tags: ["Coding", "Programming", "DSA", "Contest"]
  },
  {
    title: "Art Fiesta",
    description: "An art exhibition and painting competition celebrating creative expression.",
    tags: ["Art", "Painting", "Creativity", "Exhibition"]
  },
  {
    title: "Sports Fest Arena",
    description: "Annual college sports fest featuring cricket, football, and basketball tournaments.",
    tags: ["Sports", "Cricket", "Football", "Competition"]
  },
  {
    title: "TechTalks Summit",
    description: "A tech conference with speakers from top companies like Google and Microsoft.",
    tags: ["Tech", "Conference", "Networking", "Innovation"]
  },
  {
    title: "Startup Expo",
    description: "Meet investors, founders, and innovators showcasing early-stage startups.",
    tags: ["Startup", "Business", "Entrepreneurship", "Networking"]
  },
  {
    title: "Gaming League",
    description: "E-sports tournament featuring Valorant, BGMI, and FIFA championships.",
    tags: ["Gaming", "Esports", "Competition", "Fun"]
  },
  {
    title: "Drama Fiesta",
    description: "Stage play competition highlighting social and cultural themes.",
    tags: ["Drama", "Theatre", "Cultural", "Performance"]
  },
  {
    title: "Hack the Climate",
    description: "Hackathon focused on building climate tech and sustainability solutions.",
    tags: ["Hackathon", "Sustainability", "Environment", "GreenTech"]
  },
  {
    title: "Photography Challenge",
    description: "Show your photography skills with the theme 'City Life in Motion'.",
    tags: ["Photography", "Creativity", "Art", "Contest"]
  },
  {
    title: "Food Carnival",
    description: "Explore cuisines from across the country with food stalls and competitions.",
    tags: ["Food", "Festival", "Fun", "Cultural"]
  },
  {
    title: "Quiz Masters",
    description: "General knowledge and current affairs quiz competition.",
    tags: ["Quiz", "Knowledge", "Competition", "Education"]
  },
  {
    title: "Yoga for Youth",
    description: "A wellness event promoting mindfulness and yoga practices.",
    tags: ["Yoga", "Health", "Wellness", "Mindfulness"]
  },
  {
    title: "Cyber Security Workshop",
    description: "Hands-on session on ethical hacking and cyber awareness.",
    tags: ["Cybersecurity", "Workshop", "Tech", "Ethical Hacking"]
  },
  {
    title: "Robotics Challenge",
    description: "Build and program autonomous robots to complete obstacle courses.",
    tags: ["Robotics", "Engineering", "Tech", "Competition"]
  },
  {
    title: "Music Fest Night",
    description: "An evening of live music performances by solo artists and bands.",
    tags: ["Music", "Live", "Concert", "Cultural"]
  }
];

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await Event.deleteMany({});
    await Event.insertMany(events);
    console.log("✅ Events seeded successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding events:", err);
    mongoose.connection.close();
  }
})();
