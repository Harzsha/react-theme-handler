import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';

// Environment checks
const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist/cjs',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: 'src',
      entryFileNames: '[name].cjs'
    },
    {
      dir: 'dist/esm',
      format: 'esm',
      exports: 'named',
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: 'src',
      entryFileNames: '[name].js'
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true,
      dedupe: ['react', 'react-dom']
    }),
    commonjs({
      include: /node_modules/,
      exclude: ['**/*.stories.tsx', '**/*.test.tsx']
    }),
    postcss({
      modules: false,
      extract: true,
      minimize: production,
      config: false
    }),
    typescript({
      tsconfig: './tsconfig.json',
      exclude: [
        '**/*.stories.tsx',
        '**/*.test.tsx',
        '**/__tests__/**',
        '**/__mocks__/**'
      ],
      declaration: true,
      declarationDir: 'dist/types',
      rootDir: 'src',
      composite: false,
      inlineSources: !production
    }),
    production && terser({
      format: {
        comments: false
      },
      compress: {
        drop_console: true
      }
    })
  ].filter(Boolean),
  watch: {
    clearScreen: false,
    include: 'src/**'
  }
};