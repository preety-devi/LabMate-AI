import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


class Settings:
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
    DATABASE_URL = os.getenv("DATABASE_URL", "labmate.db")
    SECRET_KEY = os.getenv("SECRET_KEY", "")


settings = Settings()