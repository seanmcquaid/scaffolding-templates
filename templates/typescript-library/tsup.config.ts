import { esbuildPluginFilePathExtensions } from 'esbuild-plugin-file-path-extensions';
import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/**/*', '!src/**/*.test.ts', '!src/**/*.test.tsx'],
  esbuildPlugins: [
    esbuildPluginFilePathExtensions({
      cjsExtension: 'js',
      esmExtension: 'mjs',
    }),
  ],
  format: ['esm', 'cjs'],
});
