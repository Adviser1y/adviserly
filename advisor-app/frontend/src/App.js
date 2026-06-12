import { useState, useRef, useEffect } from "react";
import HomePage from "./components/HomePage";
import ChatPage from "./components/ChatPage";
import SupportPopup from "./components/SupportPopup";
import "./App.css";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "tl", label: "Tagalog" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "hi", label: "हिन्दी" },
  { code: "ar", label: "العربية" },
  { code: "pt", label: "Português" },
  { code: "id", label: "Bahasa Indonesia" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
  { code: "zh", label: "中文" },
  { code: "de", label: "Deutsch" },
];

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem("adv_lang") || "en");
  const [selectedCat, setSelectedCat] = useState(null);
  const [langOpen, setLangOpen] = useState(false);
  const [totalMessages, setTotalMessages] = useState(0);
  const [showSupport, setShowSupport] = useState(false);
  const langRef = useRef(null);

  useEffect(() => { localStorage.setItem("adv_lang", lang); }, [lang]);

  useEffect(() => {
    const dismissed = localStorage.getItem("adv_support_dismissed");
    if (!dismissed && totalMessages >= 25) setShowSupport(true);
  }, [totalMessages]);

  useEffect(() => {
    function handleClick(e) {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const currentLang = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  return (
    <div className="app">
      <div className="topbar">
        <div className="logo">
          <div className="logo-icon">✦</div>
          Adviserly
        </div>
        <div className="topbar-right">
          <div className="lang-selector" ref={langRef}>
            <button className="lang-btn" onClick={() => setLangOpen(o => !o)}>
              🌐 {currentLang.label} {langOpen ? "▲" : "▼"}
            </button>
            {langOpen && (
              <div className="lang-dropdown">
                {LANGUAGES.map(l => (
                  <button key={l.code} className={`lang-opt${l.code === lang ? " active" : ""}`}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}>
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <a href="https://ko-fi.com/adviserly" target="_blank" rel="noreferrer" className="support-topbtn">☕ Support</a>
        </div>
      </div>

      {selectedCat
        ? <ChatPage lang={lang} initialCat={selectedCat} onHome={() => setSelectedCat(null)} onMessageSent={() => setTotalMessages(n => n + 1)} />
        : <HomePage lang={lang} onSelectCat={setSelectedCat} onMessageSent={() => setTotalMessages(n => n + 1)} />
      }

      {showSupport && <SupportPopup lang={lang} onDismiss={() => { localStorage.setItem("adv_support_dismissed","true"); setShowSupport(false); }} />}

      {/* Floating support button */}
      <a href="https://ko-fi.com/adviserly" target="_blank" rel="noreferrer" className="float-coffee" title="Support this project ☕ (helps cover AI API costs)">
        <span className="float-coffee-full">☕ Support</span>
        <span className="float-coffee-short">☕</span>
      </a>
    </div>
  );
}
