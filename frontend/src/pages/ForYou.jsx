// src/pages/ForYou.jsx
import EventCard from "../components/EventCard";

const ForYou = () => {
  const events = [
    {
      id: 1,
      title: "AI Innovation Summit",
      date: "Nov 10, 2025",
      desc: "Explore cutting-edge AI innovations and meet leading experts.",
      image: "https://media.licdn.com/dms/image/v2/D560BAQEl6sW1A7YuhQ/company-logo_200_200/B56ZZdnkqDHgAI-/0/1745327377724?e=2147483647&v=beta&t=OrqMEe-gKPM5a817-8IB2KUxit0mvW0ZcVzgRA6gHm4",
    },
    {
      id: 2,
      title: "Community Clean-Up",
      date: "Nov 15, 2025",
      desc: "Join hands to make our neighborhoods cleaner and greener.",
      image: "https://i.natgeofe.com/k/3519980b-ba58-456d-b691-2ed516c223e0/clean-it-up-textimage_3x2.jpg",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#0056B3] mb-6">
        Events Recommended For You
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default ForYou;
