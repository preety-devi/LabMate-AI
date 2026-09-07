import React from "react";

const Home = ({ onStartChat }) => {
  return (
    <div className="hero-container fade-in">
      <div className="hero-logo">🤖</div>
      <h1 className="hero-title">LabMate AI</h1>
      <p className="hero-subtitle">
        Your intelligent AI engineering laboratory assistant. Get support for theories, lab procedures, 
        viva preparation, and report generation in real time.
      </p>
      
      <button className="btn btn-primary" onClick={onStartChat} style={{ fontSize: "1.1rem", padding: "1rem 2.5rem" }}>
        Launch Chatbot
      </button>

      <div className="feature-cards">
        <div className="feature-card glass">
          <div className="feature-icon">📚</div>
          <h3>Experiment Support</h3>
          <p>Retrieve procedural guides, aim verification, theories, and calculations.</p>
        </div>
        <div className="feature-card glass">
          <div className="feature-icon">❓</div>
          <h3>Viva Q&A Prep</h3>
          <p>Get topic-wise questions and conceptual explanations to prepare for viva-voce.</p>
        </div>
        <div className="feature-card glass">
          <div className="feature-icon">📜</div>
          <h3>Chat History</h3>
          <p>Track your previous conceptual questions and access past sessions anytime.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
