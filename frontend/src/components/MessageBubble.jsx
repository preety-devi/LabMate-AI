import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MessageBubble = ({ sender, content, time }) => {
  const formattedTime = time
    ? new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "";

  // Custom pre element renderer for copy code blocks
  const PreComponent = ({ node, children, ...props }) => {
    const [copied, setCopied] = useState(false);
    
    // Extract language and code text from React.Children structure
    const codeElement = React.Children.toArray(children)[0];
    let language = "";
    let codeText = "";

    if (codeElement && codeElement.type === "code") {
      const className = codeElement.props.className || "";
      const match = /language-(\w+)/.exec(className);
      language = match ? match[1] : "";
      codeText = String(codeElement.props.children || "").replace(/\n$/, "");
    }

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(codeText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy code: ", err);
      }
    };

    if (codeElement && codeElement.type === "code") {
      return (
        <div className="code-block-container">
          <div className="code-block-header">
            <span className="code-lang">{language || "code"}</span>
            <button className="code-copy-btn" onClick={handleCopy}>
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          </div>
          <pre {...props}>{children}</pre>
        </div>
      );
    }

    return <pre {...props}>{children}</pre>;
  };

  return (
    <div className={`message-bubble-wrapper ${sender === "user" ? "user" : "assistant"}`}>
      <div className={`message-bubble ${sender === "user" ? "user" : "assistant"}`}>
        <span className="message-meta">
          {sender === "user" ? "Student" : "LabMate AI"} {formattedTime && `• ${formattedTime}`}
        </span>
        <div className="message-content">
          {sender === "user" ? (
            <p style={{ whiteSpace: "pre-wrap" }}>{content}</p>
          ) : (
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                pre: PreComponent
              }}
            >
              {content}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
