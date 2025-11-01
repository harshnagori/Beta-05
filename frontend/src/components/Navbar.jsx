import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[var(--primary)] flex items-center justify-center text-white font-bold">
            EA
          </div>
          <div>
            <div className="text-lg font-bold text-[var(--primary)]">Eventure AI</div>
            <div className="text-xs text-gray-500">Discover. Decide. Do.</div>
          </div>
        </Link>

        <nav className="flex items-center gap-4">
          <Link to="/events" className="text-sm text-gray-700 hover:text-[var(--accent)]">Events</Link>
          <Link to="/create" className="text-sm text-gray-700 hover:text-[var(--accent)]">Create</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm text-gray-700 hover:text-[var(--accent)]">Dashboard</Link>
              <Link to="/profile" className="text-sm text-gray-700 hover:text-[var(--accent)]">{user.name}</Link>
              <button onClick={handleLogout} className="btn-primary ml-2">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-gray-700 hover:text-[var(--accent)]">Login</Link>
              <Link to="/register" className="btn-primary">Sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
