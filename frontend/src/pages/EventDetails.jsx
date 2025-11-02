import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axiosConfig";
import { motion } from "framer-motion";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get(`/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error("Fetch event error:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading event details...
      </div>
    );

  if (!event)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-600">
        <p>Event not found.</p>
        <Link
          to="/events"
          className="mt-4 text-indigo-600 hover:underline font-medium"
        >
          Back to Events
        </Link>
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto py-12 px-6"
    >
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        <h2 className="text-4xl font-bold text-indigo-700 mb-4">
          {event.title}
        </h2>
        <p className="text-gray-600 mb-6">{event.description}</p>

        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {event.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm border border-indigo-100"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {event.date && (
          <p className="text-gray-500 text-sm mb-2">
            📅 <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
          </p>
        )}
        {event.location && (
          <p className="text-gray-500 text-sm mb-6">
            📍 <strong>Location:</strong> {event.location}
          </p>
        )}

        <div className="flex justify-end">
          <Link
            to="/events"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl transition"
          >
            Back to Events
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
