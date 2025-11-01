import React, { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import { BarChart2, Users, Calendar, TrendingUp } from "lucide-react";

export default function OrganizerDashboard() {
  const [metrics, setMetrics] = useState({
    totalEvents: 0,
    totalRSVPs: 0,
    topEvents: [],
  });

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
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Dashboard Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 shadow-lg mb-10">
          <h2 className="text-3xl font-bold">Organizer Dashboard</h2>
          <p className="text-indigo-100 mt-2">
            Track your events, analyze engagement, and view top-performing activities.
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Events</p>
                <h3 className="text-3xl font-bold text-indigo-600">
                  {metrics.totalEvents}
                </h3>
              </div>
              <Calendar className="text-indigo-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total RSVPs</p>
                <h3 className="text-3xl font-bold text-indigo-600">
                  {metrics.totalRSVPs}
                </h3>
              </div>
              <Users className="text-indigo-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Top Events</p>
                <h3 className="text-3xl font-bold text-indigo-600">
                  {metrics.topEvents?.length || 0}
                </h3>
              </div>
              <BarChart2 className="text-indigo-500" size={32} />
            </div>
          </div>
        </div>

        {/* Top Events Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-indigo-700 flex items-center gap-2">
              <TrendingUp size={20} />
              Top Events by Engagement
            </h3>
          </div>

          {metrics.topEvents?.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {metrics.topEvents.map((ev) => (
                <li
                  key={ev._id}
                  className="py-3 flex justify-between items-center hover:bg-gray-50 rounded-lg transition"
                >
                  <div>
                    <p className="font-medium text-gray-800">{ev.title}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(ev.date || ev.time).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-indigo-600 font-semibold bg-indigo-50 px-3 py-1 rounded-full text-sm">
                    {ev.rsvpCount} RSVPs
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-6">
              No top events to display yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
