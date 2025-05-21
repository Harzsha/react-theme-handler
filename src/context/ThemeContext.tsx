// ThemeContext.ts
import { createContext, useContext } from 'react';

export type Theme = 'light' | 'dark';
export type UserTheme = Theme | 'system';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: UserTheme) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
});

export const useTheme = (): ThemeContextType => useContext(ThemeContext);
