import React, { useState, useRef, useEffect } from "react";
import Nav from "../Nav/Nav";
import "./Bot.css";

function Bot() {
  const messagesEndRef = useRef(null);

  // ✅ Use deployed API by default (can fall back to localhost for development)
  const BASE_URL =
    import.meta.env.VITE_API_URL || "https://time-bot-backend-2.onrender.com";

  // Load chat history from localStorage
  const [messages, setMessages] = useState(() => {
    const savedChats = localStorage.getItem("chatHistory");
    return savedChats
      ? JSON.parse(savedChats)
      : [
          {
            sender: "bot",
            text: "Hello 👋! I'm your AI Assistant. I can help you book, cancel, or reschedule appointments, and check VIP availability.",
            timestamp: new Date(),
          },
        ];
  });

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [provider, setProvider] = useState("claude"); // default provider

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  // Save messages in localStorage whenever updated
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  // Send user message
  const sendMessage = async (userMessage) => {
    const clientId = localStorage.getItem("clientId");
    if (!clientId) {
      alert("Client ID not found! Please login again.");
      return;
    }

    const userMsg = { sender: "user", text: userMessage, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const res = await fetch(`${BASE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, clientId, provider }),
      });

      const data = await res.json();
      const botReply = data?.reply || "❌ Sorry, I couldn't understand that.";
      const botMsg = { sender: "bot", text: botReply, timestamp: new Date() };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg = {
        sender: "bot",
        text: `❌ Server error: ${err.message}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
      scrollToBottom();
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput("");
  };

  // Start new chat
  const handleNewChat = () => {
    const defaultMsg = [
      {
        sender: "bot",
        text: "Hello 👋! I'm your AI Assistant. How can I help you today?",
        timestamp: new Date(),
      },
    ];
    setMessages(defaultMsg);
    scrollToBottom();
  };

  return (
    <>
      <Nav />
      <div className="chat-container">
        <div className="chat-header">
          <h3>💬 AI Chat Assistant</h3>
          <div className="chat-header-buttons">
            <button onClick={handleNewChat}>New Chat</button>
          </div>
        </div>

        {/* Chat Box */}
        <div className="chat-box">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`message ${
                msg.sender === "user" ? "user-message" : "bot-message"
              }`}
            >
              <div className="message-content">
                <p>{msg.text}</p>
                <span className="message-time">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="message bot-message">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Box */}
        <div className="input-box">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="send-button"
          >
            Send
          </button>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button onClick={() => sendMessage("I want to book an appointment")}>
            Book Appointment
          </button>
          <button onClick={() => sendMessage("I want to cancel an appointment")}>
            Cancel Appointment
          </button>
          <button
            onClick={() => sendMessage("I want to reschedule an appointment")}
          >
            Reschedule Appointment
          </button>
          <button onClick={() => sendMessage("Check VIP availability")}>
            Check VIP Free Time
          </button>
        </div>

        {/* Provider Switch */}
        <div className="provider-switch">
          <label>
            <input
              type="radio"
              name="provider"
              value="claude"
              checked={provider === "claude"}
              onChange={() => setProvider("claude")}
            />{" "}
            Claude
          </label>
          <label>
            <input
              type="radio"
              name="provider"
              value="openai"
              checked={provider === "openai"}
              onChange={() => setProvider("openai")}
            />{" "}
            OpenAI
          </label>
        </div>
      </div>
    </>
  );
}

export default Bot;
