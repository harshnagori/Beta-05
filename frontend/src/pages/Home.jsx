import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-bold text-[var(--primary)]">Discover events that boost your skills & career</h1>
          <p className="text-gray-700 mt-4 max-w-xl">
            Eventure AI centralizes workshops, hackathons and meetups — then recommends what matters to you.
          </p>
          <div className="mt-6 flex gap-3">
            <Link to="/events" className="btn-primary">Browse Events</Link>
            <Link to="/create" className="text-[var(--accent)] font-semibold">Post an event</Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-6">
          <h4 className="font-semibold text-[var(--primary)]">Why Eventure AI?</h4>
          <ul className="mt-4 text-gray-700 space-y-3">
            <li>• Personalized recommendations</li>
            <li>• Organizer insights & analytics</li>
            <li>• RSVP & reminders</li>
          </ul>
        </div>
      </div>

      <section className="mt-12">
        <h3 className="text-2xl font-semibold text-[var(--primary)] mb-4">Recommended for you</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* placeholder: link to Events page for real data */}
          <div className="card">Preview: Open Events page to see real recommendations.</div>
        </div>
      </section>
    </main>
  );
}
