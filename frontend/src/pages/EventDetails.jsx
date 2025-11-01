import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axiosConfig";
import { Calendar, MapPin, Tag, ArrowLeft } from "lucide-react";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    API.get(`/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch(console.error);
  }, [id]);

  if (!event)
    return (
      <div className="text-center py-20 text-gray-600 text-lg">Loading…</div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition mb-6"
        >
          <ArrowLeft size={18} /> Back to Events
        </Link>

        {/* Event Hero */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 shadow-lg mb-6">
          <h1 className="text-3xl font-bold">{event.title}</h1>
          <p className="text-indigo-100 mt-3 text-sm max-w-2xl">
            {event.description}
          </p>
        </div>

        {/* Details Card */}
        <div className="bg-white/80 backdrop-blur-md border border-indigo-100 rounded-2xl shadow-md p-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex items-center gap-3 text-gray-700">
              <Calendar size={18} className="text-indigo-500" />
              <span className="text-sm font-medium">
                {new Date(event.time || event.date).toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <MapPin size={18} className="text-indigo-500" />
              <span className="text-sm font-medium">{event.location}</span>
            </div>
          </div>

          {event.tags && event.tags.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
                <Tag size={16} className="text-indigo-500" /> Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition">
              RSVP Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
