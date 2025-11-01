import React, { useState } from "react";
import API from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await API.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">Create account</h2>
        <form onSubmit={submit} className="space-y-4">
          <input type="text" required placeholder="Full name" value={form.name}
                 onChange={(e)=>setForm({...form,name:e.target.value})}
                 className="w-full border border-gray-200 rounded-lg p-3"/>
          <input type="email" required placeholder="Email" value={form.email}
                 onChange={(e)=>setForm({...form,email:e.target.value})}
                 className="w-full border border-gray-200 rounded-lg p-3"/>
          <input type="password" required placeholder="Password" value={form.password}
                 onChange={(e)=>setForm({...form,password:e.target.value})}
                 className="w-full border border-gray-200 rounded-lg p-3"/>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button className="btn-primary w-full">Create account</button>
        </form>
      </div>
      <div className="text-center text-sm text-gray-600 mt-3">
        Already registered? <a href="/login" className="text-[var(--accent)]">Log in</a>
      </div>
    </div>
  );
}
