import { useState, useEffect, useRef } from "react";
import { THEME } from "../constants/theme";

export default function SkillBar({ label, pct }) {
  const T = THEME;
  const [width, setWidth] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTimeout(() => setWidth(pct), 100); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct]);

  return (
    <div ref={ref} style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 600, color: T.textDark, fontSize: "0.82rem" }}>{label}</span>
        <span style={{ color: T.accent, fontSize: "0.78rem", fontWeight: 600 }}>{pct}%</span>
      </div>
      <div style={{ height: 10, background: "#e8ecf1", borderRadius: 5, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${width}%`, background: `linear-gradient(90deg, ${T.accent}, #37b3ed)`, borderRadius: 5, transition: "width 1.2s ease" }} />
      </div>
    </div>
  );
}
