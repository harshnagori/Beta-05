// src/pages/EventCreate.jsx
const EventCreate = () => {
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-[#0056B3] mb-6">Create Event</h2>
      <form className="space-y-5">
        <input
          placeholder="Event Title"
          className="w-full border border-gray-300 rounded-lg p-3 focus:border-[#007AFF]"
        />
        <input
          placeholder="Date"
          type="date"
          className="w-full border border-gray-300 rounded-lg p-3 focus:border-[#007AFF]"
        />
        <textarea
          placeholder="Description"
          rows={4}
          className="w-full border border-gray-300 rounded-lg p-3 focus:border-[#007AFF]"
        />
        <button className="bg-[#0056B3] text-white px-5 py-2 rounded-lg hover:bg-[#004999]">
          Post Event
        </button>
      </form>
    </div>
  );
};

export default EventCreate;
