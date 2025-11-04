import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { TranslationProvider } from './contexts/TranslationContext';
import './styles.css';

// Restore document direction and theme immediately on page load
const restoreDirection = () => {
  const storedDirection = localStorage.getItem('preferred_direction');
  const storedLang = localStorage.getItem('preferred_language');
  
  if (storedDirection && storedLang) {
    document.documentElement.dir = storedDirection;
    document.documentElement.lang = storedLang;
  }
};

// Apply dark mode class to HTML element for Tailwind dark mode
const applyThemeClass = () => {
  const storedTheme = localStorage.getItem('chatbot-theme-mode');
  if (storedTheme) {
    try {
      const theme = JSON.parse(storedTheme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch {
      // If parsing fails, default to dark
      document.documentElement.classList.add('dark');
    }
  } else {
    // Default to dark mode
    document.documentElement.classList.add('dark');
  }
};

// Apply direction and theme before React renders
restoreDirection();
applyThemeClass();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <TranslationProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TranslationProvider>
  </StrictMode>
);
