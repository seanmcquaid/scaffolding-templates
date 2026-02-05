import { defineConfig } from 'tsdown';

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/**/*', '!src/**/*.test.ts', '!src/**/*.test.tsx'],
  platform: 'neutral',
  unbundle: true,
});
