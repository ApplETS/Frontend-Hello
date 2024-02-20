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
  isLight: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default function ThemeProvider({ children }: Props) {
  const [isLight, setIsLight] = useState(false);
	useEffect(() => {
		setIsLight(JSON.parse(localStorage?.getItem('isLight') ?? 'true'));
	}, []);

	const toggleTheme = () => {
		setIsLight(!isLight);
		localStorage.setItem('isLight', JSON.stringify(!isLight));
	};

  const theme = {
    isLight,
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
