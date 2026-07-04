import React, { useState } from "react";
import HistoryPanel from "../components/HistoryPanel";
import ChatBox from "../components/ChatBox";
import { sendMessage } from "../services/api";

const Chat = () => {
  const [sessions, setSessions] = useState([
    { id: 1, title: "Ohms Law Experiment" },
    { id: 2, title: "Logic Gates Verification" },
  ]);
  const [activeSessionId, setActiveSessionId] = useState(1);
  const [messagesBySession, setMessagesBySession] = useState({
    1: [
      { sender: "assistant", content: "Hi! How can I help you today?", time: new Date() },
    ],

  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (query) => {
    // 1. Add user message locally
    const userMsg = { sender: "user", content: query, time: new Date() };
    const currentMessages = messagesBySession[activeSessionId] || [];
    const updatedMessages = [...currentMessages, userMsg];

    setMessagesBySession({
      ...messagesBySession,
      [activeSessionId]: updatedMessages,
    });

    setIsLoading(true);

    try {
      // Build context string from the last few messages
      const context = currentMessages
        .slice(-5)
        .map((m) => `${m.sender === "user" ? "Student" : "Assistant"}: ${m.content}`)
        .join("\n");

      // 2. Call API
      const result = await sendMessage(query, context);

      // 3. Add response message locally
      const assistantMsg = { sender: "assistant", content: result.response, time: new Date() };
      setMessagesBySession((prev) => ({
        ...prev,
        [activeSessionId]: [...(prev[activeSessionId] || []), assistantMsg],
      }));
    } catch (error) {
      console.error("API error:", error);
      const errorMsg = { sender: "assistant", content: "Sorry, I had trouble reaching the AI. Please verify the backend is running and try again.", time: new Date() };
      setMessagesBySession((prev) => ({
        ...prev,
        [activeSessionId]: [...(prev[activeSessionId] || []), errorMsg],
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewSession = () => {
    const nextId = sessions.length > 0 ? Math.max(...sessions.map(s => s.id)) + 1 : 1;
    const newSession = { id: nextId, title: `Chat Session ${nextId}` };
    setSessions([newSession, ...sessions]);
    setActiveSessionId(nextId);
    setMessagesBySession({
      ...messagesBySession,
      [nextId]: [
        { sender: "assistant", content: "Hello! How can I assist you in your lab work today?", time: new Date() },
      ],
    });
  };

  const activeMessages = messagesBySession[activeSessionId] || [];

  return (
    <div className="app-container">
      <HistoryPanel
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={setActiveSessionId}
        onNewSession={handleNewSession}
      />
      <ChatBox
        messages={activeMessages}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Chat;
