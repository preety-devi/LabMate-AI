# Problem Definition: AI Engineering Lab Assistant Chatbot (LabMate AI)

This document describes the problem faced by engineering students during laboratory sessions, the limitations of traditional lab workflows, and the proposed AI-based solution.

---

# 1. Problem Statement

Engineering laboratory courses are important for understanding theoretical concepts through practical experiments. However, students often face difficulties during lab sessions due to limited guidance, manual calculations, graph plotting, and report preparation.

Because of high student-to-instructor ratios, students may not receive immediate help when they encounter doubts related to formulas, calculations, circuit behavior, or observations. As a result, a significant amount of laboratory time is spent on repetitive tasks instead of understanding the experiment.

---

# 2. Existing Problems in Engineering Laboratories

Traditional laboratory sessions face several challenges:

* Limited Instructor Availability: One instructor often manages many students simultaneously, making individual guidance difficult.

* Theory-Practical Gap: Students struggle to connect theoretical concepts with practical experiments.

* Manual Calculations: Experiment calculations are often performed manually, increasing the possibility of errors.

* Graph Plotting Difficulties: Students spend considerable time creating graphs and analyzing results.

* Report Writing Issues: Many students face difficulties in writing observations, conclusions, and experiment reports.

---

# 3. Limitations of Traditional Lab Work

Traditional laboratory methods have several limitations:

1. Laboratory manuals provide fixed instructions and cannot answer student questions dynamically.

2. Manual calculations can lead to mistakes in formulas and unit conversions.

3. Graph plotting using spreadsheets or manual methods is time-consuming.

4. Students often copy observations and conclusions instead of understanding their experimental results.

5. Instructors may not always be available to resolve every doubt during the lab session.

---

# 4. Need for an AI Laboratory Assistant

Modern engineering laboratories require an intelligent assistant capable of:

* Answering experiment-related questions.

* Explaining formulas and concepts.

* Analyzing experimental data.

* Generating graphs automatically.

* Providing observations and conclusions.

* Assisting students throughout the experiment process.

Such a system can reduce repetitive work and allow students to focus more on understanding concepts and performing experiments.

---

# 5. Proposed Solution

**LabMate AI** is an AI-powered engineering laboratory assistant chatbot designed specifically for engineering students.

The system integrates:

* FastAPI: Backend API development.

* React.js: Interactive user interface.

* Gemini API: Conversational AI capabilities.

* ChromaDB (RAG): Retrieval of experiment knowledge and contextual information.

* Pandas and NumPy: Data analysis and calculations.

* Matplotlib: Graph generation and visualization.

* SQLite: Storage of experiment sessions and reports.

The current MVP focuses on the Ohm's Law experiment. Students can ask experiment-related questions, upload CSV data, generate a Voltage-Current graph, and receive AI-generated observations and conclusions.

Additional experiments and features will be added in future versions.

---

# 6. Project Objectives

The major objectives of LabMate AI are:

1. Provide experiment-related question answering.
2. Analyze Ohm's Law experiment data.
3. Generate Voltage-Current graphs.
4. Produce observations and conclusions.
5. Assist students during laboratory experiments.
---

# 7. Expected Benefits

## For Students

* Reduces manual calculations.

* Saves time during laboratory sessions.

* Improves understanding of experiments.

* Helps generate accurate reports.

* Provides instant assistance.

## For Instructors

* Reduces repetitive questions.

* Supports students during experiments.

* Improves laboratory efficiency.

## For Institutions

* Enhances the laboratory learning experience.

* Encourages the use of AI in education.

* Improves student engagement.

---

# 8. Target Users

## Primary Users

* Engineering students.

* Electronics and electrical laboratory students.

* Physics laboratory students.

## Secondary Users

* Laboratory instructors.

* Teaching assistants.

* Academic institutions.