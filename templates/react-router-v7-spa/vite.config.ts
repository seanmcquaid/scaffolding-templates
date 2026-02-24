import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { playwright } from '@vitest/browser-playwright';
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
    browser: {
      enabled: true,
      instances: [{ browser: 'chromium' }],
      provider: playwright(),
    },
    coverage: {
      exclude: [
        'app/utils/testing',
        'app/entry.client.tsx',
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
    },
    // circular.test.ts uses dpdm (a Node.js filesystem tool) that is incompatible with browser mode
    exclude: ['playwright', 'node_modules', 'app/__tests__/circular.test.ts'],
    globals: true,
    setupFiles: ['./app/utils/testing/setupTests.ts'],
  },
});

export default mergeConfig(viteConfig, vitestConfig);
