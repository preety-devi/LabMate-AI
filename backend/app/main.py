from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.chat import router as chat_router
from app.database.db import init_db

app = FastAPI(
    title="LabMate AI",
    description="AI Engineering Lab Assistant Chatbot",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    """
    Initialize the database when the application starts.
    """
    init_db()


# Register API routes
app.include_router(chat_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to LabMate AI 🚀",
        "status": "Running"
    }