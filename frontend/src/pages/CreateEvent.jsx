// ---------- FILE: frontend/src/pages/CreateEvent.jsx ----------
import React, { useState } from "react";
import API from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function CreateEvent() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", date: "", location: "", tags: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        title: form.title,
        description: form.description,
        time: form.date,
        location: form.location,
        tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
        organizerId: user?._id || user?.id
      };
      await API.post("/events", payload);
      navigate("/events");
    } catch (err) {
      alert("Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold text-[var(--primary)]">Create Event</h2>
        <form onSubmit={submit} className="mt-4 space-y-4">
          <input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Title" className="w-full border rounded-lg p-3" required />
          <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Description" className="w-full border rounded-lg p-3" required />
          <input value={form.date} onChange={e=>setForm({...form,date:e.target.value})} type="datetime-local" className="w-full border rounded-lg p-3" />
          <input value={form.location} onChange={e=>setForm({...form,location:e.target.value})} placeholder="Location" className="w-full border rounded-lg p-3" />
          <input value={form.tags} onChange={e=>setForm({...form,tags:e.target.value})} placeholder="Tags (comma separated)" className="w-full border rounded-lg p-3" />
          <div className="flex gap-3">
            <button className="btn-primary" type="submit" disabled={loading}>{loading ? "Saving..." : "Post Event"}</button>
            <button type="button" onClick={()=>navigate(-1)} className="px-4 py-2 border rounded-lg">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
