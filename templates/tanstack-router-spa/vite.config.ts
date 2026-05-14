import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    tailwindcss(),
    TanStackRouterVite({
      routeFileIgnorePattern: '.*\\.test\\.tsx',
    }),
    react(),
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
        'src/utils/testing',
        'src/entry.client.tsx',
        'src/entry.server.tsx',
        'src/routes.ts',
        'src/i18n',
        'src/root.tsx',
        'src/env.ts',
        'src/types',
        'src/icons',
        'src/styles',
      ],
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      provider: 'istanbul',
      reporter: ['lcov', 'json-summary'],
    },
    environment: 'happy-dom',
    exclude: ['playwright', 'node_modules'],
    globals: true,
    setupFiles: ['./src/utils/testing/setupTests.ts'],
  },
});
