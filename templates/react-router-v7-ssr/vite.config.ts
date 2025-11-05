import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { reactRouterDevTools } from 'react-router-devtools';
import { defineConfig as defineViteConfig, mergeConfig } from 'vite';
import babel from 'vite-plugin-babel';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig as defineVitestConfig } from 'vitest/config';

const viteConfig = defineViteConfig({
  build: {
    rollupOptions: {
      // This is to remove the MSW from ever being included in the production build
      external: id => id.includes('worker'),
    },
  },
  plugins: [
    tailwindcss(),
    tsconfigPaths(),
    reactRouterDevTools(),
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
  preview: {
    open: true,
    port: 3000,
  },
  server: {
    open: true,
    port: 3000,
  },
});

const vitestConfig = defineVitestConfig({
  test: {
    pool: 'threads',
    isolate: true,
    coverage: {
      exclude: [
        'app/utils/testing',
        'app/entry.client.tsx',
        'app/entry.server.tsx',
        'app/routes.ts',
        'app/i18n',
        'app/root.tsx',
        'app/env.client.ts',
        'app/env.server.ts',
        'app/types',
        'app/icons',
        'app/styles',
      ],
      include: ['app/**/*.ts', 'app/**/*.tsx'],
      provider: 'istanbul',
      reporter: ['lcov'],
    },
    environment: 'jsdom',
    exclude: ['playwright', 'node_modules'],
    globals: true,
    setupFiles: ['./app/utils/testing/setupTests.ts'],
  },
});

export default mergeConfig(viteConfig, vitestConfig);
