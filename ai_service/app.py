# ai_service/app.py
import os
from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
from huggingface_hub import InferenceClient
import numpy as np
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
HF_TOKEN = os.getenv("HUGGINGFACE_TOKEN")
MODEL_NAME = os.getenv("MODEL_NAME", "BAAI/bge-small-en-v1.5")
PORT = int(os.getenv("PORT", 8000))

# Initialize Hugging Face InferenceClient
client = InferenceClient(provider="hf-inference", api_key=HF_TOKEN)
print(f"[ai_service] Using model: {MODEL_NAME}")

# FastAPI setup
app = FastAPI()

# Pydantic models
class EventItem(BaseModel):
    id: str
    text: str

class RecommendRequest(BaseModel):
    user: str
    events: List[EventItem]

# Cosine similarity helper
def cosine_similarity(vec1, vec2):
    vec1 = np.array(vec1)
    vec2 = np.array(vec2)
    return float(np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2)))

# API endpoint
@app.post("/recommend")
def recommend(data: RecommendRequest):
    print("[ai_service] /recommend called. Number of events:", len(data.events))

    # Get user embedding from HF
    user_embedding = client.feature_extraction(data.user, model=MODEL_NAME)

    ranked = []
    for ev in data.events:
        # Get event embedding from HF
        event_embedding = client.feature_extraction(ev.text, model=MODEL_NAME)
        score = cosine_similarity(user_embedding, event_embedding)
        ranked.append({"id": ev.id, "score": round(score, 4)})

    ranked_sorted = sorted(ranked, key=lambda x: x["score"], reverse=True)
    print("[ai_service] Returning top score:", ranked_sorted[0]["score"] if ranked_sorted else None)

    return {"recommendations": ranked_sorted}

# Run locally
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=PORT)
