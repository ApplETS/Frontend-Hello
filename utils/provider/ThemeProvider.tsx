"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Props = {
  children: ReactNode;
};

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default function ThemeProvider({ children }: Props) {
  const [isDark, setIsDark] = useState(false);
	useEffect(() => {
		setIsDark(JSON.parse(localStorage?.getItem('isdark') ?? 'true'));
	}, []);

	const toggleTheme = () => {
		setIsDark(!isDark);
		localStorage.setItem('isdark', JSON.stringify(!isDark));
	};

  const theme = {
    isDark,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
