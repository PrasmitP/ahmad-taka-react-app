import { useState } from "react";
import { THEME } from "../../constants/theme";
import { RESEARCH } from "../../constants/data";
import Page from "../Page";
import SecHeader from "../SecHeader";

function ResearchCard({ research }) {
  const T = THEME;
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#fff", border: "1px solid #eef1f5", borderRadius: 8,
        padding: "28px 24px", position: "relative", overflow: "hidden",
        boxShadow: hov ? "0 8px 28px rgba(0,0,0,0.1)" : "0 2px 10px rgba(0,0,0,0.05)",
        transition: "box-shadow 0.25s, transform 0.2s",
        transform: hov ? "translateY(-3px)" : "none"
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: T.accent, opacity: hov ? 1 : 0.5, transition: "opacity 0.2s" }} />
      <div style={{ fontSize: "1.8rem", marginBottom: 14 }}>{research.icon}</div>
      <h5 style={{ fontFamily: "'Raleway',sans-serif", fontSize: "1rem", fontWeight: 700, color: T.heading, marginBottom: 10 }}>{research.title}</h5>
      <p style={{ color: T.text, fontSize: "0.82rem", lineHeight: 1.85 }}>{research.desc}</p>
      <a href={research.link} target="_blank" rel="noreferrer" style={{
        display: "inline-flex", alignItems: "center", marginTop: 16,
        color: T.accent, fontSize: "0.75rem", fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase"
      }}>
        Read Paper →
      </a>
    </div>
  );
}

export default function PageResearch({ isMobile }) {
  const T = THEME;

  return (
    <Page bg={T.altBg} isMobile={isMobile}>
      <div style={{ padding: isMobile ? "40px 18px 30px" : "60px 48px 40px" }}>
        <SecHeader title="Research" sub="My research is centered around digital fabrication and human-computer interaction — interfacing devices together and using maker skills to produce functional, innovative projects." />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
          {RESEARCH.map((r) => <ResearchCard key={r.title} research={r} />)}
        </div>
      </div>
    </Page>
  );
}
