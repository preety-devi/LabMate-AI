import google.generativeai as genai

from app.config.settings import settings

# Configure Gemini API
if settings.GEMINI_API_KEY:
    genai.configure(api_key=settings.GEMINI_API_KEY)
    model = genai.GenerativeModel("gemini-2.5-flash")
else:
    model = None


def generate_response(prompt: str) -> str:
    """
    Generate a response using the Gemini API.
    """

    if model is None:
        return "Gemini API key is not configured."

    try:
        response = model.generate_content(prompt)

        if response and hasattr(response, "text"):
            return response.text.strip()

        return "Sorry, I couldn't generate a response."

    except Exception as e:
        print(f"Gemini Error: {e}")

        return (
            "Sorry, I couldn't process your request at the moment. "
            "Please try again later."
        )