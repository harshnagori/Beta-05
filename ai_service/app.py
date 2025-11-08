from fastapi import FastAPI
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer, util
from typing import List, Dict

app = FastAPI()
model = SentenceTransformer('all-MiniLM-L6-v2')

class EventItem(BaseModel):
    id: str
    text: str

class RecommendRequest(BaseModel):
    user: str
    events: List[EventItem]

@app.post("/recommend")
def recommend(data: RecommendRequest):
    print("[ai_service] /recommend called. num_events=", len(data.events))
    user_embedding = model.encode(data.user, convert_to_tensor=True)
    event_texts = [ev.text for ev in data.events]
    event_embeddings = model.encode(event_texts, convert_to_tensor=True)
    scores_tensor = util.cos_sim(user_embedding, event_embeddings)[0]
    scores = scores_tensor.tolist()

    ranked = []
    for ev, score in zip(data.events, scores):
        ranked.append({"id": ev.id, "score": round(float(score), 4)})

    ranked_sorted = sorted(ranked, key=lambda x: x["score"], reverse=True)
    print("[ai_service] Returning top score:", ranked_sorted[0]["score"] if ranked_sorted else None)
    return {"recommendations": ranked_sorted}
