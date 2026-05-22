import { THEME } from "../../constants/theme";
import { EDU, EXP } from "../../constants/data";
import Page from "../Page";
import SecHeader from "../SecHeader";

function TlItem({ item }) {
  const T = THEME;

  return (
    <div style={{ paddingLeft: 24, borderLeft: `2px solid ${T.accent}`, marginBottom: 28, position: "relative" }}>
      <div style={{ position: "absolute", left: -7, top: 4, width: 12, height: 12, borderRadius: "50%", background: T.accent, border: "2px solid #fff", boxShadow: `0 0 0 2px ${T.accent}` }} />
      <span style={{ display: "inline-block", background: "#eef6fc", color: T.accent, fontSize: "0.72rem", padding: "2px 10px", borderRadius: 50, fontWeight: 600, marginBottom: 6 }}>{item.period}</span>
      <h5 style={{ fontFamily: "'Raleway',sans-serif", fontSize: "0.95rem", fontWeight: 700, color: T.heading, marginBottom: 2 }}>{item.title}</h5>
      <p style={{ color: T.accent, fontStyle: "italic", fontSize: "0.8rem", marginBottom: 8 }}>{item.place}</p>
      {item.bullets ? (
        <ul style={{ paddingLeft: 16 }}>
          {item.bullets.map((b, i) => (
            <li key={i} style={{ color: T.text, fontSize: "0.82rem", lineHeight: 1.8, marginBottom: 4, listStyleType: "disc" }}>{b}</li>
          ))}
        </ul>
      ) : (
        <p style={{ color: T.text, fontSize: "0.82rem", lineHeight: 1.8 }}>{item.desc}</p>
      )}
    </div>
  );
}

export default function PageResume({ isMobile }) {
  const T = THEME;

  return (
    <Page isMobile={isMobile}>
      <div style={{ padding: isMobile ? "40px 18px 30px" : "60px 48px 40px" }}>
        <SecHeader title="Resume" sub="Innovative and deadline-driven researcher with 3+ years of experience designing and developing digital systems from initial concept to final polished deliverable." />

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 48 }}>
          <div>
            <h3 style={{ fontFamily: "'Raleway',sans-serif", fontSize: "1.1rem", fontWeight: 700, color: T.heading, marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 28, height: 28, borderRadius: "50%", background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", color: "#fff" }}>🎓</span>
              Education
            </h3>
            {EDU.map((e, i) => <TlItem key={i} item={e} />)}
          </div>
          <div>
            <h3 style={{ fontFamily: "'Raleway',sans-serif", fontSize: "1.1rem", fontWeight: 700, color: T.heading, marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 28, height: 28, borderRadius: "50%", background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", color: "#fff" }}>💼</span>
              Professional Experience
            </h3>
            {EXP.map((e, i) => <TlItem key={i} item={e} />)}
          </div>
        </div>
      </div>
    </Page>
  );
}
