// @ts-check
import { fixupConfigRules } from '@eslint/compat';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactNativePlugin from 'eslint-plugin-react-native';
import i18nextPlugin from 'eslint-plugin-i18next';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import noRelativeImportPathsPlugin from 'eslint-plugin-no-relative-import-paths';
import tanstackQueryPlugin from '@tanstack/eslint-plugin-query';
import globals from 'globals';

export default [
  { ignores: ['.expo/**', 'node_modules/**', 'coverage/**', 'build/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules([
    {
      plugins: {
        react: reactPlugin,
        'react-hooks': reactHooksPlugin,
        'react-native': reactNativePlugin,
        i18next: i18nextPlugin,
        import: importPlugin,
        'jsx-a11y': jsxA11yPlugin,
        'no-relative-import-paths': noRelativeImportPathsPlugin,
        '@tanstack/query': tanstackQueryPlugin,
        prettier,
      },
      languageOptions: {
        globals: {
          ...globals.es2021,
          ...globals.node,
          ...globals.jest,
        },
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          ecmaVersion: 'latest',
          sourceType: 'module',
        },
      },
      settings: {
        react: {
          version: 'detect',
        },
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
            project: './tsconfig.json',
          },
        },
      },
      rules: {
        // React rules
        ...reactPlugin.configs.recommended.rules,
        ...reactHooksPlugin.configs.recommended.rules,
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',

        // React Native rules
        ...reactNativePlugin.configs.all.rules,
        'react-native/no-unused-styles': 'warn',
        'react-native/split-platform-components': 'warn',
        'react-native/no-inline-styles': 'warn',
        'react-native/no-color-literals': 'warn',

        // TypeScript rules
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/prefer-const': 'error',

        // Import rules
        'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
            ],
            'newlines-between': 'always',
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
          },
        ],
        'no-relative-import-paths/no-relative-import-paths': [
          'warn',
          { allowSameFolder: true, rootDir: '.' },
        ],

        // i18n rules
        'i18next/no-literal-string': [
          'error',
          {
            markupOnly: true,
            ignoreAttribute: ['testID', 'accessibilityLabel'],
          },
        ],

        // TanStack Query rules
        ...tanstackQueryPlugin.configs.recommended.rules,

        // Accessibility rules
        ...jsxA11yPlugin.configs.recommended.rules,

        // Prettier
        'prettier/prettier': 'error',
      },
    },
  ]),
  {
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    rules: {
      'i18next/no-literal-string': 'off',
    },
  },
];
