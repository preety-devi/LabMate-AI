# System Architecture: LabMate AI – AI Engineering Lab Assistant Chatbot

This document describes the architectural design and system components of **LabMate AI**. It defines the layer responsibilities, APIs, data flows, security guidelines, and scalability path for the application.

---

# System Overview

LabMate AI is designed as a single-node web application containing a React.js client and a FastAPI server. The system functions as a conversational assistant and data processor for engineering laboratory courses. It processes student queries using Retrieval-Augmented Generation (RAG) through a local ChromaDB instance, executes calculations on spreadsheet reading logs using Pandas and NumPy, generates circuit and parameter graphs using Matplotlib, and saves session configurations and logs in a local SQLite file database.

---

# High-Level Architecture

The block diagram below shows the flow of requests from the user down through the software components:

```text
User
↓
React Frontend
↓
FastAPI Backend
↓
Gemini API
↓
ChromaDB
↓
Pandas/NumPy
↓
Matplotlib
↓
SQLite
```

---

# Architecture Components

## Frontend Layer
* **Responsibilities:**
  * Displays the interactive user dashboard.
  * Provides a conversational interface (chat bubble elements, markdown parsing, and LaTeX rendering).
  * Handles local file selection and drag-and-drop operations for spreadsheet files.
  * Sends requests to backend endpoints and displays response text, calculation metrics, and generated figures.
* **Technologies:**
  * React.js (built using Vite).
  * CSS variables for responsive styling.
  * Standard Fetch/Axios API client.

## Backend Layer
* **Responsibilities:**
  * Exposes REST API endpoints for user chats, uploads, data analysis, and report generation.
  * Manages SQLite transaction states using SQLAlchemy.
  * Coordinates logic flow between database files, RAG retrieval, calculations modules, and external API requests.
* **FastAPI APIs:**
  * `POST /chat`: Receives student message queries and coordinates the chat state.
  * `POST /upload`: Handles spreadsheet file ingestion and validations.
  * `POST /analyze`: Executes mathematical checks and calculations on parsed values.
  * `POST /report`: Formats experiment summaries and returns markdown documents for export.

## AI Layer
* **Gemini Integration:**
  * Connects to Google's Gemini API utilizing the generative AI client library.
  * Synthesizes conversational responses, translating theoretical lab procedures and calculations into clear student explanations.
  * Contextualizes answers based on system prompts designed for engineering lab education.

## RAG Layer
* **ChromaDB Usage:**
  * Runs as a local vector database instance persistent on the host machine.
  * Stores text chunks embedded from printed syllabus manuals and lab instruction sheets.
  * Performs cosine similarity searches to retrieve the top 3 contextual instruction passages matching active student queries.

## Data Processing Layer
* **Pandas and NumPy:**
  * Clean, validate, and structure student data uploaded via spreadsheets.
  * Perform mathematical analyses such as calculating mean, standard deviation, and curve fitting (e.g., linear regression slope for $V=IR$).

## Visualization Layer
* **Matplotlib:**
  * Configures plots dynamically in memory on the backend.
  * Renders scatter points, trend lines, titles, and labels.
  * Converts figures directly to Base64 encoded strings or temp images for frontend consumption.

## Database Layer
* **SQLite:**
  * Main relational persistent layer configured as a single local database file (`labmate.db`).
  * Stores relational structures for sessions, message records, and mathematical result history.

---

# Data Flow

## 1. Conversational Q&A Flow
* **Step 1 (User asks a question):** The user enters a question in the React input box and hits send.
* **Step 2 (Backend receives request):** The React frontend sends a `POST` request to `/chat` with the session ID and message text.
* **Step 3 (RAG retrieves context):** The FastAPI backend queries the ChromaDB local vector index with the query string and pulls the most relevant lab manual chunks.
* **Step 4 (Gemini generates response):** The backend merges the user query and the retrieved context into a single structured prompt and sends it to the Gemini API.
* **Step 5 (Backend returns answer):** FastAPI receives the text response from the Gemini API, saves the chat history into SQLite, and returns the response JSON to the React client.

## 2. File Upload & Analysis Flow
* **Step 1 (User uploads CSV/Excel):** The user selects their CSV/Excel lab data sheet and drags it into the React upload panel.
* **Step 2 (FastAPI processes file):** The frontend submits the file via a multipart POST request to `/upload`. The backend performs extension and file size checks.
* **Step 3 (Pandas analyzes data):** The spreadsheet is parsed into a Pandas DataFrame. The system cleans null values and executes mathematical checks (e.g., linear regressions for Ohm's Law, diode thresholds).
* **Step 4 (Matplotlib generates graph):** The calculated datasets are passed to Matplotlib, which generates a fitted curve plot and outputs the figure as a Base64 string.
* **Step 5 (Gemini generates observations):** The computed parameters (such as calculated resistance or time constants) are sent to Gemini to generate data-driven observations.
* **Step 6 (Results are displayed):** The backend saves the calculation metrics to SQLite and returns the metrics, Base64 graph, and observations text to React, which updates the interface.

---

# Component Interaction Diagram

```mermaid
sequenceDiagram
    participant Student as Student Browser
    participant React as React Frontend
    participant FastAPI as FastAPI Backend
    participant RAG as ChromaDB Vector DB
    participant Gemini as Gemini API
    participant Analysis as Pandas/Matplotlib
    participant DB as SQLite DB

    %% QA Flow
    Note over Student, RAG: Conversational Q&A Flow
    Student->>React: Type and Send Query
    React->>FastAPI: POST /chat {session_id, message}
    FastAPI->>RAG: Query Similarity Search
    RAG-->>FastAPI: Return Top Context Chunks
    FastAPI->>Gemini: Request Answer Synthesis (Context + Prompt)
    Gemini-->>FastAPI: Return Answer Text
    FastAPI->>DB: Save Chat Record
    FastAPI-->>React: Send Response JSON
    React-->>Student: Display Chat bubble

    %% Data Upload Flow
    Note over Student, DB: File Upload & Data Analysis Flow
    Student->>React: Drop spreadsheet file (CSV/Excel)
    React->>FastAPI: POST /upload {file, session_id}
    FastAPI->>Analysis: Load & parse file data
    Note over Analysis: Pandas cleans dataset & fits curve;<br/>Matplotlib generates PNG graph
    Analysis-->>FastAPI: Return calculated parameters & Base64 graph
    FastAPI->>Gemini: Request data observations (parameter inputs)
    Gemini-->>FastAPI: Return observation text
    FastAPI->>DB: Archive analysis results & file path
    FastAPI-->>React: Return JSON (metrics, graph, observations)
    React-->>Student: Display charts, parameters, and observations
```

---

# API Architecture

The application communicates using REST interfaces:

* **`POST /chat`**
  * **Description:** Handles messaging conversations.
  * **Request payload:** `{ "session_id": "string", "message": "string" }`
  * **Response payload:** `{ "response": "string" }`

* **`POST /upload`**
  * **Description:** Receives user data files, validates file metadata, and saves them locally.
  * **Request payload:** Multipart form-data containing `file` and `experiment_type` parameter string.
  * **Response payload:** `{ "file_id": "string", "file_name": "string", "status": "uploaded" }`

* **`POST /analyze`**
  * **Description:** Runs calculations on uploaded file data and generates the graph + AI observations.
  * **Request payload:** `{ "session_id": "string", "file_id": "string" }`
  * **Response payload:** `{ "metrics": { "R_avg": 0.0, "R2": 0.0 }, "graph_base64": "string", "observations": "string" }`

* **`POST /report`**
  * **Description:** Compiles session history, graphs, and observations.
  * **Request payload:** `{ "session_id": "string" }`
  * **Response payload:** `{ "download_url": "string", "markdown_content": "string" }`

---

# Security Considerations

* **API Key Configuration:** The `GEMINI_API_KEY` is not hardcoded. It is loaded in the FastAPI app at startup using environment variables managed by a local `.env` configuration file.
* **File Validation:** The `/upload` endpoint implements safety checks:
  * Restricts files to `.csv`, `.xls`, and `.xlsx` extension signatures.
  * Rejects payloads exceeding a limit of 5.0 MB.
  * Verifies files are readable spreadsheets before executing Pandas workflows.
* **Input Validation:** Backend endpoints use standard FastAPI typing assertions and Pydantic schemas to validate request payloads, preventing SQL injections or malformed memory execution.

---

# Scalability Considerations

Future scaling options can be implemented without changing the current architecture:

* **Vite Optimization:** In the frontend, implement React code-splitting and component lazy-loading to optimize initial load times as dashboard features grow.
* **Database Swap:** Migrate SQLite to PostgreSQL with minimal backend adjustments. This is accomplished by swapping the SQLAlchemy connection string in config files without altering database schemas.
* **Background Task Worker:** Heavy computations or report compilations can be run as FastAPI background tasks. This keeps HTTP response loops free to process other client requests asynchronously.
* **Client-Side Math Offloading:** For minor statistics operations, calculate parameters in JS on the client browser, reserving backend resources for Gemini API calls and RAG processing.
