import { useState, createContext, useEffect, useContext } from "react";

const ThemeContext = createContext("dark");

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  const getTheme = () => {
    const theme = localStorage.getItem("theme") || "dark";
    return theme;
  };

  const setThemeInLocalStorage = (theme) => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("class", theme);
  };

  const toggleTheme = () => {
    const theme = getTheme() === "dark" ? "light" : "dark";
    setThemeInLocalStorage(theme);
    setTheme(theme);
  };

  useEffect(() => {
    const theme = getTheme();
    setTheme(theme);
    setThemeInLocalStorage(theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  return useContext(ThemeContext);
};
