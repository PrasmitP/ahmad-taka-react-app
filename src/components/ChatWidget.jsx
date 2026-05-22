import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { THEME } from "../constants/theme";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const SYSTEM_PROMPT = `You are Ahmad Taka's personal AI portfolio assistant. Be friendly, concise (2-3 sentences max per reply), and only answer based on the following factual information about Ahmad. Do not make up information.

EDUCATION: MIT EECS (Course 6-2) + Physics Minor, Class of 2023. Relevant courses: Digital Systems, FPGA design, Embedded Systems, Computer Systems Engineering, Software Construction, How to Make Almost Anything.

RESEARCH (MIT CSAIL, Jan 2021 – Jul 2023): Co-authored 3 papers at the intersection of HCI and digital fabrication:
- InfraredTags: 2D markers embedded invisibly in 3D-printed objects, detectable by near-infrared cameras
- StructCodes: Machine-readable codes embedded in laser-cut objects, invisible to the naked eye
- BrightMarker: Fluorescent filament markers in 3D-printed objects — nominated Best Demo at CHI 2022
- FabRobotics: Pipeline combining 3D printing with mobile robots for automated fabrication
- InfraredTags CNN extension: Neural network decoding of embedded IR tags

WORK EXPERIENCE:
- Partner, Spock Consulting (Aug 2023–present, Cambridge MA): Delivered MVPs for 10+ clients — AI chatbots, hardware products, portfolio sites. Managed a 2-person dev team.
- Co-Founder, ApeFit / The New Fitness Corporation (Jun 2023–present): Fitness hardware startup with proprietary sensor technology. Raised $50K+ (MIT delta v, MIT Sandbox, C10 Labs). 130+ customer interviews.
- HCI Researcher, MIT CSAIL (Jan 2021–Jul 2023): All research listed above.
- Contract PCB Designer, Timeback Inc (Dec 2021–Jan 2022): Custom PCBs to client specification.
- Software Engineer, Chainbridge Solutions (Jun 2019–Aug 2021): Web infographics, image processing (FFT, BoofCV), data visualization dashboards, robotic process automation.

HARDWARE PROJECTS: GameMan (cycle-accurate FPGA GameBoy), Galina (FPGA-driven 3D RGB LED driver), Nikolai V1 (electromagnetic gauntlet embedded system), Rasputin (custom 3D printer built from scratch), Volya (custom brushless motor from bare laminations), Ruka (3D-printed mechanical arm stand), Esfir (smart light with custom MCU board + wireless control), Electric ATV (fully custom with bespoke motor controller), Neanderthal 2170XR (superscalar 2-way FPGA CPU with full pipeline and branch prediction).

WEB & ELECTRONICS PROJECTS: Web-based IR Scanner (browser app for NIR tag detection), IR Camera Racing Game, Taka Spectrum Analyzer (real-time embedded audio FFT), PCB with OLED Display.

SKILLS: C/C++, Python, Java, SystemVerilog, 8080 Assembly, SQL, HTML/CSS/JavaScript, Flask, NodeJS, MATLAB, SolidWorks, Fusion 360, SPICE, KiCAD, Rhino/Grasshopper, Vivado, 3D printing, PCB fabrication, laser cutting, milling, welding, woodworking.

CONTACT: ahmadtak@mit.edu | Location: Fairfax, VA | Open to remote work

If asked anything unrelated to Ahmad, politely say you can only answer questions about Ahmad's background and redirect them.`;

export default function ChatWidget({ isMobile }) {
  const T = THEME;
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{
    type: "bot",
    text: "Hi! I'm Ahmad's AI assistant. Ask me about his MIT education, research, projects, or work experience!",
  }]);
  const [inp, setInp] = useState("");
  const [loading, setLoading] = useState(false);
  const boxRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [msgs, loading]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const send = async (text) => {
    if (!text.trim() || loading) return;
    setInp("");
    const updated = [...msgs, { type: "user", text }];
    setMsgs(updated);
    setLoading(true);

    if (!API_KEY) {
      setLoading(false);
      setMsgs(m => [...m, { type: "bot", text: "AI is not configured. Please add the VITE_GEMINI_API_KEY environment variable." }]);
      return;
    }

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: SYSTEM_PROMPT,
      });

      // Build history from all prior exchanges (skip initial bot greeting)
      const history = updated.slice(1, -1).map(m => ({
        role: m.type === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      }));

      const chat = model.startChat({ history });
      const result = await chat.sendMessage(text);
      setMsgs(m => [...m, { type: "bot", text: result.response.text() }]);
    } catch {
      setMsgs(m => [...m, { type: "bot", text: "Sorry, something went wrong. Try again or reach Ahmad at ahmadtak@mit.edu" }]);
    } finally {
      setLoading(false);
    }
  };

  const SUGGS = ["What did you study at MIT?", "Tell me about your research", "What projects have you built?"];
  const panelW = isMobile ? Math.min(typeof window !== "undefined" ? window.innerWidth - 32 : 308, 340) : 340;

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
      {open && (
        <div style={{
          width: panelW, background: "#fff", borderRadius: 16,
          boxShadow: "0 8px 40px rgba(0,0,0,0.18)", overflow: "hidden",
          border: "1px solid #eef1f5", animation: "fadeIn 0.2s ease",
        }}>
          <div style={{ background: T.sidebar, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: `linear-gradient(135deg, ${T.accent}, #0d7cbf)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, color: "#fff", flexShrink: 0 }}>AT</div>
              <div>
                <div style={{ fontSize: "0.82rem", color: "#fff", fontWeight: 600, fontFamily: "'Raleway',sans-serif" }}>Ahmad's Assistant</div>
                <div style={{ fontSize: "0.65rem", color: T.accent, display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.accent, display: "inline-block", animation: "dot-pulse 2s ease-in-out infinite" }} />
                  {loading ? "Thinking…" : "Online · Powered by Gemini"}
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: "transparent", border: "none", color: "#aaa", cursor: "pointer", fontSize: "1rem", padding: 4, lineHeight: 1 }}>✕</button>
          </div>

          <div ref={boxRef} style={{ height: 280, overflowY: "auto", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10, background: "#f8fbfe" }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: "flex", gap: 7, alignItems: "flex-end", flexDirection: m.type === "user" ? "row-reverse" : "row" }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", flexShrink: 0, fontSize: "0.55rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", background: m.type === "bot" ? T.accent : "#e8eef5", color: m.type === "bot" ? "#fff" : T.heading }}>
                  {m.type === "bot" ? "AT" : "Me"}
                </div>
                <div style={{ padding: "8px 12px", borderRadius: 12, fontSize: "0.78rem", lineHeight: 1.6, maxWidth: "80%", background: m.type === "bot" ? "#fff" : T.accent, color: m.type === "bot" ? T.textDark : "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.07)", borderBottomLeftRadius: m.type === "bot" ? 3 : 12, borderBottomRightRadius: m.type === "user" ? 3 : 12 }}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", gap: 7, alignItems: "flex-end" }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", fontSize: "0.55rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", background: T.accent, color: "#fff" }}>AT</div>
                <div style={{ padding: "8px 13px", borderRadius: 12, background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.07)", borderBottomLeftRadius: 3 }}>
                  <span style={{ display: "flex", gap: 4, alignItems: "center" }}>
                    {[0, 1, 2].map(d => <span key={d} style={{ width: 5, height: 5, borderRadius: "50%", background: T.accent, display: "inline-block", animation: `dot-pulse 1.2s ${d * 0.2}s ease-in-out infinite` }} />)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {msgs.length <= 1 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, padding: "8px 12px", borderTop: "1px solid #eef1f5", background: "#fff" }}>
              {SUGGS.map(s => (
                <button key={s} onClick={() => send(s)}
                  style={{ background: "#eef6fc", border: "1px solid #cce8f8", color: "#1a7bb9", fontFamily: "'Open Sans',sans-serif", fontSize: "0.68rem", padding: "3px 10px", borderRadius: 50, cursor: "pointer", transition: "all 0.15s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = T.accent; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#eef6fc"; e.currentTarget.style.color = "#1a7bb9"; }}>
                  {s}
                </button>
              ))}
            </div>
          )}

          <div style={{ display: "flex", borderTop: "1px solid #eef1f5" }}>
            <input
              ref={inputRef}
              value={inp}
              onChange={e => setInp(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send(inp)}
              placeholder="Ask a question…"
              disabled={loading}
              style={{ flex: 1, border: "none", outline: "none", padding: "11px 14px", fontSize: "0.78rem", fontFamily: "'Open Sans',sans-serif", background: "#fff", color: T.textDark }}
            />
            <button
              onClick={() => send(inp)}
              disabled={loading || !inp.trim()}
              style={{ padding: "0 16px", background: T.accent, border: "none", color: "#fff", cursor: loading || !inp.trim() ? "default" : "pointer", fontSize: "0.95rem", opacity: loading || !inp.trim() ? 0.5 : 1, transition: "all 0.2s" }}
              onMouseEnter={e => { if (!loading && inp.trim()) e.currentTarget.style.background = "#0d7cbf"; }}
              onMouseLeave={e => { e.currentTarget.style.background = T.accent; }}>
              ➤
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: 56, height: 56, borderRadius: "50%",
          background: open ? "#555" : `linear-gradient(135deg, ${T.accent}, #0d7cbf)`,
          border: "none", color: "#fff", cursor: "pointer",
          boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
          fontSize: "1.35rem", display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background 0.25s ease",
        }}>
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
}
