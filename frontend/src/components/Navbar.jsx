// src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  const navItems = [
    { name: "For You", path: "/" },
    { name: "Create Event", path: "/create" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <h1 className="text-2xl font-bold text-[#0056B3]">EventAI</h1>
        <ul className="flex space-x-6">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`${
                  pathname === item.path
                    ? "text-[#0056B3] font-semibold border-b-2 border-[#0056B3]"
                    : "text-gray-700 hover:text-[#007AFF]"
                } pb-1`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to="/login"
          className="bg-[#0056B3] text-white px-4 py-2 rounded-lg shadow hover:bg-[#004999] transition"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
