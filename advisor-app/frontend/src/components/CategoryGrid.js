import { CATEGORIES } from "../categories";

export default function CategoryGrid({ lang, onSelect }) {
  return (
    <div className="cat-grid">
      {CATEGORIES.map((cat) => (
        <div key={cat.id} className="cat-card" onClick={() => onSelect(cat)}>
          <div className="cat-card-top">
            <div className="cat-icon-wrap" style={{ background: cat.bg }}>
              <span style={{ fontSize: 16 }}>{cat.icon}</span>
            </div>
            <span className="cat-name">{cat[lang].name}</span>
          </div>
          <div className="cat-desc">{cat[lang].desc}</div>
          <div className="cat-chips">
            {cat[lang].chips.map((chip) => (
              <span
                key={chip}
                className="chip"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect({ ...cat, quickAsk: chip });
                }}
              >
                ↗ {chip}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
