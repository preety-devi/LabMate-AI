# Implementation Plan: LabMate AI – AI Engineering Lab Assistant Chatbot

This document outlines the implementation plan for LabMate AI, a web-based AI engineering lab assistant chatbot designed to help students with experiment explanations, viva preparation, lab reports, and concept understanding using AI.

---

# Project Title

LabMate AI – AI Engineering Lab Assistant Chatbot

---

# Technology Stack

## Frontend
- React.js
- HTML5
- CSS3
- JavaScript

## Backend
- FastAPI
- Uvicorn

## AI Integration
- Google Gemini API

## Database
- SQLite (Chat History Storage)

## Environment Configuration
- .env (Environment Variables Management)

## Version Control
- Git
- GitHub

---

# Environment Variables (.env)

The project uses a .env file to store sensitive information.

## Example:

GEMINI_API_KEY=your_gemini_api_key_here  
DATABASE_URL=sqlite:///labmate.db  
SECRET_KEY=your_secret_key_here  

## Purpose:
- Store API keys securely
- Avoid hardcoding sensitive data
- Manage configuration separately from code

---

# Project Folder Structure

LabMateAI/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── services/
│   │   │   ├── gemini.py
│   │   │   ├── prompt_engine.py
│   │   │   └── chat_service.py
│   │   ├── models/
│   │   ├── database/
│   │   └── main.py
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── App.jsx
│
├── docs/
│   ├── problem.md
│   ├── requirements.md
│   ├── system_architecture.md
│   └── implementation_plan.md
│
├── .env
├── .gitignore
└── README.md

---

# Backend Modules

## Chat Module
- Handles user messages
- Sends requests to Gemini API
- Returns AI-generated responses

---

## Prompt Engine
- Creates structured prompts
- Detects query type (explanation, viva, report, concept)
- Ensures consistent output format

---

## Gemini Service
- Connects to Gemini API
- Generates AI responses
- Handles errors and retries

---

## Chat History Module
- Stores user queries and AI responses
- Saves timestamp of each chat
- Retrieves previous conversations

---

## Database Module
- Manages SQLite database
- Stores chat history
- Handles data persistence

---

## Config Module (.env)
- Loads environment variables
- Provides secure access to API keys
- Keeps configuration separate from code

---

# Frontend Modules

## Chat Interface
- Main chatbot UI
- User input field
- AI response display

---

## History Panel
- Shows previous chats
- Allows users to reopen old conversations

---

## Home Page
- Introduction page
- Basic project overview

---

# REST API Design

## POST /chat
Purpose: Send message and get AI response

Request:
{
  "message": "string",
  "session_id": "string"
}

Response:
{
  "response": "string"
}

---

## GET /history
Purpose: Fetch chat history

Response:
{
  "history": []
}

---

## DELETE /history
Purpose: Clear chat history

Response:
{
  "status": "success"
}

---

# Database Table: ChatHistory

- id (Primary Key)
- session_id
- user_message
- bot_response
- timestamp

---

# Testing Plan

- Test chat API using FastAPI
- Test UI chat flow
- Validate chat history saving
- Check Gemini responses
- Test error handling

---

# Expected Deliverables

- FastAPI backend
- React frontend
- Gemini API integration
- SQLite chat history system
- .env configuration support
- Full AI chatbot system
- Documentation files

---

# Future Enhancements

- User login system
- Multi-user chat history
- Cloud deployment
- Voice interaction
- PDF export of chats
- Mobile app support