import { useDarkMode } from "../hooks/useDarkMode";
import { useNews } from "../hooks/useNews";
import { useContext } from "react";
import { NewsContext } from "../context/NewsCOntext";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSpeech } from "../hooks/useSpeech";

export default function Navbar() {
  const { isDark, setIsDark } = useDarkMode();
  const { stopSpeech } = useSpeech();
  const { language, setLanguage, search } = useContext(NewsContext);
  const { loadNews } = useNews();

  return (
    <nav>
      <div className="logo">📰 News<span style={{ color: "gold" }}>ly</span></div>

      <div className="language-dropdown">
        <select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
            loadNews(search, e.target.value);
          }}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="es">Spanish</option>
        </select>
      </div>

      <button onClick={stopSpeech}>🔇 Stop</button>

      <button className="dark-toggle" onClick={() => setIsDark(!isDark)}>
        {isDark ? <FaSun /> : <FaMoon />}
      </button>
    </nav>
  );
}
