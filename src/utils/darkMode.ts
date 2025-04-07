// src/utils/darkMode.ts
type Theme = 'light' | 'dark';

const THEME_KEY = 'theme';

export const getSystemTheme = (): Theme => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

export const getStoredTheme = (): Theme | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(THEME_KEY) as Theme | null;
};

export const setStoredTheme = (theme: Theme) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(THEME_KEY, theme);
};

export const applyTheme = (theme: Theme) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.classList.remove('dark', 'light');
  root.classList.add(theme);
};
