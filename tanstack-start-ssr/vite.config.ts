import { defineConfig as defineViteConfig, mergeConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig as defineVitestConfig } from 'vitest/config';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

const viteConfig = defineViteConfig({
  plugins: [tsconfigPaths(), react(), svgr(), checker({ typescript: true })],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
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
        'app/i18n',
        'app/env.ts',
        'app/types',
        'app/assets',
        'app/styles',
      ],
    },
  },
});

export default mergeConfig(viteConfig, vitestConfig);
