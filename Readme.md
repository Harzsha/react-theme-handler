# 🌗 react-theme-handler

[![npm version](https://img.shields.io/npm/v/react-theme-handler.svg?style=flat)](https://www.npmjs.com/package/react-theme-handler)
[![bundle size](https://img.shields.io/bundlephobia/minzip/react-theme-handler)](https://bundlephobia.com/package/react-theme-handler)
[![license](https://img.shields.io/npm/l/react-theme-handler)](https://github.com/Harzsha/react-theme-switcher/blob/main/LICENSE)
[![CI Status](https://github.com/yourusername/react-theme-handler/actions/workflows/ci.yml/badge.svg)](https://github.com/Harzsha/react-theme-switcher/actions)

A lightweight, performant theme switcher for React applications with system preference detection and CSS variables support.

![Demo Animation](https://raw.githubusercontent.com/yourusername/react-theme-handler/main/docs/demo.gif)

## ✨ Features

- 🌓 **Three theme modes**: Light, Dark, and System preference
- 🎨 **CSS Variables based**: Bring your own theme definitions
- ⚡ **Optimized**: Zero dependencies, ~2KB gzipped
- 💾 **Persistent**: Automatically saves user preference
- 📱 **Responsive**: Syncs with system color scheme changes
- ⚛️ **React 18+ Ready**: Works with all modern React versions
- 🏷 **TypeScript Support**: Full type definitions included
- 🖥 **SSR Compatible**: Works with Next.js, Remix, etc.

## 📦 Installation

```bash
# npm
npm install react-theme-handler

# yarn
yarn add react-theme-handler

# pnpm
pnpm add react-theme-handler
```

## 🎨 Theme Configuration

```css
/* styles/theme.css */
:root[data-theme="light"] {
  --bg: #ffffff;
  --text: #333333;
  --primary: #2563eb;
  --primary-hover: #1d4ed8;
  --border: #e2e8f0;
  --card-bg: #f8fafc;
  --error: #dc2626;
}

:root[data-theme="dark"] {
  --bg: #1a1a1a;
  --text: #f8f8f8;
  --primary: #3b82f6;
  --primary-hover: #2563eb;
  --border: #2d3748;
  --card-bg: #1e293b;
  --error: #ef4444;
}
```

## � Wrap Your Application

### Basic Setup (Client-side)

```tsx
import { ThemeProvider } from 'react-theme-handler';
import './styles/theme.css';

function App() {
  return (
    <ThemeProvider
      defaultTheme="system"
      storageKey="app-theme"
    >
      <MainContent />
    </ThemeProvider>
  );
}
```

### Advanced Setup (Next.js)

```tsx
// _app.tsx
import { ThemeProvider } from 'react-theme-handler';
import '../styles/theme.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider
      defaultTheme="system"
      storageKey="next-theme"
      ssr={true}
    >
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

## 🎮 Using the Hook

```tsx
import { useThemeSwitcher } from 'react-theme-handler';

function ThemeToggle() {
  const { theme, setTheme, isSystem } = useThemeSwitcher();

  return (
    <div>
      <button onClick={() => setTheme('light')} disabled={theme === 'light'}>
        Light
      </button>
      <button onClick={() => setTheme('dark')} disabled={theme === 'dark'}>
        Dark
      </button>
      <button onClick={() => setTheme('system')} disabled={isSystem}>
        System
      </button>
    </div>
  );
}
```

## 🛠 API Reference

| Prop         | Type                | Default   | Description                                                                 |
|--------------|---------------------|-----------|-----------------------------------------------------------------------------|
| defaultTheme | 'light'\|'dark'\|'system' | 'light'   | Default theme if no preference exists                                      |
| storageKey   | string              | 'theme'   | localStorage key                                                           |
| ssr          | boolean             | false     | Enable SSR support                                                         |

## 🤝 Contributing
1. Fork the repository.  
2. Create a branch (`git checkout -b feature/your-feature`).  
3. Commit changes (`git commit -am 'Add feature'`).  
4. Push (`git push origin feature/your-feature`).  
5. Open a PR.

## 📜 License
MIT © [Harzsha](https://github.com/Harzsha)