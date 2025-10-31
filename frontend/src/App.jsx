import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ForYou from "./pages/ForYou";
import EventCreate from "./pages/EventCreate";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import EventDetails from "./pages/EventDetails";
  
const App = () => {
  return (
    <Router>
      <div className="bg-[#F8F9FA] min-h-screen text-[#333333] font-sans">
        <Navbar />
        <div className="pt-20 px-6">
          <Routes>
            <Route path="/" element={<ForYou />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create" element={<EventCreate />} />
            <Route path="/dashboard" element={<OrganizerDashboard />} />
            <Route path="/event/:id" element={<EventDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
