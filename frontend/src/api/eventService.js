import API from "./axiosConfig";

export const fetchEvents = async (params = {}) => {
  const res = await API.get("/events", { params });
  return res.data;
};

export const fetchEvent = async (id) => {
  const res = await API.get(`/events/${id}`);
  return res.data;
};

export const createEvent = async (payload) => {
  const res = await API.post("/events", payload);
  return res.data;
};

export const rsvpEvent = async ({ userId, eventId, status = "going" }) => {
  const res = await API.post("/rsvps", { userId, eventId, status });
  return res.data;
};
