from app.services.gemini import generate_response
from app.services.prompt_engine import build_lab_prompt


class ChatService:
    @staticmethod
    def process_query(user_query: str, context: str = "") -> str:
        """
        Generate an AI response based on the user's query
        and previous chat history.
        """

        prompt = build_lab_prompt(
            user_query=user_query,
            context=context
        )

        response = generate_response(prompt)

        return response