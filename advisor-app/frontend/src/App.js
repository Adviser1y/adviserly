import { useState, useRef, useEffect } from "react";
import HomePage from "./components/HomePage";
import ChatPage from "./components/ChatPage";
import SupportPopup, { SupportDrawer } from "./components/SupportPopup";
import FeatureTour from "./components/FeatureTour";
import TermsPage from "./components/TermsPage";
import UsageTracker from "./components/UsageTracker";
import "./App.css";

const LANGUAGES = [
  { code:"en", label:"English" }, { code:"tl", label:"Tagalog" }, { code:"es", label:"Español" },
  { code:"fr", label:"Français" }, { code:"hi", label:"हिन्दी" }, { code:"ar", label:"العربية" },
  { code:"pt", label:"Português" }, { code:"id", label:"Bahasa Indonesia" },
  { code:"ja", label:"日本語" }, { code:"ko", label:"한국어" }, { code:"zh", label:"中文" }, { code:"de", label:"Deutsch" },
];

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem("adv_lang") || "en");
  const [selectedCat, setSelectedCat] = useState(null);
  const [langOpen, setLangOpen] = useState(false);
  const [totalMessages, setTotalMessages] = useState(0);
  const [showSupport, setShowSupport] = useState(false);
  const [showSupportDrawer, setShowSupportDrawer] = useState(false);
  const [showTour, setShowTour] = useState(() => !localStorage.getItem("adv_tour_done"));
  const [showTerms, setShowTerms] = useState(false);
  const [showUsage, setShowUsage] = useState(false);
  const langRef = useRef(null);

  useEffect(() => { localStorage.setItem("adv_lang", lang); }, [lang]);
  useEffect(() => {
    const dismissed = localStorage.getItem("adv_support_dismissed");
    if (!dismissed && totalMessages >= 25) setShowSupport(true);
  }, [totalMessages]);
  useEffect(() => {
    function handleClick(e) { if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false); }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const currentLang = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  function handleShare() {
    const text = "Check out Adviserly — a free AI advisor for health, money, fitness, coding & more! 🚀";
    const url = "https://adviserly.vercel.app";
    if (navigator.share) navigator.share({ title:"Adviserly", text, url });
    else navigator.clipboard.writeText(`${text}\n${url}`).then(() => alert("Link copied!"));
  }

  if (showTerms) return <TermsPage onBack={() => setShowTerms(false)} />;

  return (
    <div className="app">
      <div className="topbar">
        <div className="logo"><div className="logo-icon">✦</div>Adviserly</div>
        <div className="topbar-right">
          <button className="tb-icon-btn" onClick={() => setShowUsage(true)} title="Usage Stats">📊</button>
          <button className="tb-icon-btn" onClick={handleShare} title="Share">🔗</button>
          <div className="lang-selector" ref={langRef}>
            <button className="lang-btn" onClick={() => setLangOpen(o => !o)}>🌐 {currentLang.label} {langOpen?"▲":"▼"}</button>
            {langOpen && (
              <div className="lang-dropdown">
                {LANGUAGES.map(l => (
                  <button key={l.code} className={`lang-opt${l.code===lang?" active":""}`}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}>{l.label}</button>
                ))}
              </div>
            )}
          </div>
          <button className="support-topbtn" onClick={() => setShowSupportDrawer(true)}>☕ Support</button>
        </div>
      </div>

      {selectedCat
        ? <ChatPage lang={lang} initialCat={selectedCat} onHome={() => setSelectedCat(null)} onMessageSent={() => setTotalMessages(n => n+1)} />
        : <HomePage lang={lang} onSelectCat={setSelectedCat} onMessageSent={() => setTotalMessages(n => n+1)} onShowTerms={() => setShowTerms(true)} onShowTour={() => setShowTour(true)} />
      }

      {showTour && <FeatureTour onDismiss={() => { localStorage.setItem("adv_tour_done","1"); setShowTour(false); }} />}
      {showSupport && <SupportPopup lang={lang} onDismiss={() => { localStorage.setItem("adv_support_dismissed","true"); setShowSupport(false); }} />}
      {showSupportDrawer && <SupportDrawer onClose={() => setShowSupportDrawer(false)} />}
      {showUsage && <UsageTracker onClose={() => setShowUsage(false)} />}

      {/* Floating coffee button — opens drawer */}
      <button className="float-coffee" onClick={() => setShowSupportDrawer(true)} title="Support Adviserly">
        <span className="float-full">☕ Support</span>
        <span className="float-short">☕</span>
      </button>
    </div>
  );
}
