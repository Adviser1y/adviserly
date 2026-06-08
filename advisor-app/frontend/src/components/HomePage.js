import { useState, useRef } from "react";
import { CATEGORIES, SECTIONS, GENERAL_PROMPT } from "../categories";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

export default function HomePage({ lang, onSelectCat }) {
  const [homeMessages, setHomeMessages] = useState([{ role: "ai", text: "Hi! Ask me anything or pick a category above for specialized help." }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [homeHistory, setHomeHistory] = useState([]);
  const msgsRef = useRef(null);

  const ui = {
    en: { title: "What do you need help with?", sub: "Scroll the categories or ask anything below", placeholder: "Ask anything..." },
    tl: { title: "Ano ang kailangan mo?", sub: "Mag-scroll ng kategorya o magtanong sa ibaba", placeholder: "Magtanong ng kahit ano..." },
  };

  async function sendHome() {
    if (loading || !input.trim()) return;
    const text = input.trim();
    setInput("");
    const userMsg = { role: "user", text };
    const newHistory = [...homeHistory, { role: "user", content: text }];
    setHomeMessages(prev => [...prev, userMsg, { role: "thinking", text: lang === "tl" ? "Nag-iisip..." : "Thinking..." }]);
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newHistory, systemPrompt: GENERAL_PROMPT }),
      });
      const data = await res.json();
      const reply = data.reply || "Sorry, something went wrong.";
      setHomeMessages(prev => [...prev.filter(m => m.role !== "thinking"), { role: "ai", text: reply }]);
      setHomeHistory([...newHistory, { role: "assistant", content: reply }]);
    } catch {
      setHomeMessages(prev => [...prev.filter(m => m.role !== "thinking"), { role: "ai", text: "Something went wrong. Please try again." }]);
    }
    setLoading(false);
    setTimeout(() => { if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight; }, 50);
  }

  return (
    <div className="home-view">
      <div className="hero">
        <h1>{ui[lang].title}</h1>
        <p>{ui[lang].sub}</p>
      </div>

      {SECTIONS.map(sec => (
        <div key={sec}>
          <div className="sec-label">{sec}</div>
          <div className="cats-row">
            {CATEGORIES.filter(c => c.section === sec).map(c => (
              <div key={c.id} className="cat-card" onClick={() => onSelectCat(c)}>
                <div className="cat-card-top">
                  <div className="cat-card-icon" style={{ background: c.bg }}>{c.icon}</div>
                  <span className="cat-card-name">{c[lang].name}</span>
                </div>
                <div className="cat-card-label">{c[lang].label}</div>
                <div className="cat-chips">
                  <div className="mini-chip">↗ {c[lang].chips[0]}</div>
                  <div className="mini-chip">↗ {c[lang].chips[1]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="home-chat-wrap">
        <div className="home-chat">
          <div className="home-chat-hdr">
            <div className="home-chat-title">💬 General Questions</div>
            <div className="home-chat-sub">{lang === "en" ? "Ask anything — no category needed" : "Magtanong ng kahit ano"}</div>
          </div>
          <div className="home-msgs" ref={msgsRef}>
            {homeMessages.map((m, i) => (
              <div key={i} className={`hmsg ${m.role}`}>{m.text}</div>
            ))}
          </div>
          <div className="home-input-row">
            <textarea
              className="home-input"
              value={input}
              placeholder={ui[lang].placeholder}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendHome(); } }}
              rows={1}
            />
            <button className="home-send" disabled={loading} onClick={sendHome} aria-label="Send">↑</button>
          </div>
        </div>
      </div>

      <div className="home-footer">
        <span className="footer-txt">🎓 Just graduated & built this!</span>
        <a href="https://ko-fi.com/adviserly" target="_blank" rel="noreferrer" className="coffee-btn">☕ Buy me a coffee</a>
      </div>
    </div>
  );
}
