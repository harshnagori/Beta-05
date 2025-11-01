import React, { useEffect, useState } from "react";
import API from "../api/axiosConfig";

export default function OrganizerDashboard() {
  const [metrics, setMetrics] = useState({ totalEvents: 0, totalRSVPs: 0, topEvents: [] });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get("/analytics");
        setMetrics(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-[var(--primary)]">Organizer Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="metric"><div className="text-3xl font-bold text-[var(--primary)]">{metrics.totalEvents}</div><div className="text-sm text-gray-600">Total Events</div></div>
        <div className="metric"><div className="text-3xl font-bold text-[var(--primary)]">{metrics.totalRSVPs}</div><div className="text-sm text-gray-600">Total RSVPs</div></div>
        <div className="metric"><div className="text-3xl font-bold text-[var(--primary)]">{metrics.topEvents?.length || 0}</div><div className="text-sm text-gray-600">Top Events</div></div>
      </div>

      <div className="card">
        <h3 className="font-semibold text-[var(--primary)]">Top Events</h3>
        <ul className="mt-4 space-y-2">
          {(metrics.topEvents || []).map(ev => (
            <li key={ev._id} className="flex justify-between items-center">
              <div>{ev.title}</div>
              <div className="text-sm text-gray-500">{ev.rsvpCount} RSVPs</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
