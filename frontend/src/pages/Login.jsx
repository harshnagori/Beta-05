import React, { useState } from "react";
import API from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await API.post("/auth/login", form);
      if (res.data.token) {
        login(res.data.user, res.data.token);
        navigate("/events");
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">Login</h2>
        <form onSubmit={submit} className="space-y-4">
          <input type="email" required placeholder="Email" value={form.email}
                 onChange={(e)=>setForm({...form,email:e.target.value})}
                 className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"/>
          <input type="password" required placeholder="Password" value={form.password}
                 onChange={(e)=>setForm({...form,password:e.target.value})}
                 className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"/>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button className="btn-primary w-full" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        </form>
      </div>
      <div className="text-center text-sm text-gray-600 mt-3">
        New here? <a href="/register" className="text-[var(--accent)]">Create account</a>
      </div>
    </div>
  );
}
