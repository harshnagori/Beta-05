import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axiosConfig";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    API.get(`/events/${id}`).then(res => setEvent(res.data)).catch(console.error);
  }, [id]);

  if (!event) return <div className="text-center py-12">Loading…</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold text-[var(--primary)]">{event.title}</h2>
        <p className="text-gray-700 mt-3">{event.description}</p>
        <div className="mt-4 text-sm text-gray-500">When: {new Date(event.time || event.date).toLocaleString()}</div>
        <div className="mt-1 text-sm text-gray-500">Location: {event.location}</div>
      </div>
    </div>
  );
}
