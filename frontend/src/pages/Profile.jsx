// src/pages/Profile.jsx
const Profile = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-[#0056B3] mb-4">Your Profile</h2>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-gray-700">Name</label>
          <input
            className="w-full border border-gray-300 rounded-lg p-3 focus:border-[#007AFF]"
            value="John Doe"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700">Email</label>
          <input
            className="w-full border border-gray-300 rounded-lg p-3 focus:border-[#007AFF]"
            value="john@example.com"
          />
        </div>
        <button className="bg-[#0056B3] text-white px-5 py-2 rounded-lg hover:bg-[#004999]">
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
