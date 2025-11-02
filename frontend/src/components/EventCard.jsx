import React from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Tag } from "lucide-react";

export default function EventCard({ ev, onRsvp }) {
  const eventDate = new Date(ev.time || ev.date || ev.createdAt).toLocaleDateString();

  return (
    <article className="group relative bg-white/90 backdrop-blur-md border border-indigo-100 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
      {/* Gradient accent bar */}
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-indigo-600 to-purple-500 rounded-t-2xl" />

      <div className="flex flex-col gap-3 mt-2">
        {/* Title & Description */}
        <h3 className="text-xl font-semibold text-indigo-700 group-hover:text-indigo-800 transition">
          {ev.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3">{ev.description}</p>

        {/* Event details */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-2">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>{eventDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={16} />
            <span>{ev.location || "Offline"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Tag size={16} />
            <span>{ev.mode || "Offline"}</span>
          </div>
        </div>

        {/* Tags */}
        {ev.tags && ev.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {ev.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full font-medium"
              >
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => onRsvp && onRsvp(ev)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg shadow-md transition"
        >
          RSVP
        </button>
        <Link
          to={`/event/${ev._id}`}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition"
        >
          Details →
        </Link>
      </div>
    </article>
  );
}