import { useContext } from "react";
import { ThemeContext } from "../context/theme-context";
import type { ThemeContextValue } from "../context/theme-context";

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme debe usarse dentro de ThemeProvider");
  }
  return context;
};
