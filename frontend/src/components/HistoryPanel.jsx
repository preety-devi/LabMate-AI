import React from "react";

const HistoryPanel = ({ sessions, activeSessionId, onSelectSession, onNewSession }) => {
  return (
    <aside className="sidebar">
      <button className="btn btn-primary new-chat-btn" onClick={onNewSession}>
        + New Session
      </button>
      <div className="history-list">
        {sessions.map((session) => (
          <button
            key={session.id}
            className={`history-item ${session.id === activeSessionId ? "active" : ""}`}
            onClick={() => onSelectSession(session.id)}
          >
            {session.title || `Chat Session ${session.id}`}
          </button>
        ))}
        {sessions.length === 0 && (
          <div style={{ padding: "0.5rem", color: "var(--text-muted)", fontSize: "0.85rem", textAlign: "center" }}>
            No recent sessions
          </div>
        )}
      </div>
    </aside>
  );
};

export default HistoryPanel;
