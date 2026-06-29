# System Architecture: LabMate AI – AI Engineering Lab Assistant Chatbot

This document explains how the LabMate AI system works and how different parts of the system are connected.

---

# System Overview

LabMate AI is a web-based chatbot that helps engineering students understand laboratory experiments and concepts.

The system allows students to ask any question, and it gives structured answers like explanations, viva questions, and lab report content.

The system works using a simple client-server model:
- Frontend (React) for user interaction
- Backend (FastAPI) for processing requests
- AI Engine (Gemini API) for generating responses
- Database (SQLite) for storing chat history

---

# System Architecture Flow

            +----------------------+
            |       Student        |
            +----------+-----------+
                       |
                       v
            +----------------------+
            |   React Frontend     |
            |   (User Interface)   |
            +----------+-----------+
                       |
                HTTP Requests
                       |
                       v
            +----------------------+
            |    FastAPI Backend   |
            +----------+-----------+
                       |
            +----------+-----------+
            |                      |
            v                      v
    +----------------+     +----------------+
    |   Gemini API   |     | SQLite Database|
    | (AI Engine)    |     | (Chat History)  |
    +----------------+     +----------------+

---

# Components of System

## 1. Frontend (React)

- Provides chat interface for users
- Takes input from student
- Shows AI-generated answers
- Displays chat history

---

## 2. Backend (FastAPI)

- Receives user input from frontend
- Processes the input
- Creates structured prompt for AI
- Sends request to Gemini API
- Saves response in database
- Sends final answer back to frontend

---

## 3. AI Engine (Gemini API)

- Generates answers for user questions
- Provides explanations of engineering concepts
- Generates viva questions and lab report content
- Gives structured academic responses

---

## 4. Prompt Processing

- Understands user question
- Identifies type of request (explanation, viva, report, concept)
- Creates proper prompt for AI model

---

## 5. Database (SQLite)

- Stores chat history
- Saves user questions and AI responses
- Keeps timestamp of conversations

Database file:
- labmate.db

---

# Data Flow (Step by Step)

1. Student types a question in chatbot
2. React frontend sends request to backend
3. Backend processes the question
4. Backend creates prompt for Gemini API
5. Gemini generates response
6. Response is saved in SQLite database
7. Backend sends response to frontend
8. Frontend displays answer to student

---

# API Endpoints

| Method | Endpoint   | Purpose            |
|--------|------------|--------------------|
| POST   | /chat      | Send user message  |
| GET    | /history   | Get chat history   |
| DELETE | /history   | Clear chat history |

---

# Security

- API keys are stored safely in environment variables
- User input is validated
- Errors are handled properly
- Database is used safely for storing data

---

# Future Improvements

- Add user login system
- Support multiple users
- Deploy on cloud
- Improve prompt system
- Add mobile app version

---

# Conclusion

LabMate AI is a simple client-server based AI system that uses React, FastAPI, and Gemini API to help engineering students learn faster. It also stores chat history to improve user experience.