import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function ForYou() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) return;
    (async () => {
      try {
        const res = await API.get(`/recommend/${user._id}`);
        setEvents(res.data.recommendations || []);
      } catch (err) {
        console.error("Fetch recommend err", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (!user)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center text-gray-600">
        <p>Please login to see your personalized recommendations.</p>
      </div>
    );

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-600 animate-pulse">
        Loading your personalized events...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-center mb-10 text-indigo-700">
          Recommended For You
        </h2>

        {events.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600 text-lg"
          >
            No recommendations yet. Update your profile with your interests and
            skills to get personalized suggestions.
          </motion.p>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {events.map((event) => (
              <motion.div
                key={event._id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all p-6 border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                    {event.title}
                  </h3>

                  {/* Match Percentage */}
                  {event.score !== undefined && (
                    <p className="text-green-600 font-medium mb-2">
                      🎯 Match: {(event.score * 100).toFixed(1)}%
                    </p>
                  )}

                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {event.description}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-indigo-600 font-medium mb-4">
                    {event.tags &&
                      event.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-indigo-50 border border-indigo-200 px-2 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                  </div>
                </div>

                <Link
                  to={`/event/${event._id}`}
                  className="mt-auto text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl font-semibold transition-all"
                >
                  View Details
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
