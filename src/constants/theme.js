export const THEME = {
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

export const GLOBAL_CSS = `
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

export function injectGlobal() {
  if (document.getElementById("ipo-global")) return;
  const s = document.createElement("style");
  s.id = "ipo-global";
  s.textContent = GLOBAL_CSS;
  document.head.appendChild(s);
}
