import { fixupPluginRules } from '@eslint/compat';
import importPlugin from 'eslint-plugin-import';
import js from '@eslint/js';
import pluginQuery from '@tanstack/eslint-plugin-query';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import i18next from 'eslint-plugin-i18next';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import playwright from 'eslint-plugin-playwright';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import vitest from '@vitest/eslint-plugin';
import globals from 'globals';

export default [
  {
    ignores: ['./src/routeTree.gen.ts'],
  },
  js.configs.recommended,
  ...pluginQuery.configs['flat/recommended'],
  ...tseslint.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  i18next.configs['flat/recommended'],
  reactPlugin.configs.flat['jsx-runtime'],
  {
    ...vitest.configs.recommended,
    files: ['src/**'],
  },
  {
    ...playwright.configs['flat/recommended'],
    files: ['playwright/**'],
  },
  {
    plugins: {
      import: fixupPluginRules(importPlugin),
      'no-relative-import-paths': noRelativeImportPaths,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.serviceworker,
      },
    },
    rules: {
      'no-shadow': 'off',
      '@typescript-eslint/no-var-requires': 0,
      '@typescript-eslint/no-shadow': 'error',
      curly: ['warn', 'all'],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/prop-types': 'off',
      'import/no-anonymous-default-export': 'off',
      'import/order': 'warn',
      'jsx-a11y/no-redundant-roles': 'off',
      'prefer-const': 'warn',
      'prettier/prettier': 'warn',
      'react/jsx-uses-react': 'off',
      'react/jsx-key': 'warn',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-namespace': 'off',
      'react/no-unescaped-entities': 'off',
      'playwright/missing-playwright-await': 'off',
      '@typescript-eslint/consistent-type-definitions': ['error'],
      '@typescript-eslint/consistent-type-imports': 'error',
      'no-relative-import-paths/no-relative-import-paths': [
        'warn',
        {
          allowSameFolder: true,
          rootDir: 'src',
          prefix: '@',
        },
      ],
    },
  },
];
