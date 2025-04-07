// src/hooks/useDarkMode.ts
import { useEffect, useState } from 'react';
import {
  getSystemTheme,
  getStoredTheme,
  setStoredTheme,
  applyTheme,
} from '../utils/darkMode';

type Theme = 'light' | 'dark';

export const useDarkMode = (): [boolean, () => void] => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const stored = getStoredTheme();
    if (stored) return stored === 'dark';
    return getSystemTheme() === 'dark';
  });

  const [manualOverride, setManualOverride] = useState<boolean>(() => {
    return getStoredTheme() !== null;
  });

  useEffect(() => {
    const theme: Theme = isDark ? 'dark' : 'light';
    applyTheme(theme);
    setStoredTheme(theme);
  }, [isDark]);

  useEffect(() => {
    if (!manualOverride && typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        setIsDark(e.matches);
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [manualOverride]);

  const toggleDarkMode = () => {
    setManualOverride(true);
    setIsDark((prev) => !prev);
  };

  return [isDark, toggleDarkMode];
};
