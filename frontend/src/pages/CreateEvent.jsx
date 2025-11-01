import React, { useState } from "react";
import API from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Calendar, MapPin, Tag, FileText } from "lucide-react";

export default function CreateEvent() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    tags: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        title: form.title,
        description: form.description,
        time: form.date,
        location: form.location,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        organizerId: user?._id || user?.id,
      };
      await API.post("/events", payload);
      navigate("/events");
    } catch (err) {
      alert("Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md border border-indigo-100 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          Create a New Event
        </h2>

        <form onSubmit={submit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <FileText size={18} /> Title
            </label>
            <input
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter event title"
              className="w-full border border-indigo-100 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <FileText size={18} /> Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Describe your event"
              className="w-full border border-indigo-100 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none transition h-28 resize-none"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Calendar size={18} /> Date & Time
            </label>
            <input
              type="datetime-local"
              value={form.date}
              onChange={(e) => handleChange("date", e.target.value)}
              className="w-full border border-indigo-100 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <MapPin size={18} /> Location
            </label>
            <input
              value={form.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="Enter venue or online link"
              className="w-full border border-indigo-100 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Tag size={18} /> Tags
            </label>
            <input
              value={form.tags}
              onChange={(e) => handleChange("tags", e.target.value)}
              placeholder="e.g. tech, workshop, networking"
              className="w-full border border-indigo-100 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition disabled:opacity-60"
            >
              {loading ? "Saving..." : "Post Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
