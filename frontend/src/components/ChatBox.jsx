import React, { useState, useRef, useEffect } from "react";
import Message from "./Message";

const ChatBox = ({ messages, onSendMessage, isLoading }) => {
  const [query, setQuery] = useState("");
  const messagesEndRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;
    onSendMessage(query);
    setQuery("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="chat-workspace">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <Message 
            key={index} 
            sender={msg.sender} 
            content={msg.content} 
            time={msg.time} 
          />
        ))}
        {isLoading && (
          <div className="message-bubble assistant">
            <span className="message-meta">LabMate AI</span>
            <div className="message-content">
              <p>Thinking...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input-container">
        <form onSubmit={handleSubmit} className="chat-input-form">
          <input
            type="text"
            className="chat-input"
            placeholder="Ask about formulas, procedure, viva questions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
          />
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
