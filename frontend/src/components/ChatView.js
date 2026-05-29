import { useState, useEffect, useRef } from "react";
import { UI_TEXT } from "../categories";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

export default function ChatView({ cat, lang, onBack }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chips, setChips] = useState(cat[lang].chips);
  const messagesEndRef = useRef(null);
  const ui = UI_TEXT[lang];

  useEffect(() => {
    setMessages([{ role: "ai", text: ui.greeting(cat[lang].name) }]);
    setChips(cat[lang].chips);
    if (cat.quickAsk) setTimeout(() => sendMessage(cat.quickAsk), 150);
  }, []);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function sendMessage(text) {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput("");
    setChips([]);
    const userMsg = { role: "user", text: msg };
    const updatedMessages = [...messages, userMsg];
    setMessages([...updatedMessages, { role: "thinking", text: ui.thinking }]);
    setLoading(true);
    const apiHistory = updatedMessages
      .filter((m) => m.role === "user" || m.role === "ai")
      .map((m) => ({ role: m.role === "ai" ? "assistant" : "user", content: m.text }));
    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiHistory, systemPrompt: cat.prompt }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev.filter((m) => m.role !== "thinking"), { role: "ai", text: data.reply || "Sorry, something went wrong." }]);
    } catch {
      setMessages((prev) => [...prev.filter((m) => m.role !== "thinking"), { role: "ai", text: "Something went wrong. Please try again." }]);
    }
    setLoading(false);
  }

  return (
    <div className="chat-area">
      <div className="chat-header">
        <div className="ch-icon-wrap" style={{ background: cat.bg }}><span style={{ fontSize: 16 }}>{cat.icon}</span></div>
        <div className="ch-info">
          <div className="ch-title">{cat[lang].name}</div>
          <div className="ch-sub">{cat[lang].desc}</div>
        </div>
        <button className="back-btn" onClick={onBack}>{ui.back}</button>
      </div>
      <div className="messages">
        {messages.map((m, i) => <div key={i} className={`msg ${m.role}`}>{m.text}</div>)}
        <div ref={messagesEndRef} />
      </div>
      {chips.length > 0 && (
        <div className="starter-chips">
          {chips.map((chip) => <span key={chip} className="starter-chip" onClick={() => sendMessage(chip)}>↗ {chip}</span>)}
        </div>
      )}
      <div className="input-row">
        <textarea className="msg-input" value={input} placeholder={ui.placeholder} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }} rows={1} />
        <button className="send-btn" disabled={loading} onClick={() => sendMessage()}>{ui.send}</button>
      </div>
    </div>
  );
}
