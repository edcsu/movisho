// src/components/ThemeToggle.tsx
import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDark, toggleDarkMode } = useTheme();

  return (
    <button
      type='button'
      onClick={toggleDarkMode}
      className="px-2 py-1 rounded border-1 border-gray-300 bg-white dark:bg-gray-800 text-black dark:text-white"
    >
      {isDark ? '🌞' : '🌙'}
    </button>
  );
};

export default ThemeToggle;
