import React, { useState, useEffect } from "react";
import API from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    if (user) setForm({ name: user.name || "", email: user.email || "" });
  }, [user]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put(`/users/${user._id || user.id}`, form);
      login(res.data, localStorage.getItem("token"));
      alert("Profile updated");
    } catch (err) {
      alert("Failed to update");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold text-[var(--primary)]">Your Profile</h2>
        <form onSubmit={submit} className="mt-4 space-y-4">
          <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name" className="w-full border rounded-lg p-3"/>
          <input value={form.email} disabled placeholder="Email" className="w-full border rounded-lg p-3 bg-gray-50" />
          <button className="btn-primary">Save Profile</button>
        </form>
      </div>
    </div>
  );
}
