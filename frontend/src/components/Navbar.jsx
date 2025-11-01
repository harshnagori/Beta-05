import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { to: "/events", label: "Events" },
    { to: "/create", label: "Create" },
    ...(user ? [{ to: "/dashboard", label: "Dashboard" }] : []),
  ];

  return (
    <header className="bg-white/70 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group hover:scale-[1.02] transition-transform"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
            EA
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition">
              Eventure AI
            </div>
            <div className="text-xs text-gray-500">Discover. Decide. Do.</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.to}
              className="relative text-sm font-medium text-gray-600 hover:text-indigo-600 transition"
            >
              {link.label}
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}

          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition-all"
              >
                <img
                  src={`https://api.dicebear.com/9.x/identicon/svg?seed=${user.name}`}
                  alt="avatar"
                  className="w-8 h-8 rounded-full border border-gray-200"
                />
                <span className="text-gray-700 text-sm">{user.name}</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white/80 backdrop-blur-md border border-gray-100 rounded-lg shadow-lg text-sm text-gray-700 animate-fadeIn">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-500 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-gray-600 hover:text-indigo-600 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white/80 backdrop-blur-lg border-t border-gray-100 py-4 px-6 flex flex-col gap-4 animate-slideDown">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="text-gray-700 hover:text-indigo-600 transition text-sm font-medium"
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <>
              <Link
                to="/profile"
                onClick={() => setMobileOpen(false)}
                className="text-gray-700 hover:text-indigo-600 transition text-sm"
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false);
                }}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-gray-700 hover:text-indigo-600 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md transition text-center"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

