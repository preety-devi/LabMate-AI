# Software Requirements Specification (SRS): LabMate AI

This document defines the software requirements for **LabMate AI - AI Engineering Lab Assistant Chatbot**. It serves as the primary technical specification for the project, detailing functional, non-functional, system, interface, and database requirements.

---

## 1. Introduction
The **LabMate AI** application is an engineering laboratory assistant designed to support undergraduate students during laboratory experiments. It provides a conversational interface to answer experiment-related questions, ingests CSV/Excel files containing lab readings, performs numerical calculations, generates characteristic graphs, and drafts structured lab observations and conclusions.

---

## 2. Purpose
The purpose of this specification is to establish a clear, measurable, and implementable set of requirements for the LabMate AI system. The application aims to automate laboratory data analysis and simplify report preparation, allowing students to focus on understanding engineering concepts rather than repetitive mathematical and plotting procedures.

---

## 3. Scope
The scope of the current MVP includes:
- **Core Platform:** FastAPI backend, React.js frontend, and a local SQLite database for session storage.
- **RAG & Chat Engine:** Contextual query routing using a local ChromaDB instance containing embedded laboratory manuals, integrated with the Google Gemini API for answer synthesis.
- **Supported Experiments:** Ohm's Law, RC Transient Response, and Diode Characteristics.
- **Data Analytics:** Clean, parse, and process uploaded `.csv` and `.xlsx` files using Pandas and NumPy.
- **Graph Plotting:** Dynamic generation of curves using Matplotlib, returning images directly to the frontend.
- **Report compilation:** Exporting experimental results, figures, and AI observations in Markdown format.

*Out-of-Scope (Future Enhancements):* User authorization (multi-user accounts), audio-to-text input, hardware simulation engines (SPICE integration), and multi-student collaborative editing rooms.

---

## 4. Functional Requirements

### FR-1: Conversational Chat Interface
- **FR-1.1:** The system shall accept text-based user queries through a chat input field.
- **FR-1.2:** The system shall display responses containing formatted Markdown text, code blocks, and LaTeX mathematical equations (e.g., $V = I \times R$).
- **FR-1.3:** The system shall maintain conversation context within a single session, allowing follow-up questions.

### FR-2: Retrieval-Augmented Generation (RAG)
- **FR-2.1:** The backend shall extract, chunk, and embed reference lab manuals. Documents must be chunked into maximum 500-character segments with a 50-character overlap.
- **FR-2.2:** When a query is flagged as concept-related, the system shall fetch the top 3 most similar document chunks from ChromaDB.
- **FR-2.3:** The system shall augment the Gemini API prompt with the retrieved chunks to generate context-specific, syllabus-aligned responses.

### FR-3: Spreadsheet File Ingestion
- **FR-3.1:** The frontend shall allow users to upload file payloads in `.csv` and `.xlsx` formats.
- **FR-3.2:** The backend shall restrict accepted file sizes to a maximum of 5.0 MB.
- **FR-3.3:** The backend shall reject files that do not contain valid tabular numerical data and return a clear user-facing error message.

### FR-4: Analytical Calculations
- **FR-4.1 (Ohm's Law):** The system shall compute resistance $R_i = V_i / I_i$ for each data point, calculate the average resistance ($R_{avg}$), fit a linear regression line $V = I \cdot R + C$, and compute the coefficient of determination ($R^2$).
- **FR-4.2 (RC Transient):** The system shall locate the maximum charging voltage ($V_{max}$), identify the time constant point ($0.632 \times V_{max}$), and calculate the experimental time constant ($\tau = R \cdot C$) from the charging data trajectory.
- **FR-4.3 (Diode Characteristics):** The system shall identify the diode knee voltage (threshold voltage where current increases linearly) and calculate the dynamic resistance ($r_d = \Delta V_d / \Delta I_d$) within the conduction region.

### FR-5: Automated Plotting
- **FR-5.1:** The system shall generate a corresponding chart for the selected experiment using Matplotlib:
  - Ohm's Law: $I$-$V$ scatter plot with regression line fit.
  - RC transient: $V_c$ vs. Time curve.
  - Diode: $I_d$ vs. $V_d$ characteristic curve.
- **FR-5.2:** The backend shall render the plots as PNG images and transfer them to the client interface using Base64 encoding.

### FR-6: Observation and Conclusion Synthesis
- **FR-6.1:** The system shall construct a structural metadata prompt containing the computed mathematical parameters (e.g., calculated $R$, $R^2$, or $\tau$) and pass it to the Gemini model.
- **FR-6.2:** The model shall output structured engineering observations and conclusions comparing the empirical readings to theoretical expectations.

### FR-7: Lab Report Export
- **FR-7.1:** The system shall allow users to download a compiled summary of the current session.
- **FR-7.2:** The exported file shall be in Markdown format (`.md`), containing the experimental parameters, generated graphs, calculations, and the AI-generated observations.

---

## 5. Non-Functional Requirements

### NFR-1: Performance (Latency)
- **NFR-1.1:** The system shall return standard chat query responses in less than 3.0 seconds under normal internet operating conditions.
- **NFR-1.2:** The file parsing, calculations, and graph generation workflow shall complete in less than 2.0 seconds after receiving a valid file upload.

### NFR-2: Usability
- **NFR-2.1:** The user interface shall be fully functional and readable on displays with a horizontal resolution of 1024px or higher.
- **NFR-2.2:** The user interface shall present clear error indicators if file formatting or calculation exceptions occur.

### NFR-3: Reliability
- **NFR-3.1:** If the Gemini API is unreachable, the backend shall fall back to presenting raw Python calculations and static graphs, disabling chat components while maintaining file-analysis functionality.

---

## 6. System Requirements

### 6.1 Software Requirements
- **Operating System:** Windows 10/11 or Ubuntu Linux 20.04+.
- **Language Runtimes:** Node.js v18.x or higher, Python v3.10 or higher.
- **Backend Framework:** FastAPI 0.100.0+.
- **Frontend Framework:** React.js 18.x+ (bootstrapped with Vite).
- **Libraries:**
  - Python: `pandas` (>=2.0), `numpy` (>=1.22), `matplotlib` (>=3.5), `openpyxl` (>=3.0), `chromadb` (>=0.4), `google-generativeai` (>=0.3), `sqlalchemy` (>=2.0).

### 6.2 Hardware Requirements
- **Processor:** Dual-core Intel Core i5 (8th Gen or equivalent) / AMD Ryzen 5 or higher.
- **System Memory:** Minimum 8.0 GB RAM.
- **Available Storage:** 2.0 GB of free hard disk space for repository installation and local database instances.
- **Connectivity:** Active internet connection (broadband) is required to call external Google Gemini API endpoints.

---

## 7. API Requirements
The backend must expose the following REST interface contract structure:

| Method | Endpoint | Request Body | Response Body |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/sessions` | None | `{ "session_id": "uuid-string" }` |
| **POST** | `/api/chat` | `{ "session_id": "string", "message": "string" }` | `{ "response": "string" }` |
| **POST** | `/api/upload` | Multipart form: `file` (CSV/Excel), `experiment` (string) | `{ "metrics": {}, "graph_base64": "string", "observations": "string" }` |
| **GET** | `/api/sessions/{session_id}` | None | `{ "session_id": "string", "messages": [...] }` |

---

## 8. Database Requirements
- **SQLite Database:** A single-file local database (`labmate.db`) containing persistent schemas for chat records, session logs, and file path pointers.
- **ChromaDB Vector Store:** A local directory persistence structure housing the embedded manuals, chunk vectors, and text lookups.

---

## 9. User Requirements
- Users must access the application using standard modern web browsers (Chrome, Edge, Firefox, or Safari).
- Users uploading CSV/Excel sheets must format their tables containing at least two coordinate columns with appropriate numeric values matching the selected experiment (e.g., Voltage and Current columns).

---

## 10. Constraints
- **Gemini API Key:** An active Gemini API key must be supplied as a environment variable in the host system (`GEMINI_API_KEY`).
- **Context Limit:** Retrieval inputs are bounded by the Gemini model's context window constraints, limiting document injection sizes.

---

## 11. Assumptions
- The Google Gemini API server is operational and responsive.
- The host system has appropriate write/read permission constraints to update the local SQLite database and file directories.
