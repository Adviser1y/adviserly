import { useState, useEffect } from "react";

function getUsage() {
  try { return JSON.parse(localStorage.getItem("adv_usage") || "{}"); } catch { return {}; }
}
function saveUsage(data) { localStorage.setItem("adv_usage", JSON.stringify(data)); }

export function recordMessage(catId) {
  const u = getUsage();
  u.totalMessages = (u.totalMessages || 0) + 1;
  u.categories = u.categories || {};
  u.categories[catId] = (u.categories[catId] || 0) + 1;
  const today = new Date().toDateString();
  if (u.lastDay !== today) { u.streak = (u.lastDay === new Date(Date.now() - 86400000).toDateString() ? (u.streak || 0) + 1 : 1); u.lastDay = today; u.todayMessages = 0; }
  u.todayMessages = (u.todayMessages || 0) + 1;
  saveUsage(u);
}

export default function UsageTracker({ onClose }) {
  const [usage, setUsage] = useState(getUsage());
  const cats = usage.categories || {};
  const topCats = Object.entries(cats).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const total = usage.totalMessages || 0;
  const streak = usage.streak || 0;
  const today = usage.todayMessages || 0;

  useEffect(() => { setUsage(getUsage()); }, []);

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="usage-modal" onClick={e => e.stopPropagation()}>
        <div className="usage-header">
          <span className="usage-title">📊 Your Usage Stats</span>
          <button className="usage-close" onClick={onClose}>✕</button>
        </div>
        <div className="usage-stats">
          <div className="ustat"><div className="ustat-val">{total}</div><div className="ustat-lbl">Total Messages</div></div>
          <div className="ustat"><div className="ustat-val">{today}</div><div className="ustat-lbl">Today</div></div>
          <div className="ustat"><div className="ustat-val">{streak} 🔥</div><div className="ustat-lbl">Day Streak</div></div>
        </div>
        {topCats.length > 0 && (
          <div className="usage-cats">
            <div className="usage-cats-title">Most used categories</div>
            {topCats.map(([id, count]) => (
              <div key={id} className="usage-cat-row">
                <span className="usage-cat-name">{id.charAt(0).toUpperCase() + id.slice(1)}</span>
                <div className="usage-cat-bar-wrap">
                  <div className="usage-cat-bar" style={{ width: Math.min((count / Math.max(...Object.values(cats))) * 100, 100) + "%" }} />
                </div>
                <span className="usage-cat-count">{count}</span>
              </div>
            ))}
          </div>
        )}
        {total === 0 && <p style={{textAlign:"center",color:"#555",fontSize:13,padding:"16px 0"}}>Start chatting to see your stats!</p>}
        <button className="usage-reset" onClick={() => { localStorage.removeItem("adv_usage"); setUsage({}); }}>Reset stats</button>
      </div>
    </div>
  );
}
