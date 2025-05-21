import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: 'src',
      entryFileNames: 'cjs/[name].cjs'
    },
    {
      dir: 'dist',
      format: 'es',
      exports: 'named',
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: 'src',
      entryFileNames: 'esm/[name].js'
    },
  ],
  plugins: [
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
      declarationDir: 'dist/types', // ✅ Now safely inside 'dist'
      rootDir: 'src',
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
