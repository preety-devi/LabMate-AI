# Implementation Plan

This document outlines the implementation plan for **LabMate AI – AI Engineering Lab Assistant Chatbot**, a final-year engineering project designed to assist students in laboratory experiments through AI-based chat, data analysis, and visualization.

---

# Project Title

**LabMate AI – AI Engineering Lab Assistant Chatbot**

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

## RAG System
- ChromaDB (Vector Database)

## Database
- SQLite
- SQLModel (ORM)

## Data Processing
- Pandas
- NumPy

## Visualization
- Matplotlib

## Excel Support
- OpenPyXL

## Version Control
- Git
- GitHub

---

# Project Folder Structure

```
LabMateAI/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── services/
│   │   │   ├── gemini.py
│   │   │   ├── rag.py
│   │   │   ├── analyzer.py
│   │   │   └── plotter.py
│   │   ├── models/
│   │   ├── database/
│   │   └── main.py
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── App.jsx
│
├── docs/
│   ├── problem.md
│   ├── requirements.md
│   ├── system_architecture.md
│   └── implementation_plan.md
│
└── README.md

.gitignore
```

---

# Backend Modules

## 1. Chat Module
- Handles user messages
- Maintains session flow
- Routes queries to AI and RAG system

## 2. RAG Engine
- Stores lab manuals in vector form
- Retrieves relevant context from ChromaDB
- Enhances AI responses using domain knowledge

## 3. Gemini Service
- Connects with Gemini API
- Generates responses based on prompts and context
- Handles AI communication errors

## 4. File Upload Module
- Accepts CSV and Excel files
- Validates file type and structure
- Stores file temporarily for processing

## 5. Data Analysis Module
- Processes data using Pandas and NumPy
- Performs Ohm's Law calculations.
- Future versions may support RC and Diode experiments.
- Cleans and validates datasets

## 6. Graph Generator
- Creates scientific graphs using Matplotlib
- Generates plots for experimental data
- Prepares visuals for frontend display

## 7. Report Generator
- Combines analysis results and AI observations
- Generates structured Markdown reports
- Prepares downloadable output

## 8. Database Module
- Manages SQLite database connection
- Stores sessions, messages, and analysis results
- Handles data persistence using SQLModel

---

# Frontend Modules

## 1. Home Page
- Project introduction
- Introduction to the Ohm's Law experiment.

## 2. Chat Interface
- AI chatbot interaction screen
- Displays messages and responses
- Supports Markdown rendering

## 3. File Upload Page
- Upload CSV/Excel files
- Shows upload status

## 4. Analysis Page
- Displays calculated results
- Shows generated graphs

## 5. Report Page
- Displays final experiment report
- Provides download option

---

# REST API Design

## 1. POST /chat
**Purpose:** Handles chatbot conversation

**Request:**
```json
{
  "session_id": "string",
  "message": "string"
}
```

**Response:**
```json
{
  "response": "string"
}
```

---

## 2. POST /upload
**Purpose:** Upload experiment data files

**Request:** Multipart form-data (file)

**Response:**
```json
{
  "file_id": "string",
  "status": "success"
}
```

---

## 3. POST /analyze
**Purpose:** Analyze uploaded experimental data

**Request:**
```json
{
  "session_id": "string",
  "file_id": "string"
}
```

**Response:**
```json
{
  "metrics": {},
  "graph": "string",
  "observations": "string"
}
```

---

## 4. POST /report
**Purpose:** Generate final experiment report

**Request:**
```json
{
  "session_id": "string"
}
```

**Response:**
```json
{
  "report": "string"
}
```

---

# Database Tables

## Session
- session_id (Primary Key)
- experiment_name
- created_at

## Message
- message_id (Primary Key)
- session_id
- sender
- message
- timestamp

## AnalysisResult
- analysis_id (Primary Key)
- session_id
- metrics
- graph_data

## Report
- report_id (Primary Key)
- session_id
- report_content

---

# Testing Plan

- API endpoint testing using FastAPI docs
- Chat response validation
- File upload testing
- Data analysis verification
- Graph generation testing
- AI response evaluation
- Error handling validation
- The MVP testing phase focuses only on the Ohm's Law experiment workflow.

---

# Expected Deliverables

- FastAPI Backend Application
- React Frontend Application
- Gemini AI Integration
- ChromaDB RAG System
- Data Analysis Module
- Graph Generation System
- Complete AI Chatbot System
- Project Documentation (All MD files)
- GitHub Repository

---

# Future Enhancements

Future versions of LabMate AI may include:

- RC Circuit experiment support
- Diode Characteristics experiment support
- Excel file support
- Multiple graph types
- PDF report generation
- User authentication
- Voice interaction
- Cloud deployment
