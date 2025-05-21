import { Theme } from "../provider/types";

export const getSystemTheme = (): Theme => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };
  
  export const applyTheme = (theme: Theme) => {
    document.documentElement.setAttribute('data-theme', theme);
  };