import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ChatWindow from "../components/ChatWindow";
import { fetchSessions, createSession, fetchMessages, sendMessage, deleteSession } from "../services/api";

const Chat = ({ onGoHome }) => {
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState("new");
  const [messagesBySession, setMessagesBySession] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch all chat sessions from the database on mount
  useEffect(() => {
    const loadSessions = async () => {
      try {
        const data = await fetchSessions();
        setSessions(data);
        // Start in the transient "new" session state on load/refresh
        setActiveSessionId("new");
      } catch (error) {
        console.error("Failed to load sessions:", error);
        setActiveSessionId("new");
      } finally {
        setIsInitialLoading(false);
      }
    };
    loadSessions();
  }, []);

  // Fetch messages for the active session when it changes
  useEffect(() => {
    // Exit early if activeSessionId is not set, or is the transient "new" session
    if (!activeSessionId || activeSessionId === "new") return;
    
    // Avoid re-fetching if messages already loaded for this session
    if (messagesBySession[activeSessionId]) return;

    const loadMessages = async () => {
      try {
        const msgs = await fetchMessages(activeSessionId);
        // Format backend message structure to match frontend component expected property (time: created_at)
        const formattedMsgs = msgs.map((m) => ({
          sender: m.sender,
          content: m.content,
          time: m.created_at,
        }));
        setMessagesBySession((prev) => ({
          ...prev,
          [activeSessionId]: formattedMsgs,
        }));
      } catch (error) {
        console.error(`Failed to load messages for session ${activeSessionId}:`, error);
      }
    };
    loadMessages();
  }, [activeSessionId, messagesBySession]);

  const handleSendMessage = async (query) => {
    let currentSessionId = activeSessionId;
    let newSessCreated = null;

    // 1. If it's a transient new session, create it in the database first
    if (currentSessionId === "new") {
      try {
        newSessCreated = await createSession("New Session");
        currentSessionId = newSessCreated.id;
      } catch (error) {
        console.error("Failed to create session on the backend:", error);
        alert("Failed to start a new chat session. Please verify the backend is running.");
        return;
      }
    }

    // 2. Add user message locally
    const userMsg = { sender: "user", content: query, time: new Date() };
    
    // If it was a new session, the base message list starts with the welcome message
    const currentMessages = newSessCreated
      ? [{ sender: "assistant", content: "Hi! How can I help you today?", time: newSessCreated.created_at }]
      : (messagesBySession[currentSessionId] || []);
      
    const updatedMessages = [...currentMessages, userMsg];

    // Optimistically update messages locally
    setMessagesBySession((prev) => ({
      ...prev,
      [currentSessionId]: updatedMessages,
    }));

    if (newSessCreated) {
      // Sync list state and set active session ID
      setSessions((prev) => [newSessCreated, ...prev]);
      setActiveSessionId(currentSessionId);
    }

    setIsLoading(true);

    try {
      // 3. Call API to send the message
      const result = await sendMessage(currentSessionId, query);

      // 4. Add response message locally
      const assistantMsg = { sender: "assistant", content: result.response, time: new Date() };
      setMessagesBySession((prev) => ({
        ...prev,
        [currentSessionId]: [...(prev[currentSessionId] || updatedMessages), assistantMsg],
      }));

      // 5. Sync sessions to get the auto-generated title
      const data = await fetchSessions();
      setSessions(data);
    } catch (error) {
      console.error("API error:", error);
      const errorMsg = {
        sender: "assistant",
        content: "Sorry, I had trouble reaching the AI. Please verify the backend is running and try again.",
        time: new Date(),
      };
      setMessagesBySession((prev) => ({
        ...prev,
        [currentSessionId]: [...(prev[currentSessionId] || []), errorMsg],
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewSession = () => {
    // Switch to transient "new" session state instead of creating a DB record
    setActiveSessionId("new");
  };

  const handleDeleteSession = async (sessionId) => {
    try {
      await deleteSession(sessionId);
      
      const updatedSessions = sessions.filter((s) => s.id !== sessionId);
      setSessions(updatedSessions);

      const updatedMessagesBySession = { ...messagesBySession };
      delete updatedMessagesBySession[sessionId];
      setMessagesBySession(updatedMessagesBySession);

      if (activeSessionId === sessionId) {
        // Go back to the transient new chat session
        setActiveSessionId("new");
      }
    } catch (error) {
      console.error(`Failed to delete session ${sessionId}:`, error);
    }
  };

  // Determine which messages to show. If it's a transient session, show only the welcome greeting
  const activeMessages = activeSessionId === "new"
    ? [{ sender: "assistant", content: "Hi! How can I help you today?", time: new Date() }]
    : (messagesBySession[activeSessionId] || []);

  if (isInitialLoading) {
    return (
      <div className="chat-layout" style={{ justifyContent: "center", alignItems: "center", color: "var(--text-muted)" }}>
        Loading sessions...
      </div>
    );
  }

  return (
    <div className="chat-layout">
      <Sidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={setActiveSessionId}
        onNewSession={handleNewSession}
        onDeleteSession={handleDeleteSession}
        onGoHome={onGoHome}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="chat-main">
        <Header 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
          onGoHome={onGoHome}
        />
        <ChatWindow
          messages={activeMessages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Chat;
