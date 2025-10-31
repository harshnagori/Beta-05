import { useParams } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <img
        src={`https://source.unsplash.com/featured/?event,${id}`}
        alt="event"
        className="rounded-xl mb-6 w-full h-64 object-cover"
      />
      <h2 className="text-3xl font-bold text-[#0056B3] mb-2">
        Event #{id} Details
      </h2>
      <p className="text-gray-600 mb-4">
        Explore detailed information about this event, including the schedule,
        speakers, and registration process.
      </p>
      <button className="bg-[#0056B3] text-white px-5 py-2 rounded-lg hover:bg-[#004999]">
        RSVP Now
      </button>
    </div>
  );
};

export default EventDetails;
