import React from "react";

const Header = ({ onToggleSidebar, onGoHome }) => {
  return (
    <header className="chat-header">
      <div className="chat-header-left">
        <button 
          className="sidebar-toggle-btn" 
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          title="Toggle sidebar"
        >
          ☰
        </button>
        <div className="chat-header-info">
          <span className="chat-header-title">LabMate AI</span>
          <span className="chat-header-subtitle">AI Engineering Lab Assistant</span>
        </div>
      </div>
      
      <div className="chat-header-actions">
        <button 
          className="theme-toggle-btn" 
          onClick={onGoHome} 
          title="Exit to Homepage"
          aria-label="Exit to Homepage"
        >
          🚪 Exit
        </button>
      </div>
    </header>
  );
};

export default Header;
