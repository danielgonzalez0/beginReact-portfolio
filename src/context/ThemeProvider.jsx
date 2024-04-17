// Dark mode exercise

import { createContext, useContext, useEffect, useState } from "react";

const themeContext = createContext(null);

const LOCAL_STORAGE_THEME_KEY = "colorScheme";

export const useThemeContext = () => {
  const context = useContext(themeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;

}
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const isDark = theme === "dark";
  const isLight = theme === "light";

  const toggleTheme = () => {

    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    const savedColorScheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
    if (savedColorScheme) {
      setTheme(savedColorScheme)
      return
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      setTheme(mediaQuery.matches ? "dark" : "light");
    }
  
    mediaQuery.addEventListener("change", handleChange);

    handleChange();

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    }

  }, []);

  const values = { theme, isDark, isLight, toggleTheme };

  return (
    <themeContext.Provider value={values}>
      {children}
    </themeContext.Provider>)
};

export const ThemeLayout = ({ children, ...props }) => {

  const { isDark } = useThemeContext();
  return <div className={isDark ? "dark" : "light"} {...props}>{children}</div>
}