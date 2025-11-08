import React, { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import EventCard from "../components/EventCard";
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

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const load = async () => {
    try {
      const res = await API.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000); // auto-dismiss
  };

  const handleRsvp = async (ev) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user?._id && !user?.id) throw new Error("login");
      await API.post("/rsvps", { userId: user._id || user.id, eventId: ev._id });
      showToast("RSVP saved successfully!", "success");
      load();
    } catch (err) {
      showToast("Please login to RSVP.", "error");
    }
  };

  return (
    <main>
      <AnimatePresence>{toast && <Toast {...toast} onClose={() => setToast(null)} />}</AnimatePresence>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[var(--primary)]">Discover Events</h2>
        <div className="badge">For You</div>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading…</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(ev => <EventCard key={ev._id} ev={ev} onRsvp={handleRsvp} />)}
        </div>
      )}
    </main>
  );
}
