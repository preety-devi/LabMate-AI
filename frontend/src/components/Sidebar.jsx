import React from "react";

const Sidebar = ({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewSession,
  onDeleteSession,
  onGoHome,
  isOpen,
  onClose
}) => {
  const handleDeleteClick = (e, sessionId) => {
    e.stopPropagation(); // Prevent choosing the session when deleting it
    if (window.confirm("Are you sure you want to delete this chat session?")) {
      onDeleteSession(sessionId);
    }
  };

  return (
    <>
      {/* Semi-transparent backdrop for mobile/tablet when sidebar is open */}
      <div 
        className={`sidebar-backdrop ${isOpen ? "show" : ""}`} 
        onClick={onClose}
      />
      
      <aside className={`chat-sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand" onClick={onGoHome}>
            🤖 LabMate AI
          </div>
          <button className="sidebar-close-btn" onClick={onClose} aria-label="Close sidebar">
            ✕
          </button>
        </div>
        
        <div className="sidebar-content">
          <div className="sidebar-new-btn-container">
            <button className="btn btn-primary" onClick={() => { onNewSession(); onClose(); }}>
              + New Chat
            </button>
          </div>
          
          <div className="history-list">
            <div className="history-title-label">Chat History</div>
            {sessions.map((session) => (
              <div 
                key={session.id} 
                className={`history-item-wrapper ${session.id === activeSessionId ? "active" : ""}`}
              >
                <button
                  className="history-item-btn"
                  onClick={() => {
                    onSelectSession(session.id);
                    onClose(); // Close sidebar on mobile/tablet after selection
                  }}
                  title={session.title || `Chat Session ${session.id}`}
                >
                  {session.title || `Chat Session ${session.id}`}
                </button>
                <button
                  className="delete-session-btn"
                  onClick={(e) => handleDeleteClick(e, session.id)}
                  title="Delete chat"
                  aria-label="Delete chat"
                >
                  🗑️
                </button>
              </div>
            ))}
            {sessions.length === 0 && (
              <div style={{ padding: "0.5rem", color: "var(--text-muted)", fontSize: "0.85rem", textAlign: "center" }}>
                No recent sessions
              </div>
            )}
          </div>
        </div>

        <div className="sidebar-footer">
          <button className="sidebar-footer-btn" onClick={onGoHome}>
            🏠 Back to Home Page
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
