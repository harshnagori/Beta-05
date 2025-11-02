import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, login } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    bio: "",
    interests: "",
    skills: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?._id) return;
    (async () => {
      try {
        const res = await API.get(`/users/${user._id}`);
        const u = res.data;
        setForm({
          name: u.name || "",
          email: u.email || "",
          bio: u.bio || "",
          interests: (u.interests || []).join(", "),
          skills: (u.skills || []).join(", ")
        });
      } catch (err) {
        console.error("Load profile err", err);
      }
    })();
  }, [user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: form.name,
        bio: form.bio,
        interests: form.interests,
        skills: form.skills
      };
      const res = await API.put(`/users/${user._id}`, payload);
      login(res.data, localStorage.getItem("token"));
      alert("Profile updated");
    } catch (err) {
      console.error("Save profile err", err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!user)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center text-gray-600">
        <p>Please login to edit your profile.</p>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-gray-100"
      >
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-8 text-indigo-600"
        >
          Your Profile
        </motion.h2>

        <form onSubmit={submit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Email</label>
              <input
                name="email"
                value={form.email}
                disabled
                className="border border-gray-200 rounded-xl px-4 py-3 bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-700 font-medium mb-1">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Short bio"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 h-24 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-700 font-medium mb-1">Interests</label>
              <input
                name="interests"
                value={form.interests}
                onChange={handleChange}
                placeholder="music, ai, gaming"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium mb-1">Skills</label>
              <input
                name="skills"
                value={form.skills}
                onChange={handleChange}
                placeholder="javascript, singing"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex justify-center gap-4 pt-4"
          >
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all"
            >
              {loading ? "Saving..." : "Save Profile"}
            </button>
            <button
              type="button"
              onClick={() => setForm({ ...form, interests: "", skills: "" })}
              className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition-all"
            >
              Clear
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
