import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  Rocket,
  CalendarDays,
  BrainCircuit,
  Users,
  Trophy,
  MapPin,
  Target,
} from "lucide-react";

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-slate-50 to-indigo-100 min-h-screen text-gray-800">
      {/* HERO */}
      <section className="container mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-extrabold text-indigo-700 leading-tight">
            Discover Events That <br />
            <span className="text-indigo-500">Empower Your Future</span>
          </h1>
          <p className="text-gray-700 mt-6 text-lg max-w-md">
            Eventure AI helps you find the most relevant hackathons, workshops,
            and meetups — intelligently recommended using machine learning.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="/events"
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition font-medium"
            >
              <Rocket className="inline-block w-5 h-5 mr-2" />
              Browse Events
            </Link>
            <Link
              to="/create"
              className="text-indigo-700 font-semibold hover:underline flex items-center"
            >
              <Sparkles className="w-5 h-5 mr-1 text-indigo-500" />
              Post an Event
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl p-8"
        >
          <h4 className="font-semibold text-xl text-indigo-700 mb-4 flex items-center">
            <BrainCircuit className="w-6 h-6 mr-2 text-indigo-500" />
            Why Eventure AI?
          </h4>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center gap-2">
              <Sparkles className="text-indigo-500 w-5 h-5" /> Personalized
              recommendations
            </li>
            <li className="flex items-center gap-2">
              <CalendarDays className="text-indigo-500 w-5 h-5" /> RSVP &
              reminders
            </li>
            <li className="flex items-center gap-2">
              <Rocket className="text-indigo-500 w-5 h-5" /> Organizer insights
              & analytics
            </li>
          </ul>
        </motion.div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-indigo-700 mb-8">
            How Eventure AI Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                icon: Users,
                title: "Create Your Profile",
                text: "Sign up and share your interests, skills, and goals.",
              },
              {
                icon: Target,
                title: "Smart Recommendations",
                text: "Our AI matches you with the best events tailored for you.",
              },
              {
                icon: CalendarDays,
                title: "RSVP & Track",
                text: "Bookmark and manage your event calendar easily.",
              },
              {
                icon: Trophy,
                title: "Grow & Network",
                text: "Attend events that boost your growth and connections.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="bg-indigo-50 rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >
                <step.icon className="text-indigo-600 w-10 h-10 mx-auto mb-4" />
                <h4 className="font-semibold text-lg text-indigo-700 mb-2">
                  {step.title}
                </h4>
                <p className="text-gray-600 text-sm">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TOP CATEGORIES */}
      <section className="py-20 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-indigo-700 mb-10 text-center">
            Popular Event Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "Hackathons",
              "AI Workshops",
              "Tech Meetups",
              "Startup Summits",
              "Open Source Jams",
              "Data Science Talks",
              "Blockchain Sessions",
              "Women in Tech Events",
            ].map((cat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl shadow p-6 text-center font-medium border border-indigo-100 hover:border-indigo-300 transition"
              >
                {cat}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-indigo-700 mb-10">
            Loved by the Tech Community
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Aarav Patel",
                text: "Eventure AI helped me find hackathons that matched my AI interests. Game-changer!",
              },
              {
                name: "Priya Sharma",
                text: "Got my dream internship after attending a networking meetup suggested by Eventure AI.",
              },
              {
                name: "Rohan Mehta",
                text: "Love how clean and intuitive the platform is. It feels like Netflix for tech events.",
              },
            ].map((review, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-indigo-50 rounded-xl p-6 shadow-sm"
              >
                <p className="text-gray-600 italic mb-4">“{review.text}”</p>
                <h4 className="font-semibold text-indigo-700">{review.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-indigo-600 text-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-6"
        >
          Ready to Experience Eventure AI?
        </motion.h2>
        <p className="text-indigo-100 mb-8">
          Join thousands of learners and professionals finding the perfect events every week.
        </p>
        <Link
          to="/signup"
          className="bg-white text-indigo-700 px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-indigo-100 transition"
        >
          Get Started
        </Link>
      </section>
    </main>
  );
}
