from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv
import os

# Load .env file
load_dotenv()

# Get GROQ API Key
GROQ_API_KEY = os.environ.get("GROQ_API_KEY")

# Initialize Groq client
client = Groq(api_key=GROQ_API_KEY)

# Create FastAPI app
app = FastAPI()

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://ai-blogsite.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- MODELS ----------
class BlogRequest(BaseModel):
    content: str
    targetLang: str | None = None

class TopicRequest(BaseModel):
    topic: str
    language: str | None = "English"

class RetoneRequest(BaseModel):
    blogContent: str
    tone: str


# ---------- ROUTES ----------

@app.get("/")
def home():
    return {"message": "API is running 🚀"}


@app.post("/ai/summary")
async def summary(req: BlogRequest):
    resp = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[{
            "role": "user",
            "content": f"Summarize the following blog content:\n\n{req.content}"
        }],
        max_tokens=300
    )
    return {"summary": resp.choices[0].message.content.strip()}


@app.post("/ai/questions")
async def questions(req: BlogRequest):
    resp = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[{
            "role": "user",
            "content": f"Generate 3 questions based on this blog content:\n\n{req.content}"
        }],
        max_tokens=300
    )
    raw = resp.choices[0].message.content.strip()
    questions = [q.strip("-•123. ").strip() for q in raw.split("\n") if q.strip()]
    return {"questions": questions}


@app.post("/ai/translate")
async def translate(req: BlogRequest):
    if not req.targetLang:
        return {"error": "targetLang field is required for translation"}
    
    prompt = f"Translate the following blog into {req.targetLang}:\n\n{req.content}"
    resp = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=500
    )
    return {"translated": resp.choices[0].message.content.strip()}


@app.post("/ai/retone-blog")
async def retone(req: RetoneRequest):
    prompt = f"Rewrite the blog below in a {req.tone} tone:\n\n{req.blogContent}"
    resp = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=600
    )
    return {"rewritten": resp.choices[0].message.content.strip()}


@app.post("/ai/generate-blog")
async def gen_blog(req: TopicRequest):
    lang = req.language or "English"
    prompt = f"Write a detailed blog post on the topic '{req.topic}' in {lang}."
    resp = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=800
    )
    return {"blog": resp.choices[0].message.content.strip()}


@app.post("/ai/generate-outline")
async def gen_outline(req: TopicRequest):
    lang = req.language or "English"
    prompt = f"Create a structured outline for a blog on '{req.topic}' in {lang}."
    resp = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=500
    )
    return {"outline": resp.choices[0].message.content.strip()}


@app.post("/ai/suggest-titles")
async def suggest_titles(req: TopicRequest):
    lang = req.language or "English"
    prompt = f"Suggest 5 engaging blog titles for the topic '{req.topic}' in {lang}."
    resp = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=200
    )
    titles = [t.strip("-•123. ").strip() for t in resp.choices[0].message.content.strip().split("\n") if t.strip()]
    return {"titles": titles}
