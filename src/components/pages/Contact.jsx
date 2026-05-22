import { THEME } from "../../constants/theme";
import Page from "../Page";
import SecHeader from "../SecHeader";

export default function PageContact({ isMobile }) {
  const T = THEME;

  return (
    <Page bg={T.altBg} isMobile={isMobile}>
      <div style={{ padding: isMobile ? "40px 18px 30px" : "60px 48px 40px" }}>
        <SecHeader title="Contact" sub="Get in touch with Ahmad for collaboration, consulting, or just to say hello." />

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.6fr", gap: 48 }}>
          <div>
            <p style={{ color: T.text, fontSize: "0.88rem", lineHeight: 1.85, marginBottom: 28 }}>
              Whether you need a hardware engineer, an HCI researcher, or someone who can do both — Ahmad would love to connect.
            </p>
            {[ ["📍", "Location", "Fairfax, VA 22033"],["✉️", "Email", "ahmadtak@mit.edu"],["📞", "Phone", "+1-571-354-3061"] ].map(([icon, label, value]) => (
              <div key={label} style={{ display: "flex", gap: 16, marginBottom: 22, alignItems: "flex-start" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${T.accent}18`, border: `1px solid ${T.accent}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 700, color: T.heading, fontSize: "0.88rem", marginBottom: 2 }}>{label}</div>
                  <div style={{ color: T.text, fontSize: "0.84rem" }}>{label === "Email" ? <a href="mailto:ahmadtak@mit.edu" style={{ color: T.accent }}>{value}</a> : value}</div>
                </div>
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              {[ ["𝕏","https://twitter.com/AhmadTakaHCI"],["in","https://www.linkedin.com/in/ahmad-taka-33920018b/"],["gh","https://github.com/nmondal417"] ].map(([l,h]) => (
                <a key={l} href={h} target="_blank" rel="noreferrer"
                  style={{ width: 36, height: 36, borderRadius: "50%", border: `1px solid #d4dfea`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontFamily: "'Raleway',sans-serif", fontWeight: 700, color: T.text, transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = T.accent; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = T.accent; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.text; e.currentTarget.style.borderColor = "#d4dfea"; }}>
                  {l}
                </a>
              ))}
            </div>
          </div>

          <div style={{ background: "#fff", borderRadius: 10, padding: 32, boxShadow: "0 4px 20px rgba(0,0,0,0.07)", border: "1px solid #eef1f5" }}>
            <h4 style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 700, color: T.heading, marginBottom: 20, fontSize: "1rem" }}>Send a Message</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              {["Your Name", "Your Email"].map(ph => (
                <input key={ph} placeholder={ph} style={{ padding: "10px 14px", border: "1px solid #d4dfea", borderRadius: 6, fontSize: "0.82rem", fontFamily: "'Open Sans',sans-serif", color: T.textDark, outline: "none", width: "100%" }} />
              ))}
            </div>
            <input placeholder="Subject" style={{ width: "100%", padding: "10px 14px", border: "1px solid #d4dfea", borderRadius: 6, fontSize: "0.82rem", fontFamily: "'Open Sans',sans-serif", color: T.textDark, outline: "none", marginBottom: 16, display: "block" }} />
            <textarea placeholder="Message" rows={5} style={{ width: "100%", padding: "10px 14px", border: "1px solid #d4dfea", borderRadius: 6, fontSize: "0.82rem", fontFamily: "'Open Sans',sans-serif", color: T.textDark, outline: "none", resize: "vertical", marginBottom: 20, display: "block" }} />
            <button style={{ padding: "10px 28px", background: T.accent, border: "none", color: "#fff", borderRadius: 50, fontFamily: "'Raleway',sans-serif", fontSize: "0.82rem", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.background = "#0d7cbf"}
              onMouseLeave={e => e.currentTarget.style.background = T.accent}>
              Send Message
            </button>
          </div>
        </div>
      </div>
    </Page>
  );
}
