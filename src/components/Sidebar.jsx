import { THEME } from "../constants/theme";
import { PAGES } from "../constants/data";

export default function Sidebar({ current, onNav, isMobile, open, onClose }) {
  const T = THEME;

  return (
    <div style={{
      width: 300, minHeight: "100vh", background: T.sidebar,
      display: "flex", flexDirection: "column", flexShrink: 0,
      position: isMobile ? "fixed" : "relative",
      top: 0, left: 0, zIndex: 20,
      transform: isMobile ? `translateX(${open ? 0 : -100}%)` : "none",
      transition: isMobile ? "transform 0.25s ease" : "none",
      borderRight: `1px solid ${T.sidebarBdr}`,
      boxShadow: isMobile ? "0 24px 60px rgba(0,0,0,0.18)" : "none"
    }}>
      {isMobile && (
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "14px 18px" }}>
          <button onClick={onClose} style={{ border: "none", background: "transparent", color: "#fff", fontSize: "1.2rem", cursor: "pointer" }}>✕</button>
        </div>
      )}
      <div style={{ padding: "30px 20px 20px", textAlign: "center", borderBottom: `1px solid ${T.sidebarBdr}` }}>
        <div style={{ width: 120, height: 120, borderRadius: "50%", overflow: "hidden", margin: "0 auto 15px", border: `4px solid rgba(255,255,255,0.1)` }}>
          <img
            src="https://ahmadtak-3212.github.io/assets/img/taka_profile_1.jpg"
            alt="Ahmad Taka"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            onError={e => { e.target.style.display = "none"; e.target.parentElement.style.background = "#173b6c"; }}
          />
        </div>
        <h1
          onClick={() => onNav("Home")}
          style={{ color: "#fff", fontSize: "1.25rem", fontFamily: "'Raleway', sans-serif", fontWeight: 700, cursor: "pointer", letterSpacing: "0.5px" }}
        >
          Ahmad Taka
        </h1>
        <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.78rem", marginTop: 6, fontFamily: "'Open Sans', sans-serif" }}>
          Engineer &amp; Researcher
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 14 }}>
          {[
            ["https://twitter.com/AhmadTakaHCI", "𝕏"],
            ["https://www.linkedin.com/in/ahmad-taka-33920018b/", "in"],
            ["https://github.com/nmondal417", "gh"],
          ].map(([href, label]) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" style={{
              width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "rgba(255,255,255,0.6)", fontSize: "0.7rem", fontFamily: "'Raleway',sans-serif", fontWeight: 700,
              transition: "all 0.2s"
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      <nav style={{ padding: "15px 0", flex: 1 }}>
        {PAGES.map((p) => {
          const active = current === p;
          return (
            <button
              key={p}
              onClick={() => onNav(p)}
              style={{
                width: "100%", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 10,
                padding: "12px 25px",
                color: active ? "#fff" : "rgba(255,255,255,0.65)",
                fontSize: "0.82rem", fontFamily: "'Raleway', sans-serif", fontWeight: active ? 600 : 400,
                letterSpacing: "0.5px", textAlign: "left",
                borderLeft: active ? `3px solid ${T.accent}` : "3px solid transparent",
                background: active ? "rgba(255,255,255,0.04)" : "transparent",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderLeftColor = T.accent; } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.color = "rgba(255,255,255,0.65)"; e.currentTarget.style.borderLeftColor = "transparent"; } }}
            >
              <span style={{ fontSize: "0.95rem", opacity: active ? 1 : 0.6 }}>
                {{"Home":"⌂","About":"◉","Resume":"📄","Projects":"⊞","Research":"📖","Chat":"💬","Contact":"✉"}[p]}
              </span>
              {p}
            </button>
          );
        })}
      </nav>

      <div style={{ padding: "15px 20px", borderTop: `1px solid ${T.sidebarBdr}`, textAlign: "center", fontSize: "0.68rem", color: "rgba(255,255,255,0.25)", fontFamily: "'Open Sans',sans-serif" }}>
        © 2024 Ahmad Taka · MIT EECS
      </div>
    </div>
  );
}
