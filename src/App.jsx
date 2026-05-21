import { useState, useEffect, useRef } from "react";

const T = {
  sidebar:    "#040b14",
  sidebarBdr: "rgba(255,255,255,0.08)",
  accent:     "#149ddd",
  accentHov:  "#37b3ed",
  bodyBg:     "#f5f8fd",
  altBg:      "#ffffff",
  heading:    "#173b6c",
  text:       "#728394",
  textDark:   "#45505b",
  mono:       "'Raleway', sans-serif",
  head:       "'Raleway', sans-serif",
  sans:       "'Open Sans', sans-serif",
};

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Raleway:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { height: 100%; }
  body { font-family: 'Open Sans', sans-serif; font-size: 14px; color: #728394; background: #f5f8fd; overflow: hidden; }
  a { text-decoration: none; color: #149ddd; }
  a:hover { color: #37b3ed; }
  ul { list-style: none; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: #f5f8fd; }
  ::-webkit-scrollbar-thumb { background: #c9d3df; border-radius: 3px; }
  @keyframes fadeIn { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:none; } }
  .fade-in { animation: fadeIn 0.4s ease forwards; }
  @keyframes pageSlide { from { opacity:0; transform:translateX(12px); } to { opacity:1; transform:none; } }
  .page-slide { animation: pageSlide 0.3s ease forwards; }
  @keyframes dot-pulse { 0%,100%{opacity:1;} 50%{opacity:.2;} }
`;

function injectGlobal() {
  if (document.getElementById("ipo-global")) return;
  const s = document.createElement("style");
  s.id = "ipo-global";
  s.textContent = GLOBAL_CSS;
  document.head.appendChild(s);
}

const PAGES = ["Home", "About", "Resume", "Projects", "Research", "Chat", "Contact"];
const PAGE_ICONS = {
  Home: "bi-house",
  About: "bi-person",
  Resume: "bi-file-text",
  Projects: "bi-grid",
  Research: "bi-journal-text",
  Chat: "bi-chat-dots",
  Contact: "bi-envelope",
};

function Sidebar({ current, onNav, isMobile, open, onClose }) {
  return (
    <div style={{
      width: 300, minHeight: "100vh", background: T.sidebar,
      display: "flex", flexDirection: "column", flexShrink: 0,
      position: isMobile ? "fixed" : "relative",
      top: 0, left: 0, zIndex: 20,
      transform: isMobile ? `translateX(${open ? 0 : -100}%)` : "none",
      transition: isMobile ? "transform 0.25s ease" : "none",
      borderRight: `1px solid ${T.sidebarBdr}`,
      boxShadow: isMobile ? "0 24px 60px rgba(0,0,0,0.18)" : "none"
    }}>
      {isMobile && (
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "14px 18px" }}>
          <button onClick={onClose} style={{ border: "none", background: "transparent", color: "#fff", fontSize: "1.2rem", cursor: "pointer" }}>✕</button>
        </div>
      )}
      <div style={{ padding: "30px 20px 20px", textAlign: "center", borderBottom: `1px solid ${T.sidebarBdr}` }}>
        <div style={{ width: 120, height: 120, borderRadius: "50%", overflow: "hidden", margin: "0 auto 15px", border: `4px solid rgba(255,255,255,0.1)` }}>
          <img
            src="https://ahmadtak-3212.github.io/assets/img/taka_profile_1.jpg"
            alt="Ahmad Taka"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            onError={e => { e.target.style.display = "none"; e.target.parentElement.style.background = "#173b6c"; }}
          />
        </div>
        <h1
          onClick={() => onNav("Home")}
          style={{ color: "#fff", fontSize: "1.25rem", fontFamily: "'Raleway', sans-serif", fontWeight: 700, cursor: "pointer", letterSpacing: "0.5px" }}
        >
          Ahmad Taka
        </h1>
        <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.78rem", marginTop: 6, fontFamily: "'Open Sans', sans-serif" }}>
          Engineer &amp; Researcher
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 14 }}>
          {[
            ["https://twitter.com/AhmadTakaHCI", "𝕏"],
            ["https://www.linkedin.com/in/ahmad-taka-33920018b/", "in"],
            ["https://github.com/nmondal417", "gh"],
          ].map(([href, label]) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" style={{
              width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "rgba(255,255,255,0.6)", fontSize: "0.7rem", fontFamily: "'Raleway',sans-serif", fontWeight: 700,
              transition: "all 0.2s"
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      <nav style={{ padding: "15px 0", flex: 1 }}>
        {PAGES.map((p) => {
          const active = current === p;
          return (
            <button
              key={p}
              onClick={() => onNav(p)}
              style={{
                width: "100%", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 10,
                padding: "12px 25px",
                color: active ? "#fff" : "rgba(255,255,255,0.65)",
                fontSize: "0.82rem", fontFamily: "'Raleway', sans-serif", fontWeight: active ? 600 : 400,
                letterSpacing: "0.5px", textAlign: "left",
                borderLeft: active ? `3px solid ${T.accent}` : "3px solid transparent",
                background: active ? "rgba(255,255,255,0.04)" : "transparent",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderLeftColor = T.accent; } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.color = "rgba(255,255,255,0.65)"; e.currentTarget.style.borderLeftColor = "transparent"; } }}
            >
              <span style={{ fontSize: "0.95rem", opacity: active ? 1 : 0.6 }}>
                {{"Home":"⌂","About":"◉","Resume":"📄","Projects":"⊞","Research":"📖","Chat":"💬","Contact":"✉"}[p]}
              </span>
              {p}
            </button>
          );
        })}
      </nav>

      <div style={{ padding: "15px 20px", borderTop: `1px solid ${T.sidebarBdr}`, textAlign: "center", fontSize: "0.68rem", color: "rgba(255,255,255,0.25)", fontFamily: "'Open Sans',sans-serif" }}>
        © 2024 Ahmad Taka · MIT EECS
      </div>
    </div>
  );
}

function Page({ children, bg = T.bodyBg, isMobile }) {
  return (
    <div className="page-slide" style={{
      flex: 1, overflowY: "auto", background: bg,
      fontFamily: "'Open Sans', sans-serif",
      WebkitOverflowScrolling: "touch"
    }}>
      {children}
    </div>
  );
}

function SecHeader({ title, sub, center = true }) {
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

const TYPED_STRINGS = ["Hardware Engineer", "HCI Researcher", "FPGA Builder", "MIT EECS Graduate", "Maker & Inventor"];

function PageHome({ onNav, isMobile }) {
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

const SKILLS_DATA = [
  { title: "Programming Languages", tags: ["C/C++","Python","Java","SystemVerilog","8080 Assembly","SQL"] },
  { title: "Web Design & Development", tags: ["HTML","CSS","JavaScript","Flask","NodeJS","JQuery","D3"] },
  { title: "Electronic & Mechanical Design", tags: ["MATLAB","SolidWorks","Fusion 360","SPICE","KiCAD","Rhino/Grasshopper"] },
  { title: "Development Ecosystems", tags: ["Visual Studio","Vivado","Eclipse","Oracle SQL","PyCharm/IntelliJ"] },
  { title: "Machining & Manufacturing", tags: ["3D Printing","Laser Cutting","PCB Fabrication","Arduino","Milling","Welding","Woodworking"] },
];

const SKILL_BARS = [
  { label: "C/C++ & Embedded", pct: 90 },
  { label: "Python", pct: 88 },
  { label: "HTML/CSS/JS", pct: 80 },
  { label: "FPGA / SystemVerilog", pct: 85 },
  { label: "PCB Design (KiCAD)", pct: 82 },
  { label: "3D Design (SolidWorks/Fusion)", pct: 78 },
];

function SkillBar({ label, pct }) {
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

function PageAbout({ isMobile }) {
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

const EDU = [
  { period: "2019 – 2023", title: "Bachelor of Engineering, EECS", place: "Massachusetts Institute of Technology, Cambridge, MA", desc: "Relevant courses: Introductory Digital Systems Laboratory, Special Subject in Digital Design, Embedded Systems, Computer Systems Engineering, Software Construction, How to Make Almost Anything" },
  { period: "2019 – 2023", title: "Minor in Physics", place: "Massachusetts Institute of Technology, Cambridge, MA", desc: "Statistical Mechanics, Classical Mechanics, Advanced Classical Mechanics, Waves and Vibrations, Quantum Mechanics, Special Relativity" },
];

const EXP = [
  { period: "Aug 2023 – Present", title: "Partner", place: "Spock Consulting, Cambridge, MA", bullets: ["Worked with small businesses and startups to develop products — spock-consulting.com","Delivered MVPs for 10+ clients: AI Chatbot, Chocolate Tempering Oven, Portfolio Sites, Commercial Music Player","Managed a team of 2 Software Developers to deliver projects on time"] },
  { period: "Jun 2023 – Present", title: "Co-Founder", place: "The New Fitness Corporation (ApeFit), Cambridge, MA", bullets: ["Developed unique hardware sensor technology alongside a team of 2 engineers — apefit.io","Raised over $50K in non-dilutive funding: MIT delta v, MIT Sandbox, C10 Labs Winter 2023 Cohort","Conducted 130+ customer interviews; developed hypothesis validation pipeline","Garnered partnerships with multiple local gyms"] },
  { period: "Jan 2021 – Jul 2023", title: "HCI Researcher", place: "MIT CSAIL, Cambridge, MA", bullets: ["Co-authored 3 papers (1 nominated Best Demo at CHI 2022) at intersection of robotics and 3D printing","Created software for embedding 2D tags in STL files","Evaluated techniques and implemented web-based applications","Designed hardware for lab group and other projects"] },
  { period: "Dec 2021 – Jan 2022", title: "Contract PCB Designer", place: "Timeback Incorporated, New York City", bullets: ["Created custom PCBs to client specification"] },
  { period: "Jun 2019 – Aug 2021", title: "Software Engineer", place: "Chainbridge Solutions, Chantilly, VA", bullets: ["Developed web-based infographics, user-interfaces, presentations, and automations","Implemented FFT and BoofCV image processing to build an Image Processing PDF Reader","Built a data visualization dashboard in JavaScript for improved customer experience","Spearheaded Robotic Process Automation to speed up cross-platform development"] },
];

function TlItem({ item }) {
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

function PageResume({ isMobile }) {
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

const PROJECTS = [
  { name: "GameMan", cat: "Hardware", img: "https://ahmadtak-3212.github.io/assets/img/projects/gameman/nintendo_logo.jpg", desc: "A cycle-accurate FPGA implementation of the original DMG GameBoy.", link: "https://ahmadtak-3212.github.io/page/gameman-project-details.html" },
  { name: "Nikolai V1", cat: "Build", img: "https://ahmadtak-3212.github.io/assets/img/projects/nikolai/nikolai-photo.jpg", desc: "An electromagnetically attractive embedded system gauntlet.", link: "https://ahmadtak-3212.github.io/page/nikolai-project-details.html" },
  { name: "Galina", cat: "Hardware", img: "https://ahmadtak-3212.github.io/assets/img/projects/galina/galina_photo.gif", desc: "An FPGA-driven 3D RGB LED driver with real-time rendering pipeline.", link: "https://ahmadtak-3212.github.io/page/galina-project-details.html" },
  { name: "Rasputin", cat: "Build", img: "https://ahmadtak-3212.github.io/assets/img/projects/rasputin/rasputin_photo_1.jpeg", desc: "A low-cost custom 3D printer, fully designed and built from scratch.", link: "https://ahmadtak-3212.github.io/page/rasputin-project-details.html" },
  { name: "Web-based IR Scanner", cat: "Web", img: "https://ahmadtak-3212.github.io/assets/img/projects/irscanner/irscanner_photo_1.jpg", desc: "Browser app for capturing and decoding near-infrared tags in 3D-printed objects.", link: "https://ahmadtak-3212.github.io/page/irscanner-project-details.html" },
  { name: "Volya", cat: "Build", img: "https://ahmadtak-3212.github.io/assets/img/projects/volya/volya_photo_1.jpg", desc: "A custom 3D-printed brushless motor wound from bare laminations.", link: "https://ahmadtak-3212.github.io/page/volya-project-details.html" },
  { name: "Ruka", cat: "Hardware", img: "https://ahmadtak-3212.github.io/assets/img/projects/ruka/ruka_photo_1.jpg", desc: "A custom 3D-printed mechanical arm stand.", link: "https://ahmadtak-3212.github.io/page/ruka-project-details.html" },
  { name: "Esfir", cat: "Build", img: "https://ahmadtak-3212.github.io/assets/img/projects/esfir/esfir_photo_1.png", desc: "A smart light embedded system with custom MCU board and wireless control.", link: "https://ahmadtak-3212.github.io/page/esfir-project-details.html" },
  { name: "IR Camera Racing Game", cat: "Web", img: "https://ahmadtak-3212.github.io/assets/img/projects/irwebgame/irwebgame_photo_1.gif", desc: "A browser racing game controlled by IR camera input.", link: "https://ahmadtak-3212.github.io/page/irwebgame-project-details.html" },
  { name: "Taka Spectrum Analyzer", cat: "Electronics", img: "https://ahmadtak-3212.github.io/assets/img/progress/week-7/result.jpg", desc: "Real-time embedded audio spectrum analyzer with FFT visualization.", link: "https://ahmadtak-3212.github.io/page/week-7-details.html" },
  { name: "PCB with OLED Display", cat: "Electronics", img: "https://ahmadtak-3212.github.io/assets/img/progress/week-5/final-board.jpg", desc: "Custom KiCAD PCB with OLED display, fabricated from scratch.", link: "https://ahmadtak-3212.github.io/page/week-5-details.html" },
  { name: "Neanderthal 2170XR", cat: "Hardware", img: "https://ahmadtak-3212.github.io/assets/img/projects/neanderthal2170xr/neanderthal2170xr.jpg", desc: "Superscalar 2-way custom FPGA CPU with full pipeline and branch prediction.", link: "https://github.com/nmondal417/Neanderthal2170XR" },
  { name: "Electric ATV", cat: "Build", img: "https://ahmadtak-3212.github.io/assets/img/progress/final_project/project_image.jpg", desc: "Fully custom electric ATV with bespoke motor controller and chassis.", link: "https://ahmadtak-3212.github.io/page/final-project-details.html" },
];

function ProjCard({ p }) {
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

function PageProjects({ isMobile }) {
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

const RESEARCH = [
  { icon: "🔴", title: "InfraredTags", desc: "2D markers and barcodes imperceptible to the naked eye that can be 3D printed as part of objects, and detected rapidly by low-cost near-infrared cameras.", link: "https://hcie.csail.mit.edu/research/infraredtags/infraredtags.html" },
  { icon: "🔵", title: "StructCodes", desc: "Unobtrusive codes embedded into the structure of laser-cut objects — invisible to the eye but machine-readable, enabling smart physical objects.", link: "https://hcie.csail.mit.edu/research/structcode/structcode.html" },
  { icon: "🟢", title: "BrightMarker", desc: "A fabrication method using fluorescent filaments to embed easily trackable markers in 3D-printed color objects — nominated for Best Demo at CHI 2022.", link: "https://hcie.csail.mit.edu/research/brightmarker/brightmarker.html" },
  { icon: "🟡", title: "FabRobotics", desc: "A digital fabrication pipeline combining traditional 3D printing with mobile robots, enabling automated assembly and fabrication workflows.", link: "https://www.axlab.cs.uchicago.edu/projects/fabrobotics" },
  { icon: "🧠", title: "InfraredTags + CNN", desc: "Extension of InfraredTags showing how embedded tags can be decoded using a convolutional neural network after capture by low-cost near-infrared cameras.", link: "https://dl.acm.org/doi/10.1145/3491101.3519905" },
];

function ResearchCard({ research }) {
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

function PageResearch({ isMobile }) {
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

const BOT_R = {
  degree: ["I graduated from MIT in 2023 with a B.Eng in EECS (Course 6-2), plus a minor in Physics. MIT's combined program exposed me to both software construction and solid-state circuits! ⚡", "MIT Course 6 — EECS — Class of 2023. Physics minor covering Classical Mechanics through Quantum Mechanics and Special Relativity."],
  research: ["I co-authored 3 papers at MIT CSAIL: InfraredTags, StructCodes, BrightMarker, FabRobotics, and an InfraredTags CNN extension. BrightMarker was nominated for Best Demo at CHI 2022! 🔬", "My research is at the intersection of digital fabrication and HCI — embedding invisible, machine-readable tags directly into physical objects during the fabrication process."],
  projects: ["Key projects: GameMan (FPGA GameBoy), Galina (3D LED driver), Nikolai (electromagnetic gauntlet), Rasputin (custom 3D printer), Volya (brushless motor), Electric ATV. Plus PCB work and web tools! 🛠", "I've built across hardware, fabrication, and web. The Electric ATV is probably the most ambitious. Check the Projects page for details on each one!"],
  work: ["Currently Partner at Spock Consulting and Co-Founder of ApeFit (raised $50K+, MIT delta v). Previously HCI researcher at MIT CSAIL and software engineer at Chainbridge Solutions. 🚀", "Wearing many hats: researcher, PCB designer, software engineer, startup founder. Open to new opportunities — reach out!"],
  default: ["That's a great question! My background uniquely bridges FPGA hardware, physical fabrication, HCI research, and web dev. Anything specific you'd like to know? 😄", "Best to reach Ahmad directly at ahmadtak@mit.edu — he'll get back to you personally!"],
};

function pickR(a) { return a[Math.floor(Math.random() * a.length)]; }
function getReply(m) {
  const t = m.toLowerCase();
  if (t.match(/degree|mit|study|school|eecs|physic|graduate|major/)) return pickR(BOT_R.degree);
  if (t.match(/research|paper|csail|hci|infrared|struct|bright|fabro|chi/)) return pickR(BOT_R.research);
  if (t.match(/project|build|fpga|motor|printer|gameman|galina|atv|pcb/)) return pickR(BOT_R.projects);
  if (t.match(/work|job|hire|experi|consult|startup|apefit|spock|available/)) return pickR(BOT_R.work);
  return pickR(BOT_R.default);
}

function PageChat({ isMobile }) {
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

function PageContact({ isMobile }) {
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

export default function App() {
  const [page, setPage] = useState("Home");
  const [navKey, setNavKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => { injectGlobal(); }, []);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth <= 900);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const navigate = (p) => { setPage(p); setNavKey(k => k + 1); if (isMobile) setSidebarOpen(false); };

  const pages = {
    Home:     <PageHome onNav={navigate} isMobile={isMobile} />,
    About:    <PageAbout isMobile={isMobile} />,
    Resume:   <PageResume isMobile={isMobile} />,
    Projects: <PageProjects isMobile={isMobile} />,
    Research: <PageResearch isMobile={isMobile} />,
    Chat:     <PageChat isMobile={isMobile} />,
    Contact:  <PageContact isMobile={isMobile} />,
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", position: "relative" }}>
      <Sidebar current={page} onNav={navigate} isMobile={isMobile} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {isMobile && sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 15 }} />
      )}
      <div key={navKey} style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {isMobile && (
          <div style={{ position: "sticky", top: 0, zIndex: 10, background: "#fff", borderBottom: "1px solid #eef1f5", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px" }}>
            <div style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 700, color: T.heading, fontSize: "0.95rem" }}>{page}</div>
            <button onClick={() => setSidebarOpen(o => !o)} style={{ border: "none", background: "transparent", color: T.accent, fontSize: "1.05rem", cursor: "pointer" }}>☰ Menu</button>
          </div>
        )}
        {pages[page]}
      </div>
    </div>
  );
}
