import React, { createContext, useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const ThemeContext = createContext();

export const ThemeProviderWrapper = ({ children }) => {
  const [mode, setMode] = useState('light');

  const theme = createTheme({
    palette: {
      mode,
      ...(mode === 'dark' && {
        background: { default: '#121212', paper: 'rgba(10, 25, 47, 0.85)' },
        text: { primary: '#ffffff', secondary: 'rgba(255,255,255,0.7)' },
      }),
      ...(mode === 'light' && {
        background: { default: '#f5f5f5', paper: 'rgba(240, 240, 240, 0.3)' },
        text: { primary: '#424242', secondary: 'rgba(0,0,0,0.6)' },
      }),
      primary: { main: '#10b981' },
      error: { main: '#dc3545' },
    },
  });

  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) setMode(savedMode);
  }, []);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};