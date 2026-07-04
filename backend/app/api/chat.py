from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

from app.database.db import get_connection
from app.services.chat_service import ChatService
from datetime import datetime

router = APIRouter(prefix="/chat", tags=["Chat"])


# -------------------------
# Pydantic Models
# -------------------------

class SessionCreate(BaseModel):
    title: str


class MessageCreate(BaseModel):
    content: str




class SessionResponse(BaseModel):
    id: int
    title: str
    created_at: str

class MessageResponse(BaseModel):
    id: int
    session_id: int
    sender: str
    content: str
    created_at: str

class ChatResponse(BaseModel):
    response: str


# -------------------------
# Get All Sessions
# -------------------------

@router.get("/sessions", response_model=List[SessionResponse])
def get_sessions():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM chat_sessions
        ORDER BY created_at DESC
    """)

    sessions = [dict(row) for row in cursor.fetchall()]

    conn.close()

    return sessions


# -------------------------
# Create New Session
# -------------------------

@router.post("/sessions", response_model=SessionResponse)
def create_session(session: SessionCreate):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO chat_sessions(title, created_at)
        VALUES (?, datetime('now'))
        """,
        (session.title,)
    )

    session_id = cursor.lastrowid

    cursor.execute(
        """
        INSERT INTO chat_messages(session_id, sender, content)
        VALUES (?, ?, ?)
        """,
        (
            session_id,
            "assistant",
            "Hi! How can I help you today?"
        )
    )

    conn.commit()

    cursor.execute(
        """
        SELECT id, title, created_at
        FROM chat_sessions
        WHERE id=?
        """,
        (session_id,)
    )

    row = cursor.fetchone()

    conn.close()

    return {
        "id": row["id"],
        "title": row["title"],
        "created_at": row["created_at"]
    }
# -------------------------
# Clear All Sessions
# -------------------------

@router.delete("/sessions")
def clear_sessions():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM chat_messages")
    cursor.execute("DELETE FROM chat_sessions")

    conn.commit()
    conn.close()

    return {"message": "All chat history cleared."}


# -------------------------
# Get Messages
# -------------------------

@router.get(
    "/sessions/{session_id}/messages",
    response_model=List[MessageResponse]
)
def get_messages(session_id: int):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM chat_messages
        WHERE session_id=?
        ORDER BY created_at ASC
    """, (session_id,))

    messages = [dict(row) for row in cursor.fetchall()]

    conn.close()

    return messages


# -------------------------
# Send Message
# -------------------------

@router.post(
    "/sessions/{session_id}/messages",
    response_model=ChatResponse
)
def send_message(session_id: int, message: MessageCreate):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM chat_sessions WHERE id=?",
        (session_id,)
    )

    session = cursor.fetchone()

    if session is None:
        conn.close()
        raise HTTPException(
            status_code=404,
            detail="Session not found"
        )

    # Save user message
    cursor.execute("""
        INSERT INTO chat_messages(session_id, sender, content)
        VALUES (?, ?, ?)
    """, (
        session_id,
        "user",
        message.content
    ))

    conn.commit()

    # Build conversation history
    cursor.execute("""
        SELECT sender, content
        FROM chat_messages
        WHERE session_id=?
        ORDER BY created_at ASC
    """, (session_id,))

    rows = cursor.fetchall()

    context = ""

    for row in rows[:-1]:
        role = "Student" if row["sender"] == "user" else "Assistant"
        context += f"{role}: {row['content']}\n"

    # Generate AI response
    ai_response = ChatService.process_query(
        message.content,
        context
    )

    # Save AI response
    cursor.execute("""
        INSERT INTO chat_messages(session_id, sender, content)
        VALUES (?, ?, ?)
    """, (
        session_id,
        "assistant",
        ai_response
    ))

    # Update title if still default
    if session["title"] in ["New Chat", "New Chat Session"]:

        words = message.content.split()

        title = " ".join(words[:4])

        if len(words) > 4:
            title += "..."

        cursor.execute("""
            UPDATE chat_sessions
            SET title=?
            WHERE id=?
        """, (
            title,
            session_id
        ))

    conn.commit()
    conn.close()

    return ChatResponse(response=ai_response)