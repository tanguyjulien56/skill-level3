import { useEffect, useState } from "react";
import MoonIcon from "../../components/icons/MoonIcon";
import SunIcon from "../../components/icons/SunIcon";

export default function ThemeToggle() {
  const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "black"
      : "lofi";
  };

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || getSystemTheme()
  );

  useEffect(() => {
    const root = document.documentElement;

    // Appliquer le thème
    root.setAttribute("data-theme", theme);

    // Sauvegarder uniquement si c'est un choix utilisateur
    if (theme !== getSystemTheme()) {
      localStorage.setItem("theme", theme);
    } else {
      localStorage.removeItem("theme");
    }
  }, [theme]);

  // Basculer le thème
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "lofi" ? "black" : "lofi"));
  };

  // Écouter les changements du système
  useEffect(() => {
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "black" : "lofi");
      }
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  return (
    <div className="btn btn-secondary fixed bottom-10 right-10 z-50">
      <label className="swap swap-rotate">
        {/* hidden checkbox controls the state */}
        <input
          type="checkbox"
          checked={theme === "black"}
          onChange={toggleTheme}
          aria-label="Toggle Theme"
        />
        <SunIcon />
        <MoonIcon />
      </label>
    </div>
  );
}
