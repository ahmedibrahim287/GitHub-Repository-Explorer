import React, { useEffect, useState } from "react";
import Home from "./screens/Home/Home";
import "./styles/global.css";
import "./styles/bootstrap-overrides.css";
import "./styles/theme.css";
import { FaSun, FaMoon } from "react-icons/fa";

const App: React.FC = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="app-container">
      <h1 className="app-title">🚀 GitHub Repository Explorer</h1>
      <Home />
      {/* Floating Theme Toggle Button */}
      <button className="theme-toggle-btn" onClick={toggleTheme}>
        {theme === "light" ? <FaMoon size={24} /> : <FaSun size={24} />}
      </button>
    </div>
  );
};

export default App;
