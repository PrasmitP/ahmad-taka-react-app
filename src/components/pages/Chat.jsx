import { useState, useEffect, useRef } from "react";
import { THEME } from "../../constants/theme";
import { BOT_R } from "../../constants/data";
import Page from "../Page";
import SecHeader from "../SecHeader";

function pickR(a) { return a[Math.floor(Math.random() * a.length)]; }
function getReply(m) {
  const t = m.toLowerCase();
  if (t.match(/degree|mit|study|school|eecs|physic|graduate|major/)) return pickR(BOT_R.degree);
  if (t.match(/research|paper|csail|hci|infrared|struct|bright|fabro|chi/)) return pickR(BOT_R.research);
  if (t.match(/project|build|fpga|motor|printer|gameman|galina|atv|pcb/)) return pickR(BOT_R.projects);
  if (t.match(/work|job|hire|experi|consult|startup|apefit|spock|available/)) return pickR(BOT_R.work);
  return pickR(BOT_R.default);
}

export default function PageChat({ isMobile }) {
  const T = THEME;
  const [msgs, setMsgs] = useState([{ type: "bot", text: "Hi! I'm Ahmad's assistant. Ask me about his MIT education, research papers, hardware projects, or work experience!" }]);
  const [inp, setInp] = useState("");
  const [typingDot, setTypingDot] = useState(false);
  const boxRef = useRef();

  useEffect(() => { if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight; }, [msgs, typingDot]);

  const send = (text) => {
    if (!text.trim()) return;
    setInp("");
    setMsgs(m => [...m, { type: "user", text }]);
    setTypingDot(true);
    setTimeout(() => { setTypingDot(false); setMsgs(m => [...m, { type: "bot", text: getReply(text) }]); }, 900 + Math.random() * 500);
  };

  const SUGGS = ["What did you study at MIT?", "Tell me about your research", "What projects have you built?", "Are you available to hire?"];

  return (
    <Page isMobile={isMobile}>
      <div style={{ padding: isMobile ? "40px 18px 30px" : "60px 48px 40px" }}>
        <SecHeader title="Chat" sub="Have a question about Ahmad's background or projects? Ask the assistant below." />

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.4fr", gap: isMobile ? 24 : 40, alignItems: "start" }}>
          <div>
            <p style={{ color: T.text, fontSize: "0.88rem", lineHeight: 1.85, marginBottom: 20 }}>
              This demo assistant can answer common questions about Ahmad's degree, research, projects, and work history. Try the suggestion chips or type your own question.
            </p>
            {[ ["🎓","MIT EECS + Physics Minor, Class of 2023"],["🔬","3 co-authored papers at MIT CSAIL"],["🚀","Co-founder ApeFit · Partner Spock Consulting"],["📍","Fairfax, VA · Open to remote work"] ].map(([icon, text]) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "#fff", border: "1px solid #eef1f5", borderRadius: 8, marginBottom: 10, boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
                <span style={{ fontSize: "1.1rem" }}>{icon}</span>
                <span style={{ fontSize: "0.82rem", color: T.textDark }}>{text}</span>
              </div>
            ))}
          </div>

          <div style={{ background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", border: "1px solid #eef1f5" }}>
            <div style={{ background: T.sidebar, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${T.accent}, #0d7cbf)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: 700, color: "#fff", flexShrink: 0 }}>AT</div>
              <div>
                <div style={{ fontSize: "0.85rem", color: "#fff", fontWeight: 600, fontFamily: "'Raleway',sans-serif" }}>Ahmad's Assistant</div>
                <div style={{ fontSize: "0.68rem", color: T.accent, display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.accent, display: "inline-block", animation: "dot-pulse 2s ease-in-out infinite" }} />
                  Online
                </div>
              </div>
            </div>

            <div ref={boxRef} style={{ height: 300, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10, background: "#f8fbfe" }}>
              {msgs.map((m, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-end", flexDirection: m.type === "user" ? "row-reverse" : "row" }}>
                  <div style={{ width: 26, height: 26, borderRadius: "50%", flexShrink: 0, fontSize: "0.6rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", background: m.type === "bot" ? T.accent : "#e8eef5", color: m.type === "bot" ? "#fff" : T.heading }}>
                    {m.type === "bot" ? "AT" : "Me"}
                  </div>
                  <div style={{ padding: "9px 13px", borderRadius: 12, fontSize: "0.8rem", lineHeight: 1.6, maxWidth: "78%", background: m.type === "bot" ? "#fff" : T.accent, color: m.type === "bot" ? T.textDark : "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.07)", borderBottomLeftRadius: m.type === "bot" ? 3 : 12, borderBottomRightRadius: m.type === "user" ? 3 : 12 }}>
                    {m.text}
                  </div>
                </div>
              ))}
              {typingDot && (
                <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                  <div style={{ width: 26, height: 26, borderRadius: "50%", fontSize: "0.6rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", background: T.accent, color: "#fff" }}>AT</div>
                  <div style={{ padding: "9px 14px", borderRadius: 12, background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.07)", borderBottomLeftRadius: 3 }}>
                    <span style={{ display: "flex", gap: 4, alignItems: "center" }}>
                      {[0, 1, 2].map(d => <span key={d} style={{ width: 6, height: 6, borderRadius: "50%", background: T.accent, display: "inline-block", animation: `dot-pulse 1.2s ${d * 0.2}s ease-in-out infinite` }} />)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, padding: "10px 14px", borderTop: "1px solid #eef1f5", background: "#fff" }}>
              {SUGGS.map(s => (
                <button key={s} onClick={() => send(s)} style={{ background: "#eef6fc", border: `1px solid #cce8f8`, color: "#1a7bb9", fontFamily: "'Open Sans',sans-serif", fontSize: "0.7rem", padding: "4px 12px", borderRadius: 50, cursor: "pointer", transition: "all 0.15s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = T.accent; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#eef6fc"; e.currentTarget.style.color = "#1a7bb9"; }}>
                  {s}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: 0, borderTop: "1px solid #eef1f5" }}>
              <input value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === "Enter" && send(inp)}
                placeholder="Ask a question..."
                style={{ flex: 1, border: "none", outline: "none", padding: "12px 16px", fontSize: "0.82rem", fontFamily: "'Open Sans',sans-serif", background: "#fff", color: T.textDark }} />
              <button onClick={() => send(inp)} style={{ padding: "0 20px", background: T.accent, border: "none", color: "#fff", cursor: "pointer", fontSize: "1rem", transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#0d7cbf"}
                onMouseLeave={e => e.currentTarget.style.background = T.accent}>
                ➤
              </button>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
