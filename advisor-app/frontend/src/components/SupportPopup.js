const GCASH_QR = "/gcash-qr.png";
export function SupportDrawer({ onClose }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="support-drawer" onClick={e => e.stopPropagation()}>
        <button className="sd-close" onClick={onClose}>✕</button>
        <div className="sd-top">
          <div className="sd-emoji">💙</div>
          <h2 className="sd-title">You're using real AI — for free.</h2>
          <p className="sd-body">Adviserly runs on actual AI with real costs. No ads, no paywalls, no sign-up. If this helped you even once, a small tip means a lot and keeps it free for everyone.</p>
        </div>
        <div className="sd-methods">
          <div className="sd-gcash">
            <div className="sd-gcash-title">💚 GCash <span className="sd-tag">Philippines</span></div>
            <img src={GCASH_QR} alt="GCash QR Code" className="sd-qr" />
            <div className="sd-gcash-hint">Open GCash → Scan QR → Any amount 🙏</div>
          </div>
          <div className="sd-divider">or</div>
          <a href="https://ko-fi.com/adviserly" target="_blank" rel="noreferrer" className="sd-kofi">☕ Ko-fi — International</a>
        </div>
        <p className="sd-footer">No pressure at all. Just knowing you use it is enough. 😊</p>
      </div>
    </div>
  );
}

export default function SupportPopup({ lang, onDismiss }) {
  return <SupportDrawer onClose={onDismiss} />;
}
