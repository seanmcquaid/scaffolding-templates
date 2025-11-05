import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig as defineViteConfig, mergeConfig } from 'vite';
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
    TanStackRouterVite({
      routeFileIgnorePattern: '.*\\.test\\.tsx',
    }),
    react(),
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
    coverage: {
      exclude: [
        'src/utils/testing',
        'src/i18n',
        'src/env.ts',
        'src/types',
        'src/assets',
        'src/styles',
      ],
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      provider: 'istanbul',
      reporter: ['lcov'],
    },
    environment: 'happy-dom',
    exclude: ['playwright', 'node_modules'],
    globals: true,
    setupFiles: ['./src/utils/testing/setupTests.ts'],
  },
});

export default mergeConfig(viteConfig, vitestConfig);
