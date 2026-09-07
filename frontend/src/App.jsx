import React, { useState } from "react";
import Home from "./pages/Home";
import Chat from "./pages/Chat";

function App() {
  const [view, setView] = useState("home");

  return (
    <div className="app-root">
      {view === "home" ? (
        <>
          <nav className="navbar">
            <div className="nav-brand" style={{ cursor: "pointer" }} onClick={() => setView("home")}>
              🤖 LabMate AI
            </div>
            <div className="nav-links">
              <button 
                className={`btn ${view === "home" ? "btn-primary" : "btn-secondary"}`}
                onClick={() => setView("home")}
              >
                Home
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => setView("chat")}
              >
                Assistant Chat
              </button>
            </div>
          </nav>
          <Home onStartChat={() => setView("chat")} />
        </>
      ) : (
        <Chat onGoHome={() => setView("home")} />
      )}
    </div>
  );
}

export default App;
