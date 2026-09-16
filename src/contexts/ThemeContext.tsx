/**
 * Theme Context
 * Provides theme state and toggle functionality throughout the app
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import { ThemeMode, getAntdTheme, themes } from '../config/theme';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'app-theme';

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    // Get theme from localStorage or default to light
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode;
    
    // Validate saved theme - if it's not a valid theme mode, default to 'light'
    // Dynamic validation - automatically updates when new themes are added
    const validThemes = Object.keys(themes) as ThemeMode[];
    if (savedTheme && validThemes.includes(savedTheme)) {
      return savedTheme;
    }
    
    // Invalid or missing theme, default to light and clear localStorage
    localStorage.setItem(THEME_STORAGE_KEY, 'light');
    return 'light';
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    // Apply theme CSS variables to document root
    const colors = themes[theme] || themes.light; // Fallback to light theme
    const root = document.documentElement;
    
    root.style.setProperty('--theme-primary', colors.primary);
    root.style.setProperty('--theme-secondary', colors.secondary);
    root.style.setProperty('--theme-background', colors.background);
    root.style.setProperty('--theme-surface', colors.surface);
    root.style.setProperty('--theme-text', colors.text);
    root.style.setProperty('--theme-text-secondary', colors.textSecondary);
    root.style.setProperty('--theme-border', colors.border);
    root.style.setProperty('--theme-hover', colors.hover);
    root.style.setProperty('--theme-success', colors.success);
    root.style.setProperty('--theme-warning', colors.warning);
    root.style.setProperty('--theme-error', colors.error);
    root.style.setProperty('--theme-info', colors.info);

    // Add theme class to body for additional CSS targeting
    document.body.className = `theme-${theme}`;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <ConfigProvider theme={getAntdTheme(theme)}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
