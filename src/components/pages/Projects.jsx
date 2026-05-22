import { useState } from "react";
import { THEME } from "../../constants/theme";
import { PROJECTS } from "../../constants/data";
import Page from "../Page";
import SecHeader from "../SecHeader";

function ProjCard({ p }) {
  const T = THEME;
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#fff", borderRadius: 8, overflow: "hidden",
        boxShadow: hov ? "0 8px 32px rgba(0,0,0,0.14)" : "0 2px 12px rgba(0,0,0,0.07)",
        transition: "box-shadow 0.25s, transform 0.2s",
        transform: hov ? "translateY(-4px)" : "none",
        display: "flex", flexDirection: "column"
      }}
    >
      <div style={{ height: 160, overflow: "hidden", position: "relative" }}>
        <img src={p.img} alt={p.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.3s", transform: hov ? "scale(1.05)" : "scale(1)" }}
          onError={e => { e.target.style.display = "none"; e.target.parentElement.style.background = "#e8eef5"; }} />
        <div style={{ position: "absolute", top: 10, right: 10, background: T.accent, color: "#fff", fontSize: "0.65rem", padding: "3px 8px", borderRadius: 50, fontWeight: 600, letterSpacing: 0.5 }}>{p.cat}</div>
      </div>
      <div style={{ padding: "16px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h5 style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 700, color: T.heading, marginBottom: 6, fontSize: "0.92rem" }}>{p.name}</h5>
        <p style={{ color: T.text, fontSize: "0.78rem", lineHeight: 1.7, flex: 1 }}>{p.desc}</p>
        <a href={p.link} target="_blank" rel="noreferrer" style={{
          display: "inline-flex", alignItems: "center", gap: 4,
          marginTop: 12, color: T.accent, fontSize: "0.75rem", fontWeight: 600,
          letterSpacing: 0.5, textTransform: "uppercase"
        }}>
          View Details →
        </a>
      </div>
    </div>
  );
}

export default function PageProjects({ isMobile }) {
  const T = THEME;
  const [filter, setFilter] = useState("All");
  const cats = ["All", "Hardware", "Build", "Web", "Electronics"];
  const visible = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.cat === filter);

  return (
    <Page isMobile={isMobile}>
      <div style={{ padding: isMobile ? "40px 18px 30px" : "60px 48px 40px" }}>
        <SecHeader title="Projects" sub="A selection of hardware, fabrication, and web projects built during my time at MIT and beyond." />

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 36 }}>
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{
              padding: "6px 20px", borderRadius: 50,
              background: filter === c ? T.accent : "transparent",
              border: `2px solid ${filter === c ? T.accent : "#d4dfea"}`,
              color: filter === c ? "#fff" : T.text,
              fontSize: "0.78rem", fontFamily: "'Raleway',sans-serif", fontWeight: 600,
              cursor: "pointer", transition: "all 0.2s", letterSpacing: 0.5
            }}>
              {c}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
          {visible.map(p => <ProjCard key={p.name} p={p} />)}
        </div>
      </div>
    </Page>
  );
}
