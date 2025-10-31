import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition-all">
      <img
        src={event.image}
        alt={event.title}
        className="rounded-xl w-full h-40 object-cover mb-4"
      />
      <h2 className="text-lg font-semibold text-[#0056B3] mb-2">
        {event.title}
      </h2>
      <p className="text-sm text-gray-600 mb-3">{event.date}</p>
      <p className="text-sm mb-4 text-gray-700 line-clamp-3">{event.desc}</p>
      <Link
        to={`/event/${event.id}`}
        className="inline-block bg-[#0056B3] text-white px-4 py-2 rounded-lg hover:bg-[#004999] transition"
      >
        View Details
      </Link>
    </div>
  );
};

export default EventCard;
