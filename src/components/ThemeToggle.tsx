import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useLocalStorage('theme', true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('light-mode');
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors z-50"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-purple-400" />
      )}
    </button>
  );
};