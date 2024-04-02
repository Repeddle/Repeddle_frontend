import React, { ReactNode, createContext, useState, useEffect } from 'react';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

interface Props {
  children?: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const storedThemeMode = localStorage.getItem('isDarkMode');
  const initialThemeMode = storedThemeMode
    ? JSON.parse(storedThemeMode)
    : false;

  const [isDarkMode, setIsDarkMode] = useState<boolean>(initialThemeMode);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Update local storage whenever the theme mode changes
  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
