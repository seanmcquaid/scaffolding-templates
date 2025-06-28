import { fixupPluginRules } from '@eslint/compat';
import importPlugin from 'eslint-plugin-import';
import js from '@eslint/js';
import pluginQuery from '@tanstack/eslint-plugin-query';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import i18next from 'eslint-plugin-i18next';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import vitest from '@vitest/eslint-plugin';
import globals from 'globals';
import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactCompiler from 'eslint-plugin-react-compiler';

export default [
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
    files: ['app/**'],
  },
  {
    plugins: {
      import: fixupPluginRules(importPlugin),
      '@next/next': nextPlugin,
      'no-relative-import-paths': noRelativeImportPaths,
      'react-hooks': reactHooksPlugin,
      'react-compiler': reactCompiler,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
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
      'react-compiler/react-compiler': 'error',
    },
  },
];
