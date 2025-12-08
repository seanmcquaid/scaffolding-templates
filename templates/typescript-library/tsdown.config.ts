import { defineConfig } from 'tsdown';

export default defineConfig({
  clean: true,
  entry: ['src/**/*', '!src/**/*.test.ts', '!src/**/*.test.tsx'],
  unbundle: true,
  platform: 'neutral',
});
