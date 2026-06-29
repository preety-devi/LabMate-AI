# 🤖 LabMate AI – AI Engineering Lab Assistant Chatbot

An AI-powered intelligent laboratory assistant designed for engineering students to simplify experiments through conversational AI, smart explanations, data understanding, and structured academic support.

---

## 📌 Project Overview

LabMate AI is a smart engineering lab assistant that helps students understand and complete laboratory experiments more efficiently.

It provides:
- AI chatbot-based interaction  
- Experiment explanations  
- Viva questions & answers  
- Lab report generation  
- Concept clarification  
- Chat history tracking 

The system reduces dependency on static lab manuals and provides interactive, personalized learning support.

---

## ❗ Problem Statement

Engineering students often face difficulties in:
- Understanding experiment concepts  
- Writing lab reports  
- Preparing viva answers  
- Revising experiments before exams  
- Managing multiple study sources  

Traditional lab manuals are static and cannot provide interactive guidance.

LabMate AI solves this using an AI-powered conversational system.

---

## 🚀 Features

### 💬 AI Chatbot Assistant
- Natural language interaction  
- Instant lab-related answers  
- Structured academic responses  

### 📚 Experiment Support
- Theory explanation  
- Procedure guidance  
- Aim and conclusion generation  
- Concept clarity  

### ❓ Viva Preparation
- Automatically generates viva questions  
- Provides detailed answers  
- Topic-based questioning  

### 🧾 Lab Report Generation
- Theory writing  
- Observations  
- Results and conclusion  
- Precautions  

### 📜 Chat History System (NEW)
- Stores previous queries and responses  
- Allows students to revisit past answers  
- History sidebar for easy navigation  
- Improves personalized learning experience  

### 🧠 AI-Powered Responses
- Gemini API generates all content  
- Structured academic formatting  
- Context-aware answers  

---

## 🛠 Technology Stack

- Frontend: React.js  
- Backend: FastAPI  
- AI Engine: Gemini API  
- Database: SQLite / MongoDB (for history feature)

---

## 🏗 System Architecture

Student → React Frontend → FastAPI Backend → Prompt Processing → Gemini API → Response → History Storage → UI Display

---

## ⚙️ Working Flow

- Student enters any query related to lab/engineering topic  
- Frontend sends request to backend  
- Backend detects request type  
- Prompt is dynamically created  
- Gemini API generates structured response  
- Response is stored in database (history feature)  
- Output is shown in frontend  
- User can access previous chats anytime  

---

## 📂 Project Structure

- frontend/
  - src/
  - components/
  - pages/

- backend/
  - api/
  - services/
  - models/
  - database/
  - main.py

- data/
- requirements.txt
- README.md

---

## 📜 Key Innovation

- AI-based dynamic prompt generation  
- Works for any engineering topic  
- No hardcoded experiments required  
- Chat history system for personalization  
- Scalable for future lab modules  

---

## 🎯 Scope

- Electrical Engineering labs  
- Electronics labs  
- Physics labs  
- General engineering concepts  

---

## 📈 Expected Outcomes

- Faster lab preparation  
- Better viva performance  
- Structured report writing  
- Reduced dependency on notes/manuals  
- Personalized learning via history system  

---

## 🚀 Future Enhancements

- PDF report generation  
- Voice-based interaction  
- Multi-language support  
- Advanced analytics dashboard  
- Mobile application development  
- File upload support for user documents (CSV/PDF in future)
- Graph plotting for data visualization in experiment

---

## ⭐ LabMate AI

"Your Intelligent Engineering Laboratory Assistant." 🚀📚