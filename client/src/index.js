import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ThemeProviderWrapper } from './context/ThemeContext';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProviderWrapper>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProviderWrapper>
  </React.StrictMode>
);