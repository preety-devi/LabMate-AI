import React, { useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

const ChatWindow = ({ messages, onSendMessage, isLoading }) => {
  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom of the conversation when new messages appear or loading starts
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="chat-main">
      <div className="conversation-area">
        <div className="messages-container">
          {messages.map((msg, index) => (
            <MessageBubble 
              key={index} 
              sender={msg.sender} 
              content={msg.content} 
              time={msg.time} 
            />
          ))}
          {isLoading && (
            <MessageBubble 
              sender="assistant" 
              content="Thinking..." 
              time={new Date()}
            />
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <ChatInput 
        onSendMessage={onSendMessage} 
        isLoading={isLoading} 
      />
    </div>
  );
};

export default ChatWindow;
