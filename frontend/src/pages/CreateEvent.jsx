// frontend/src/pages/CreateEvent.jsx
import React, { useState } from "react";
import API from "../api/axiosConfig";
import { motion } from "framer-motion";

export default function CreateEvent() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    tags: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
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
      setMessage("Event created successfully!");
      console.log("Created event:", res.data);
      setForm({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        tags: "",
      });
    } catch (err) {
      console.error(err);
      setMessage("Failed to create event.");
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
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">Create Event</h2>

      {message && <p className="mb-4 text-center text-gray-700">{message}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 h-24"
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2"
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2"
        />
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2"
        />
        <input
          name="tags"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </motion.div>
  );
}
