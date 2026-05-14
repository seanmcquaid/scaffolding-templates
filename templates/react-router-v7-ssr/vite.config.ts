import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    tailwindcss(),
    !process.env.VITEST && reactRouter(),
    babel({
      babelConfig: {
        plugins: ['babel-plugin-react-compiler'],
        presets: ['@babel/preset-typescript'],
      },
      filter: /\.[jt]sx?$/,
    }),
    svgr(),
    checker({ typescript: true }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    open: true,
    port: 3000,
  },
  preview: {
    open: true,
    port: 3000,
  },
  test: {
    pool: 'threads',
    coverage: {
      exclude: [
        'app/utils/testing',
        'app/entry.client.tsx',
        'app/entry.server.tsx',
        'app/routes.ts',
        'app/i18n',
        'app/root.tsx',
        'app/env.ts',
        'app/types',
        'app/icons',
        'app/styles',
      ],
      include: ['app/**/*.ts', 'app/**/*.tsx'],
      provider: 'istanbul',
      reporter: ['lcov', 'json-summary'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80,
      },
    },
    environment: 'happy-dom',
    exclude: ['playwright', 'node_modules'],
    globals: true,
    setupFiles: ['./app/utils/testing/setupTests.ts'],
  },
});
