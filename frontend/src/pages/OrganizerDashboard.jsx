// src/pages/OrganizerDashboard.jsx
const OrganizerDashboard = () => {
  const metrics = [
    { label: "Total Events", value: 12 },
    { label: "Registrations", value: 342 },
    { label: "Upcoming", value: 4 },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-[#0056B3] mb-6">
        Organizer Dashboard
      </h2>
      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="bg-white shadow-md rounded-2xl p-5 text-center"
          >
            <h3 className="text-3xl font-bold text-[#0056B3]">{m.value}</h3>
            <p className="text-gray-600">{m.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="font-semibold text-[#0056B3] mb-4">
          Recent Registrations
        </h3>
        <table className="w-full text-sm text-left">
          <thead className="text-gray-600 border-b">
            <tr>
              <th className="py-2">Name</th>
              <th>Email</th>
              <th>Event</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">Alice Johnson</td>
              <td>alice@gmail.com</td>
              <td>AI Summit</td>
            </tr>
            <tr>
              <td className="py-2">Bob Smith</td>
              <td>bob@gmail.com</td>
              <td>Clean-Up Drive</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
