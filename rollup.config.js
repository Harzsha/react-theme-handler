import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import del from 'rollup-plugin-delete'; // For cleaning dist folder

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      exports: 'named',
      sourcemap: production, // Only in production
      sourcemapExcludeSources: true, // Critical fix
      preserveModules: true,
      preserveModulesRoot: 'src',
      entryFileNames: 'cjs/[name].cjs'
    },
    {
      dir: 'dist',
      format: 'es',
      exports: 'named',
      sourcemap: production,
      sourcemapExcludeSources: true,
      preserveModules: true,
      preserveModulesRoot: 'src',
      entryFileNames: 'esm/[name].js'
    },
  ],
  plugins: [
    del({ targets: 'dist/*' }), // Clean dist before build
    peerDepsExternal(),
    resolve({
      browser: true,
      dedupe: ['react', 'react-dom'],
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    commonjs(),
    postcss({
      modules: false,
      extract: true,
      minimize: production
    }),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist/types',
      rootDir: 'src',
      sourceMap: production, // Match Rollup's setting
      inlineSources: false, // Prevents source file references
      composite: false,
      exclude: [
        '**/*.stories.tsx',
        '**/*.test.tsx',
        '**/__tests__/**',
        '**/__mocks__/**'
      ]
    }),
    production && terser()
  ].filter(Boolean)
};