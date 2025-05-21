import React, { useEffect, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext.js';
import { UserTheme, Theme } from '../index.js';
import { getSystemTheme } from '../utils/themes.js';
import { ThemeProviderProps } from './types.js';

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  defaultTheme = 'system',
  storageKey = 'app-theme',
  children,
}) => {
  const [userTheme, setUserTheme] = useState<UserTheme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem(storageKey) as UserTheme) || defaultTheme;
    }
    return defaultTheme;
  });

  const [resolvedTheme, setResolvedTheme] = useState<Theme>(() => {
    return userTheme === 'system' ? getSystemTheme() : userTheme;
  });

  useEffect(() => {
    const updateTheme = () => {
      const systemTheme = getSystemTheme();
      const current = userTheme === 'system' ? systemTheme : userTheme;
      setResolvedTheme(current);
      document.documentElement.setAttribute('data-theme', current);
    };

    if (typeof window !== 'undefined') {
      updateTheme();
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      media.addEventListener('change', updateTheme);
      return () => media.removeEventListener('change', updateTheme);
    }
  }, [userTheme]);

  const setTheme = (theme: UserTheme) => {
    setUserTheme(theme);
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, theme);
    }
  };

  const value = {
    theme: resolvedTheme,
    userTheme,
    isDarkMode: resolvedTheme === 'dark',
    isSystemMode: userTheme === 'system',
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};