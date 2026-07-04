import React from "react";

const Navbar = ({ onViewChange, currentView }) => {
  return (
    <nav className="navbar">
      <div className="nav-brand" style={{ cursor: "pointer" }} onClick={() => onViewChange("home")}>
        🤖 LabMate AI
      </div>
      <div className="nav-links">
        <button 
          className={`btn ${currentView === "home" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => onViewChange("home")}
        >
          Home
        </button>
        <button 
          className={`btn ${currentView === "chat" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => onViewChange("chat")}
        >
          Assistant Chat
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
