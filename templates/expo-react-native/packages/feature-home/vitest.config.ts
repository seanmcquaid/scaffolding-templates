import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.test.tsx', 'src/**/*.test.ts'],
    setupFiles: ['./test-setup.ts'],
  },
});
