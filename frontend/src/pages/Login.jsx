import React, { useState } from "react";
import API from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Loader2, Lock, Mail, Calendar, Sparkles, Users } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#f8faff] via-[#eef2ff] to-[#e0e7ff] relative overflow-hidden">
      {/* Soft floating blobs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ y: [0, -20, 20, 0], x: [0, 15, -15, 0] }}
        transition={{ duration: 16, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25"
        animate={{ y: [0, 30, -30, 0], x: [0, -20, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      {/* Left Panel — product showcase */}
      <div className="hidden md:flex md:w-1/2 flex-col justify-center p-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white/50 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-10"
        >
          <h1 className="text-4xl font-extrabold text-indigo-800 mb-4">
            Welcome to Eventure AI
          </h1>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            Smart event recommendations powered by AI.  
            Find the right workshop, hackathon, or seminar — all personalized for you.
          </p>

          {/* Small floating preview */}
          <div className="flex flex-col gap-3">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="p-4 bg-white rounded-2xl shadow-md flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Calendar size={22} className="text-indigo-600" />
                <div>
                  <div className="font-semibold text-gray-800">AI Innovation Hackathon</div>
                  <div className="text-sm text-gray-500">Nov 12 · Online</div>
                </div>
              </div>
              <Sparkles className="text-indigo-500" size={18} />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              className="p-4 bg-white rounded-2xl shadow-md flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Users size={22} className="text-indigo-600" />
                <div>
                  <div className="font-semibold text-gray-800">Design Meetup 2025</div>
                  <div className="text-sm text-gray-500">Udaipur · In-person</div>
                </div>
              </div>
              <Sparkles className="text-indigo-500" size={18} />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Right Panel — login */}
      <div className="flex-1 flex items-center justify-center p-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white/80 backdrop-blur-2xl p-8 rounded-2xl shadow-2xl border border-gray-100"
        >
          <h2 className="text-3xl font-bold text-center text-indigo-700 mb-4">
            Login to Eventure AI
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Enter your details to continue exploring events.
          </p>

          <form onSubmit={submit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                required
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full pl-10 border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="password"
                required
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full pl-10 border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <button
              className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white py-3 rounded-lg font-semibold transition flex justify-center items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} /> Logging in…
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="text-center text-sm text-gray-600 mt-6">
            New here?{" "}
            <Link
              to="/register"
              className="text-indigo-600 hover:text-indigo-700 font-semibold"
            >
              Create account
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
