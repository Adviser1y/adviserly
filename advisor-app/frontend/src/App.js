import { useState } from "react";
import HomePage from "./components/HomePage";
import ChatPage from "./components/ChatPage";
import "./App.css";

export default function App() {
  const [lang, setLang] = useState("en");
  const [selectedCat, setSelectedCat] = useState(null);

  return (
    <div className="app">
      <div className="topbar">
        <div className="logo">
          <div className="logo-icon">✦</div>
          Adviserly
        </div>
        <div className="topbar-right">
          <div className="lang-toggle">
            <button className={`lang-btn${lang === "en" ? " active" : ""}`} onClick={() => setLang("en")}>English</button>
            <button className={`lang-btn${lang === "tl" ? " active" : ""}`} onClick={() => setLang("tl")}>Tagalog</button>
          </div>
          <a href="https://ko-fi.com/adviserly" target="_blank" rel="noreferrer" className="support-btn">☕ Support</a>
        </div>
      </div>

      {selectedCat ? (
        <ChatPage lang={lang} initialCat={selectedCat} onHome={() => setSelectedCat(null)} />
      ) : (
        <HomePage lang={lang} onSelectCat={setSelectedCat} />
      )}
    </div>
  );
}
