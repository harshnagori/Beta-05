import React, { useState } from "react";
import API from "../api/axiosConfig";
import { motion, AnimatePresence } from "framer-motion";

// Toast Component
const Toast = ({ message, type = "success", onClose }) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 50 }}
    className={`fixed top-5 right-5 px-6 py-3 rounded-xl shadow-lg text-white z-50 ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    }`}
  >
    {message}
    <button onClick={onClose} className="ml-4 font-bold hover:underline">✕</button>
  </motion.div>
);

export default function CreateEvent() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    tags: "",
    mode: "offline", // default event mode
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000); // auto-dismiss
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        ...form,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };
      const res = await API.post("/events", payload);
      showToast("Event created successfully!", "success");
      console.log("Created event:", res.data);
      setForm({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        tags: "",
        mode: "offline",
      });
    } catch (err) {
      console.error(err);
      showToast("Failed to create event.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10"
    >
      <AnimatePresence>{toast && <Toast {...toast} onClose={() => setToast(null)} />}</AnimatePresence>

      <h2 className="text-2xl font-bold text-indigo-700 mb-4">Create Event</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 h-24 focus:ring-2 focus:ring-indigo-400 outline-none"
          required
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          required
        />

        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          required
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          required
        />

        <input
          name="tags"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
        />

        {/* Event Mode (Online/Offline/Hybrid) */}
        <div className="flex items-center gap-4 mt-2">
          <span className="text-gray-700 font-medium">Event Mode:</span>
          {["online", "offline", "hybrid"].map((mode) => (
            <label key={mode} className="flex items-center gap-1">
              <input
                type="radio"
                name="mode"
                value={mode}
                checked={form.mode === mode}
                onChange={handleChange}
                className="accent-indigo-600"
                required
              />
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </label>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition mt-2"
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </motion.div>
  );
}
