import React, { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import EventCard from "../components/EventCard";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleRsvp = async (ev) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user?._id && !user?.id) throw new Error("login");
      await API.post("/rsvps", { userId: user._id || user.id, eventId: ev._id });
      alert("RSVP saved");
      load();
    } catch (err) {
      alert("Please login to RSVP.");
    }
  };

  return (
    <main>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[var(--primary)]">Discover Events</h2>
        <div className="badge">For You</div>
      </div>

      {loading ? <div className="text-center py-12">Loading…</div> :
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(ev => <EventCard key={ev._id} ev={ev} onRsvp={handleRsvp} />)}
        </div>
      }
    </main>
  );
}
