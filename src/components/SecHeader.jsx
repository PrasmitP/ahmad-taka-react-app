import { THEME } from "../constants/theme";

export default function SecHeader({ title, sub, center = true }) {
  const T = THEME;

  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: 48 }}>
      <h2 style={{
        fontFamily: "'Raleway', sans-serif", fontSize: "2rem", fontWeight: 700,
        color: T.heading, letterSpacing: "1px", position: "relative",
        display: "inline-block", paddingBottom: 14
      }}>
        {title}
        <span style={{
          position: "absolute", bottom: 0, left: center ? "50%" : 0,
          transform: center ? "translateX(-50%)" : "none",
          width: 50, height: 3, background: T.accent, borderRadius: 2
        }} />
        <span style={{
          position: "absolute", bottom: 0, left: center ? "calc(50% + 58px)" : 58,
          transform: center ? "translateX(-50%)" : "none",
          width: 10, height: 3, background: T.accent, borderRadius: 2
        }} />
      </h2>
      {sub && <p style={{ color: T.text, marginTop: 16, maxWidth: 600, margin: "16px auto 0", fontSize: "0.88rem", lineHeight: 1.8 }}>{sub}</p>}
    </div>
  );
}
