import React, { useEffect, useState } from "react";
import Home from "./screens/Home/Home";
import "./styles/global.css";
import "./styles/bootstrap-overrides.css";
import "./styles/theme.css";
import { FaSun, FaMoon, FaRocket } from "react-icons/fa";

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
      <div className="d-flex justify-content-center align-items-center pt-5">
        <h1 className="app-title">
          <FaRocket className="rocket-icon" /> GitHub Repository Explorer
        </h1>
      </div>
      <Home />

      {/* Floating Theme Toggle Button */}
      <button className="theme-toggle-btn" onClick={toggleTheme}>
        {theme === "light" ? <FaMoon size={24} /> : <FaSun size={24} />}
      </button>
    </div>
  );
};

export default App;
