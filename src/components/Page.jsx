import { THEME } from "../constants/theme";

export default function Page({ children, bg, isMobile }) {
  const T = THEME;
  const bgColor = bg || T.bodyBg;

  return (
    <div className="page-slide" style={{
      flex: 1, overflowY: "auto", background: bgColor,
      fontFamily: "'Open Sans', sans-serif",
      WebkitOverflowScrolling: "touch"
    }}>
      {children}
    </div>
  );
}
