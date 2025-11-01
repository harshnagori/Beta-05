import React from "react";
import { Link } from "react-router-dom";

export default function EventCard({ ev, onRsvp }) {
  return (
    <article className="card card-lg flex flex-col h-full">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[var(--primary)]">{ev.title}</h3>
          <p className="text-sm text-gray-600 mt-2 line-clamp-3">{ev.description}</p>
        </div>
        <div className="text-right ml-4">
          <div className="text-sm text-gray-500">{new Date(ev.time || ev.date || ev.createdAt).toLocaleDateString()}</div>
          <div className="text-xs text-gray-400">{ev.mode || "offline"}</div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {(ev.tags || []).slice(0,3).map(t => (
            <span key={t} className="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-700">{t}</span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => onRsvp && onRsvp(ev)} className="btn-primary text-sm">RSVP</button>
          <Link to={`/event/${ev._id}`} className="text-sm text-gray-700 hover:text-[var(--accent)]">Details</Link>
        </div>
      </div>
    </article>
  );
}
