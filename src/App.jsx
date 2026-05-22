import { useState, useEffect } from "react";
import { THEME, injectGlobal } from "./constants/theme";
import Sidebar from "./components/Sidebar";
import PageHome from "./components/pages/Home";
import PageAbout from "./components/pages/About";
import PageResume from "./components/pages/Resume";
import PageProjects from "./components/pages/Projects";
import PageResearch from "./components/pages/Research";
import PageContact from "./components/pages/Contact";
import ChatWidget from "./components/ChatWidget";

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
            <div style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 700, color: THEME.heading, fontSize: "0.95rem" }}>{page}</div>
            <button onClick={() => setSidebarOpen(o => !o)} style={{ border: "none", background: "transparent", color: THEME.accent, fontSize: "1.05rem", cursor: "pointer" }}>☰ Menu</button>
          </div>
        )}
        {pages[page]}
      </div>
      <ChatWidget isMobile={isMobile} />
    </div>
  );
}
