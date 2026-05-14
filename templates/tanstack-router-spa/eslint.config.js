import { fixupPluginRules } from '@eslint/compat';
import importPlugin from 'eslint-plugin-import';
import js from '@eslint/js';
import pluginQuery from '@tanstack/eslint-plugin-query';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import i18next from 'eslint-plugin-i18next';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import playwright from 'eslint-plugin-playwright';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactPlugin from '@eslint-react/eslint-plugin';
import vitest from '@vitest/eslint-plugin';
import globals from 'globals';
import reactCompiler from 'eslint-plugin-react-compiler';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactPlugin.configs['recommended-typescript'],
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  ...pluginQuery.configs['flat/recommended'],
  jsxA11y.flatConfigs.recommended,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  i18next.configs['flat/recommended'],
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
      'react-compiler': reactCompiler,
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
      '@eslint-react/static-components': 'off',
      '@eslint-react/no-nested-component-definitions': 'off',
      'import/no-anonymous-default-export': 'off',
      'import/order': 'warn',
      'jsx-a11y/no-redundant-roles': 'off',
      'prefer-const': 'warn',
      'prettier/prettier': 'warn',
      '@typescript-eslint/no-namespace': 'off',
      'playwright/missing-playwright-await': 'off',
      '@typescript-eslint/consistent-type-definitions': ['error'],
      '@typescript-eslint/consistent-type-imports': 'error',
      'vitest/no-conditional-expect': 'off',
      'import/no-relative-parent-imports': 'warn',
      'react-compiler/react-compiler': 'error',
    },
  },
);
