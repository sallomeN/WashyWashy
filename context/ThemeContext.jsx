import React, { createContext, useContext } from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "../theme/colors";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ colors, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}


export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
