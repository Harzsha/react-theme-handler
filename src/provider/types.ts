export type Theme = 'light' | 'dark';
export type UserTheme = Theme | 'system';

export interface ThemeContextType {
  theme: Theme;
  userTheme: UserTheme;
  isDarkMode: boolean;
  isSystemMode: boolean;
  setTheme: (theme: UserTheme) => void;
}

export interface ThemeProviderProps {
  defaultTheme?: UserTheme;
  storageKey?: string;
  children: React.ReactNode;
}