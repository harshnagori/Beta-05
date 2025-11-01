import React, { useState, useEffect } from "react";
import API from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", bio: "", phone: "", location: "" });
  const [editing, setEditing] = useState(false);
  const [stats, setStats] = useState({ totalEvents: 0, totalRSVPs: 0 });
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "",
        phone: user.phone || "",
        location: user.location || "",
      });
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      const [eventsRes, statsRes] = await Promise.all([
        API.get(`/users/${user?._id || user?.id}/events`),
        API.get(`/users/${user?._id || user?.id}/stats`),
      ]);
      setEvents(eventsRes.data || []);
      setStats(statsRes.data || { totalEvents: 0, totalRSVPs: 0 });
    } catch (err) {
      console.error(err);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put(`/users/${user._id || user.id}`, form);
      login(res.data, localStorage.getItem("token"));
      alert("Profile updated successfully");
      setEditing(false);
    } catch {
      alert("Failed to update profile");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* User Info */}
      <div className="card p-6 flex flex-col sm:flex-row gap-6 items-center">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=random`}
          alt="avatar"
          className="w-28 h-28 rounded-full shadow-md"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-[var(--primary)] mb-2">{form.name}</h2>
          <p className="text-gray-600">{form.email}</p>
          <p className="text-gray-500 mt-2">{form.bio || "No bio added yet."}</p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-600">
            {form.phone && <div>📞 {form.phone}</div>}
            {form.location && <div>📍 {form.location}</div>}
          </div>
          <button onClick={() => setEditing(!editing)} className="btn-primary mt-4">
            {editing ? "Cancel" : "Edit Profile"}
          </button>
        </div>
      </div>

      {/* Edit Form */}
      {editing && (
        <div className="card p-6">
          <h3 className="font-semibold text-[var(--primary)] mb-4">Edit Profile</h3>
          <form onSubmit={submit} className="space-y-4">
            <input
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Name"
              className="w-full border rounded-lg p-3"
            />
            <input
              value={form.email}
              disabled
              placeholder="Email"
              className="w-full border rounded-lg p-3 bg-gray-50"
            />
            <input
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              placeholder="Phone"
              className="w-full border rounded-lg p-3"
            />
            <input
              value={form.location}
              onChange={e => setForm({ ...form, location: e.target.value })}
              placeholder="Location"
              className="w-full border rounded-lg p-3"
            />
            <textarea
              value={form.bio}
              onChange={e => setForm({ ...form, bio: e.target.value })}
              placeholder="Bio"
              className="w-full border rounded-lg p-3 h-24"
            />
            <button type="submit" className="btn-primary w-full">
              Save Changes
            </button>
          </form>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="metric">
          <div className="text-3xl font-bold text-[var(--primary)]">{stats.totalEvents}</div>
          <div className="text-sm text-gray-600">Events Created</div>
        </div>
        <div className="metric">
          <div className="text-3xl font-bold text-[var(--primary)]">{stats.totalRSVPs}</div>
          <div className="text-sm text-gray-600">RSVPs Attended</div>
        </div>
      </div>

      {/* Event History */}
      <div className="card p-6">
        <h3 className="font-semibold text-[var(--primary)] mb-4">Your Events</h3>
        {events.length === 0 ? (
          <div className="text-gray-500 text-sm">No events found.</div>
        ) : (
          <ul className="space-y-3">
            {events.map(ev => (
              <li
                key={ev._id}
                className="border p-4 rounded-lg hover:shadow-sm transition flex justify-between"
              >
                <div>
                  <div className="font-medium">{ev.title}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(ev.date).toLocaleString()} • {ev.location}
                  </div>
                </div>
                <div className="text-sm text-gray-600">{ev.rsvpCount || 0} RSVPs</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
