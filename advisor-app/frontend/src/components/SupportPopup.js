export default function SupportPopup({ lang, onDismiss }) {
  const t = lang === "tl"
    ? { title: "Nag-eenjoy ka sa Adviserly?", body: "Ang app na ito ay libre at gumagamit ng totoong AI. Kung nakatulong ito, kahit isang kape ay malaking bagay.", cta: "☕ Bilhan ng kape", dismiss: "Marahil mamaya" }
    : { title: "Enjoying Adviserly?", body: "This app is 100% free and runs on real AI. If it's been helpful, a coffee keeps it running for everyone.", cta: "☕ Buy me a coffee", dismiss: "Maybe later" };
  return (
    <div className="popup-overlay">
      <div className="support-popup">
        <div className="sp-emoji">☕</div>
        <h2 className="sp-title">{t.title}</h2>
        <p className="sp-body">{t.body}</p>
        <a href="https://ko-fi.com/adviserly" target="_blank" rel="noreferrer" className="sp-cta" onClick={onDismiss}>{t.cta}</a>
        <button className="sp-dismiss" onClick={onDismiss}>{t.dismiss}</button>
      </div>
    </div>
  );
}
