import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import eventRoutes from "./routes/events.js";
import rsvpRoutes from "./routes/rsvps.js";
import analyticsRoutes from "./routes/analytics.js";
import recommendRoutes from "./routes/recommend.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// health check krlooo
app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/rsvps", rsvpRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/recommend", recommendRoutes);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, { autoIndex: true })
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
