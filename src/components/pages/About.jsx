import { THEME } from "../../constants/theme";
import { SKILL_BARS, SKILLS_DATA } from "../../constants/data";
import Page from "../Page";
import SecHeader from "../SecHeader";
import SkillBar from "../SkillBar";

export default function PageAbout({ isMobile }) {
  const T = THEME;

  return (
    <Page isMobile={isMobile}>
      <div style={{ padding: isMobile ? "40px 18px 30px" : "60px 48px 40px" }}>
        <SecHeader title="About" sub="Learn more about my background, skills, and what drives me as an engineer and researcher." />

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "300px 1fr", gap: isMobile ? 30 : 48, marginBottom: 60 }}>
          <div>
            <img
              src="https://ahmadtak-3212.github.io/assets/img/taka_profile_1.jpg"
              alt="Ahmad Taka"
              style={{ width: "100%", borderRadius: 8, display: "block", boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}
              onError={e => e.target.style.display = "none"}
            />
          </div>
          <div>
            <h3 style={{ fontFamily: "'Raleway',sans-serif", fontSize: "1.4rem", fontWeight: 700, color: T.heading, marginBottom: 4 }}>Engineer &amp; Researcher</h3>
            <p style={{ color: T.accent, fontStyle: "italic", marginBottom: 18, fontSize: "0.88rem" }}>MIT EECS Graduate · Hardware · Fabrication · HCI</p>
            <p style={{ color: T.text, lineHeight: 1.85, marginBottom: 14, fontSize: "0.88rem" }}>
              I am an MIT graduate (EECS with a minor in Physics). I have extensive experience in digital fabrication techniques. I love working on projects and making things. On the hardware side I have robust experience in CAD, EDA, and designing for manufacturing. On the software side, I have experience from FPGAs and Assembly to C and Python.
            </p>
            <p style={{ color: T.text, lineHeight: 1.85, marginBottom: 20, fontSize: "0.88rem" }}>
              Making stuff is my passion and my hobby. I enjoy both the hours of debugging and the painstaking construction. I love every second from conception to delivery. MIT's combined EECS program meant I was exposed to both the principles of software construction and solid-state circuits.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px" }}>
              {[ ["Birthday","July 2000"],["City","Fairfax, VA USA"],["Age","23"],["Degree","Bachelor (MIT)"],["Website","ahmadtak-3212.github.io"],["Email","ahmadtak@mit.edu"] ].map(([l,v]) => (
                <div key={l} style={{ fontSize: "0.82rem", paddingBottom: 6, borderBottom: "1px solid #eef1f5" }}>
                  <strong style={{ color: T.textDark }}>{l}:</strong>{" "}
                  <span style={{ color: T.text }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 20 : "0 48px", marginBottom: 60 }}>
          {SKILL_BARS.map(s => <SkillBar key={s.label} {...s} />)}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)", gap: 24, marginBottom: 48 }}>
          {[ ["10+","Programming\nLanguages"],["20+","Projects\nCompleted"],["3+","Years\nExperience"],["3","Research\nPapers"] ].map(([n, l]) => (
            <div key={l} style={{ background: "#fff", borderRadius: 8, padding: "28px 20px", textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #eef1f5" }}>
              <div style={{ fontFamily: "'Raleway',sans-serif", fontSize: "2.2rem", fontWeight: 700, color: T.accent }}>{n}</div>
              <p style={{ color: T.text, fontSize: "0.78rem", marginTop: 8, lineHeight: 1.5, whiteSpace: "pre-line" }}>{l}</p>
            </div>
          ))}
        </div>

        <h4 style={{ fontFamily: "'Raleway',sans-serif", fontSize: "1.1rem", fontWeight: 700, color: T.heading, marginBottom: 20 }}>Full Skills Breakdown</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {SKILLS_DATA.map(cat => (
            <div key={cat.title} style={{ background: "#fff", border: "1px solid #eef1f5", borderRadius: 8, padding: "14px 18px" }}>
              <div style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: T.accent, fontWeight: 600, marginBottom: 10, fontFamily: "'Raleway',sans-serif" }}>{cat.title}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {cat.tags.map(t => (
                  <span key={t} style={{ background: "#eef6fc", border: `1px solid #cce8f8`, color: "#1a7bb9", padding: "3px 10px", borderRadius: 50, fontSize: "0.73rem" }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}
