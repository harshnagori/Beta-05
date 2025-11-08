import axios from "axios";

export const getAIRecommendations = async (userDescription, events) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/recommend", {
      user: userDescription,
      events: events.map((e) => e.description),
    });

    return response.data.recommendations.map((r) => ({
      description: r.event,
      score: r.score,
    }));
  } catch (error) {
    console.error("AI Recommendation Error:", error.message);
    return [];
  }
};
