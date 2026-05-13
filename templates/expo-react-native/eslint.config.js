import { fixupPluginRules } from '@eslint/compat';
import importPlugin from 'eslint-plugin-import';
import js from '@eslint/js';
import pluginQuery from '@tanstack/eslint-plugin-query';
import tseslint from 'typescript-eslint';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import eslintConfigPrettier from 'eslint-config-prettier';
import i18next from 'eslint-plugin-i18next';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactPlugin from '@eslint-react/eslint-plugin';
import globals from 'globals';

export default [
  js.configs.recommended,
  ...pluginQuery.configs['flat/recommended'],
  ...tseslint.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  i18next.configs['flat/recommended'],
  reactPlugin.configs['recommended-typescript'],
  {
    plugins: {
      import: fixupPluginRules(importPlugin),
      'no-relative-import-paths': noRelativeImportPaths,
    },
    rules: {},
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-shadow': 'off',
      '@typescript-eslint/no-var-requires': 0,
      '@typescript-eslint/no-shadow': 'error',
      curly: ['warn', 'all'],
      '@eslint-react/static-components': 'off',
      '@eslint-react/no-nested-component-definitions': 'off',
      'import/no-anonymous-default-export': 'off',
      'import/order': 'warn',
      'jsx-a11y/no-redundant-roles': 'off',
      'prefer-const': 'warn',
      'prettier/prettier': 'warn',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/consistent-type-definitions': ['error'],
      '@typescript-eslint/consistent-type-imports': 'error',
      'no-relative-import-paths/no-relative-import-paths': [
        'warn',
        {
          allowSameFolder: true,
          rootDir: 'app',
          prefix: '@',
        },
      ],
    },
  },
  {
    ignores: [
      'node_modules',
      'build',
      '.expo',
      '.expo-shared',
      'dist',
      '*.d.ts',
    ],
  },
];
