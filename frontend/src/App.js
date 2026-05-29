import { useState } from "react";
import CategoryGrid from "./components/CategoryGrid";
import ChatView from "./components/ChatView";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
  const [lang, setLang] = useState("en");
  const [selectedCat, setSelectedCat] = useState(null);

  return (
    <div className="app-wrapper">
      <div className="app-container">
        {selectedCat ? (
          <ChatView cat={selectedCat} lang={lang} onBack={() => setSelectedCat(null)} />
        ) : (
          <>
            <div className="header">
              <h1>{lang === "en" ? "What do you need help with?" : "Ano ang kailangan mo?"}</h1>
              <p>{lang === "en" ? "Choose a category, then ask your question" : "Pumili ng kategorya, tapos magtanong"}</p>
            </div>
            <div className="lang-bar">
              <button className={`lang-btn${lang === "en" ? " active" : ""}`} onClick={() => setLang("en")}>English</button>
              <button className={`lang-btn${lang === "tl" ? " active" : ""}`} onClick={() => setLang("tl")}>Tagalog</button>
            </div>
            <CategoryGrid lang={lang} onSelect={setSelectedCat} />
            <Footer />
          </>
        )}
      </div>
    </div>
  );
}
