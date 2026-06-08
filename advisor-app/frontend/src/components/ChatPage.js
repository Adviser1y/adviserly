import { useState, useEffect, useRef } from "react";
import { CATEGORIES, SECTIONS } from "../categories";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

export default function ChatPage({ lang, initialCat, onHome }) {
  const [cat, setCat] = useState(initialCat);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [askedFollowUp, setAskedFollowUp] = useState(false);
  const msgsRef = useRef(null);

  useEffect(() => {
    setCat(initialCat);
    setHistory([]);
    setAskedFollowUp(false);
    setMessages([{ role: "ai", text: `Hi! I'm your ${initialCat[lang].name} advisor. Try a suggestion below or ask me anything!` }]);
  }, [initialCat]);

  function switchCat(c) {
    setCat(c);
    setHistory([]);
    setAskedFollowUp(false);
    setMessages([{ role: "ai", text: `Hi! I'm your ${c[lang].name} advisor. What would you like to know?` }]);
  }

  function scrollToBottom() {
    setTimeout(() => { if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight; }, 50);
  }

  async function sendMessage(textOverride) {
    if (loading) return;
    const text = textOverride || input.trim();
    if (!text) return;
    setInput("");

    const newMessages = [...messages, { role: "user", text }];
    const newHistory = [...history, { role: "user", content: text }];
    const userCount = newHistory.filter(m => m.role === "user").length;

    if (!askedFollowUp && userCount === 1) {
      setAskedFollowUp(true);
      setMessages([...newMessages]);
      setHistory(newHistory);
      scrollToBottom();
      await new Promise(r => setTimeout(r, 500));
      const fq = cat.followUp || "Can you tell me a bit more so I can give you the best answer?";
      setMessages(prev => [...prev, { role: "ai", text: fq }]);
      setHistory(prev => [...prev, { role: "assistant", content: fq }]);
      scrollToBottom();
      return;
    }

    setMessages([...newMessages, { role: "thinking", text: lang === "tl" ? "Nag-iisip..." : "Thinking..." }]);
    setHistory(newHistory);
    setLoading(true);
    scrollToBottom();

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newHistory, systemPrompt: cat.prompt }),
      });
      const data = await res.json();
      const reply = data.reply || "Sorry, something went wrong.";
      setMessages(prev => [...prev.filter(m => m.role !== "thinking"), { role: "ai", text: reply }]);
      setHistory(prev => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages(prev => [...prev.filter(m => m.role !== "thinking"), { role: "ai", text: "Something went wrong. Please try again." }]);
    }
    setLoading(false);
    scrollToBottom();
  }

  return (
    <div className="chat-view">
      <div className="sidebar">
        <div className="back-btn" onClick={onHome}>← Home</div>
        {["General", ...SECTIONS].map(sec => (
          <div key={sec}>
            <div className="sb-section">{sec}</div>
            {CATEGORIES.filter(c => c.section === sec).map(c => (
              <div key={c.id} className={`sb-item${c.id === cat.id ? " active" : ""}`} onClick={() => switchCat(c)}>
                <div className="sb-icon" style={{ background: c.bg }}>{c.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="sb-name">{c[lang].name}</div>
                  <div className="sb-lbl">{c[lang].label}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="chat-main">
        <div className="chat-hdr">
          <div className="ch-icon" style={{ background: cat.bg }}>{cat.icon}</div>
          <div>
            <div className="ch-title">{cat[lang].name}</div>
            <div className="ch-sub">{cat[lang].label}</div>
          </div>
        </div>

        <div className="messages" ref={msgsRef}>
          {messages.map((m, i) => (
            <div key={i} className={`msg-row${m.role === "user" ? " user" : ""}`}>
              <div className={`av ${m.role === "user" ? "user-av" : "ai-av"}`}>{m.role === "user" ? "Y" : "A"}</div>
              <div className={`bubble ${m.role === "thinking" ? "thinking" : m.role}`}>{m.text}</div>
            </div>
          ))}
        </div>

        <div className="qchips">
          {cat[lang].chips.map(ch => (
            <span key={ch} className="qchip" onClick={() => sendMessage(ch)}>↗ {ch}</span>
          ))}
        </div>

        <div className="input-area">
          <div className="input-box">
            <textarea
              className="msg-input"
              value={input}
              placeholder={lang === "en" ? "Message Adviserly..." : "Magtanong..."}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              rows={1}
            />
            <button className="send-btn" disabled={loading} onClick={() => sendMessage()} aria-label="Send">↑</button>
          </div>
          <div className="hint">Adviserly can make mistakes. Use it as a guide, not a final answer.</div>
        </div>
      </div>
    </div>
  );
}
