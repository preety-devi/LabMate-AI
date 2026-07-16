import React, { useState, useRef, useEffect } from "react";

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [query, setQuery] = useState("");
  const textareaRef = useRef(null);

  // Auto-resize the textarea height based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to compute correct scrollHeight
    textarea.style.height = "auto";
    // Set height based on scrollHeight, capped at 200px
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
  }, [query]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!query.trim() || isLoading) return;
    
    onSendMessage(query);
    setQuery("");
  };

  const handleKeyDown = (e) => {
    // If Enter key is pressed without Shift, submit the message
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="chat-input-wrapper">
      <form onSubmit={handleSubmit} className="chat-input-container">
        <textarea
          ref={textareaRef}
          className="chat-input-textarea"
          rows={1}
          placeholder="Ask about formulas, procedure, viva questions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="chat-input-send-btn" 
          disabled={isLoading || !query.trim()}
          title="Send message"
          aria-label="Send message"
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
