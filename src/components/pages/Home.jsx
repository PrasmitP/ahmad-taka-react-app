import { useState, useEffect } from "react";
import { THEME } from "../../constants/theme";
import { TYPED_STRINGS } from "../../constants/data";
import Page from "../Page";

export default function PageHome({ onNav, isMobile }) {
  const T = THEME;
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const target = TYPED_STRINGS[idx];
    if (typing) {
      if (charIdx < target.length) {
        const t = setTimeout(() => { setDisplayed(target.slice(0, charIdx + 1)); setCharIdx(c => c + 1); }, 80);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (charIdx > 0) {
        const t = setTimeout(() => { setDisplayed(target.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }, 40);
        return () => clearTimeout(t);
      } else {
        setIdx(i => (i + 1) % TYPED_STRINGS.length);
        setTyping(true);
      }
    }
  }, [typing, charIdx, idx]);

  return (
    <Page bg={T.sidebar} isMobile={isMobile}>
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: isMobile ? "40px 18px" : "60px 40px",
        background: `linear-gradient(rgba(4,11,20,0.85), rgba(4,11,20,0.85)), url('https://ahmadtak-3212.github.io/assets/img/hero-bg.jpg') center/cover no-repeat`
      }}>
        <div className="fade-in">
          <h1 style={{ fontFamily: "'Raleway', sans-serif", fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 700, color: "#fff", letterSpacing: 2, marginBottom: 20 }}>
            Ahmad Taka
          </h1>
          <p style={{ fontFamily: "'Raleway', sans-serif", color: "rgba(255,255,255,0.75)", fontSize: "1.15rem", marginBottom: 32 }}>
            I'm a{" "}
            <span style={{ color: T.accent, fontWeight: 600 }}>
              {displayed}
              <span style={{ display: "inline-block", width: 2, height: "1em", background: T.accent, verticalAlign: "text-bottom", marginLeft: 2, animation: "dot-pulse 0.9s step-end infinite" }} />
            </span>
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
            <button onClick={() => onNav("Projects")} style={{
              padding: "10px 28px", background: T.accent, border: `2px solid ${T.accent}`,
              color: "#fff", borderRadius: 50, fontFamily: "'Raleway', sans-serif", fontSize: "0.82rem",
              fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "transparent"; }}
            onMouseLeave={e => { e.currentTarget.style.background = T.accent; }}>
              View My Work
            </button>
            <button onClick={() => onNav("Contact")} style={{
              padding: "10px 28px", background: "transparent", border: "2px solid rgba(255,255,255,0.5)",
              color: "#fff", borderRadius: 50, fontFamily: "'Raleway', sans-serif", fontSize: "0.82rem",
              fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; }}>
              Get in Touch
            </button>
          </div>
          <div style={{ display: "flex", gap: 40, justifyContent: "center", flexWrap: "wrap" }}>
            {[ ["3+","Years Experience"],["3","Co-authored Papers"],["$50K+","Funding Raised"],["130+","Customer Interviews"] ].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Raleway',sans-serif", fontSize: "2rem", fontWeight: 700, color: T.accent }}>{n}</div>
                <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.72rem", letterSpacing: 1, textTransform: "uppercase", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
}
