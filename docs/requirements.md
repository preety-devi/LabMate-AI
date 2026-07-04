# Software Requirements Specification (SRS): LabMate AI

This document defines the software requirements for **LabMate AI – AI Engineering Lab Assistant Chatbot**. It describes the functional, non-functional, system, interface, and database requirements of the application.

---

# 1. Introduction

LabMate AI is an AI-powered engineering laboratory assistant designed to help students understand engineering concepts, experiments, and related academic topics through a conversational interface.

The system provides structured responses such as experiment explanations, viva questions, lab report content, and concept clarification using an AI chatbot.

---

# 2. Purpose

The purpose of this specification is to define the requirements of the LabMate AI system. The application aims to simplify learning by providing instant AI-generated academic support for engineering students.

It reduces dependency on multiple study sources and provides a single interactive platform for lab preparation and concept understanding.

---

# 3. Scope

The current system includes:

* AI-powered chatbot for engineering and lab assistance.
* Dynamic question answering for any topic.
* Structured responses for experiments and concepts.
* Viva question generation.
* Lab report assistance (theory, procedure, conclusion, precautions).
* Chat history storage and retrieval.

Supported areas:

* Electrical Engineering concepts
* Electronics Engineering concepts
* Physics-related concepts
* General engineering topics

---

# 4. Functional Requirements

## FR-1: Conversational Chat Interface

* FR-1.1: The system shall allow users to interact through a text-based chat interface.
* FR-1.2: The system shall provide responses to engineering and lab-related queries.
* FR-1.3: The system shall maintain conversation context during an active session.

---

## FR-2: AI Response Generation

* FR-2.1: The system shall use Gemini API to generate responses.
* FR-2.2: The system shall provide structured academic outputs.
* FR-2.3: The system shall support any engineering-related topic dynamically.
* FR-2.4: The system shall generate explanations, viva questions, and lab reports.

---

## FR-3: Chat History Feature

* FR-3.1: The system shall store user queries and AI responses.
* FR-3.2: The system shall display previous chats in a history section.
* FR-3.3: The system shall allow users to revisit past conversations.
* FR-3.4: The system shall maintain session-based or user-based history.

---

## FR-4: Prompt Processing

* FR-4.1: The system shall process user input before sending it to the AI model.
* FR-4.2: The system shall classify user intent (e.g., explanation, viva, report).
* FR-4.3: The system shall generate structured prompts dynamically.

---

# 5. Non-Functional Requirements

## NFR-1: Performance

* The system shall provide responses within acceptable time limits.
* Chat responses should be generated in real-time.

---

## NFR-2: Usability

* The interface shall be simple and user-friendly.
* The chat system shall be easy to navigate.
* History view shall be easily accessible.

---

## NFR-3: Reliability

* The system shall handle invalid or unclear user input gracefully.
* The system shall not crash during API failures.

---

## NFR-4: Maintainability

* The system shall follow modular architecture.
* Frontend and backend shall be independently maintainable.

---

# 6. System Requirements

## Software Requirements

* Python 3.10 or higher
* Node.js 18 or higher
* FastAPI
* React.js

---

## Libraries & Tools

* google-generativeai (Gemini API SDK)
* SQLite / MongoDB (for chat history storage)

---

## Hardware Requirements

* 4 GB RAM minimum
* Dual-core processor or higher
* Stable internet connection
* Minimum 1 GB storage

---

# 7. API Requirements

The system shall provide REST APIs including:

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /chat | Send user message and get AI response |
| GET | /history | Fetch chat history |
| POST | /history/save | Save chat messages |
| DELETE | /history | Clear chat history |

---

# 8. Database Requirements

## Chat History Storage

The database shall store:

* User queries
* AI-generated responses
* Timestamp of conversation
* Session or user ID (optional)

---

# 9. User Requirements

* Users shall access the system via a web browser.
* Users shall input text queries related to engineering topics.
* Users shall be able to view previous chat history.

---

# 10. Constraints

* Internet connection is required for AI responses.
* Gemini API key is required for system functionality.
* System depends on external AI service availability.

---

# 11. Assumptions

* Users have basic understanding of engineering concepts.
* Users will input meaningful academic queries.
* AI-generated responses are used for educational purposes.

---

# 12. Future Enhancements

* Voice-based chatbot interaction.
* PDF export of chat responses.
* Multi-language support.
* Improved personalization of chat history.