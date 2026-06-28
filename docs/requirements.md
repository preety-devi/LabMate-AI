# Software Requirements Specification (SRS): LabMate AI

This document defines the software requirements for **LabMate AI – AI Engineering Lab Assistant Chatbot**. It describes the functional, non-functional, system, interface, and database requirements of the application.

---

# 1. Introduction

LabMate AI is an AI-powered engineering laboratory assistant designed to help students during laboratory experiments. The system provides a conversational interface for answering experiment-related questions, analyzing experimental data, generating graphs, and assisting students in writing observations and conclusions.

---

# 2. Purpose

The purpose of this specification is to define the requirements of the LabMate AI system. The application aims to simplify laboratory work by reducing manual calculations, automating data analysis, and improving student understanding of engineering concepts.

---

# 3. Scope

The current MVP includes:

* AI-powered chatbot for laboratory assistance.
* Context-aware question answering using RAG.
* Support for selected engineering experiments.
* CSV and Excel file upload.
* Experimental data analysis.
* Graph generation and visualization.
* Observation and conclusion generation.
* Session and report storage.

Supported experiments:

Current MVP:

• Ohm's Law Experiment

Future Enhancements:

• RC Circuit
• Diode Characteristics
• Additional laboratory experiments
• PDF reports
• Voice interaction


---

# 4. Functional Requirements

## FR-1: Conversational Chat Interface

* FR-1.1: The system shall allow users to interact through a text-based chat interface.
* FR-1.2: The system shall provide responses to experiment-related questions.
* FR-1.3: The system shall maintain conversation context during an active session.

---

## FR-2: Knowledge Retrieval

* FR-2.1: The system shall store laboratory reference materials.
* FR-2.2: The system shall retrieve relevant information based on user queries.
* FR-2.3: The system shall provide contextual responses using retrieved knowledge.

---

## FR-3: File Upload

* FR-3.1: The system shall support CSV file uploads.
* FR-3.2: The system shall support Excel file uploads.
* FR-3.3: The system shall validate uploaded files.
* FR-3.4: The system shall display appropriate error messages for invalid files.

---

## FR-4: Data Analysis

* FR-4.1 The system shall perform Ohm's Law calculations.
* FR-4.2: The system shall analyze uploaded numerical data.
* FR-4.3: The system shall generate calculated results.

---

## FR-5: Graph Generation

* FR-5.1 The system shall generate Voltage versus Current graphs.
* FR-5.2: The system shall display graphs to the user.
* FR-5.3: The generated graphs shall include proper labels and titles.

---

## FR-6: Observation and Conclusion Generation

* FR-6.1: The system shall generate observations from experimental data.
* FR-6.2: The system shall generate conclusions based on calculated results.
* FR-6.3: The AI model shall assist in producing meaningful experiment summaries.

---

## FR-7: Report Generation

* FR-7.1: The system shall compile experiment results.
* FR-7.2: The system shall allow users to export reports.
* FR-7.3: The report shall include calculations, graphs, observations, and conclusions.

---

# 5. Non-Functional Requirements

## NFR-1: Performance

* The system should provide responses within acceptable response times.
* File analysis and graph generation should complete efficiently.

## NFR-2: Usability

* The interface shall be simple and easy to use.
* Error messages shall be understandable.
* The system shall support modern web browsers.

## NFR-3: Reliability

* The system shall handle invalid input gracefully.
* The system shall prevent application crashes during errors.

## NFR-4: Maintainability

* The application shall follow modular design principles.
* Components shall be easy to update and extend.

---

# 6. System Requirements

## Software Requirements

* Python 3.10 or higher
* Node.js 18 or higher
* FastAPI
* React.js
* SQLite

### Python Libraries

* pandas
* numpy
* matplotlib
* openpyxl
* chromadb
* google-generativeai
* sqlalchemy

---

## Hardware Requirements

* 4 GB RAM minimum
* Dual-core processor or higher
* Internet connection for Gemini API access
* Minimum 1 GB free storage

---

# 7. API Requirements

The system shall provide REST APIs including:

| Method | Endpoint | Purpose |
|--------|-----------|---------|
| POST | /chat | Send user messages |
| POST | /upload | Upload CSV or Excel files |
| POST | /analyze | Analyze uploaded data |
| GET | /report | Retrieve generated reports |

---

# 8. Database Requirements

## SQLite Database

The database shall store:

* Chat history
* Session information
* Experiment information
* Generated reports

## ChromaDB

The vector database shall store:

* Laboratory manuals
* Experiment information
* Reference materials

---

# 9. User Requirements

* Users shall access the application through a web browser.
* Users shall upload properly formatted experimental data files.
* Users shall provide experiment-related input.

---

# 10. Constraints

* The system requires an active Gemini API key.
* Internet access is required for AI responses.
* File uploads are limited to supported formats.

---

# 11. Assumptions

* Users possess basic knowledge of laboratory experiments.
* Internet connectivity is available.
* Laboratory datasets contain valid numerical values.
* External AI services are operational.