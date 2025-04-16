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
  plugins: [
    tailwindcss(),
    tsconfigPaths(),
    reactRouterDevTools(),
    !process.env.VITEST && reactRouter(),
    babel({
      filter: /\.[jt]sx?$/,
      babelConfig: {
        presets: ['@babel/preset-typescript'],
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    svgr(),
    checker({ typescript: true }),
  ],
  build: {
    rollupOptions: {
      // This is to remove the MSW from ever being included in the production build
      external: id => id.includes('worker'),
    },
  },
  preview: {
    port: 3000,
    open: true,
  },
  server: {
    port: 3000,
    open: true,
  },
});

const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./app/utils/testing/setupTests.ts'],
    exclude: ['playwright', 'node_modules'],
    coverage: {
      provider: 'istanbul',
      reporter: ['lcov'],
      all: true,
      include: ['app/**/*.ts', 'app/**/*.tsx'],
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
    },
  },
});

export default mergeConfig(viteConfig, vitestConfig);
