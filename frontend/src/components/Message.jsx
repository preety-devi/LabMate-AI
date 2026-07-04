import React from "react";

const Message = ({ sender, content, time }) => {
  const formattedTime = time ? new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "";
  
  return (
    <div className={`message-bubble ${sender === "user" ? "user" : "assistant"}`}>
      <span className="message-meta">
        {sender === "user" ? "Student" : "LabMate AI"} {formattedTime && `• ${formattedTime}`}
      </span>
      <div className="message-content">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Message;
