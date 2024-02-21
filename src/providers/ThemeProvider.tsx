import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  updateTheme: (newTheme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.dataset.theme = storedTheme;
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedTheme = localStorage.getItem('theme') as Theme | null;
      if (storedTheme && storedTheme !== theme) {
        setTheme(storedTheme);
        document.documentElement.dataset.theme = storedTheme;
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
