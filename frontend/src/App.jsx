import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Chat from "./pages/Chat";

function App() {
  const [view, setView] = useState("home");

  return (
    <>
      <Navbar onViewChange={setView} currentView={view} />
      {view === "home" ? (
        <Home onStartChat={() => setView("chat")} />
      ) : (
        <Chat />
      )}
    </>
  );
}

export default App;
