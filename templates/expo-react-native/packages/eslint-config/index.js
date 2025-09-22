const { fixupConfigRules, fixupPluginRules } = require('@eslint/compat');
const js = require('@eslint/js');
const typescriptEslint = require('typescript-eslint');
const prettier = require('eslint-config-prettier');
const importPlugin = require('eslint-plugin-import');
const jsxA11y = require('eslint-plugin-jsx-a11y');
const prettierPlugin = require('eslint-plugin-prettier');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const i18next = require('eslint-plugin-i18next');
const vitest = require('@vitest/eslint-plugin');
const globals = require('globals');

module.exports = [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      '.expo/**',
      '*.d.ts',
      '**/*.config.{js,ts}',
      '**/coverage/**'
    ],
  },
  js.configs.recommended,
  ...fixupConfigRules(typescriptEslint.configs.recommended),
  prettier,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
      },
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: fixupPluginRules(react),
      'react-hooks': fixupPluginRules(reactHooks),
      'jsx-a11y': fixupPluginRules(jsxA11y),
      import: fixupPluginRules(importPlugin),
      i18next: fixupPluginRules(i18next),
      prettier: prettierPlugin,
      '@typescript-eslint': fixupPluginRules(typescriptEslint.plugin),
      vitest: fixupPluginRules(vitest),
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      ...i18next.configs.recommended.rules,
      
      // General rules
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-unused-vars': 'off', // Handled by TypeScript
      
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/prefer-const': 'error',
      
      // React rules
      'react/react-in-jsx-scope': 'off', // Not needed with React 17+
      'react/prop-types': 'off', // Using TypeScript
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      
      // i18n rules
      'i18next/no-literal-string': [
        'error',
        {
          markupOnly: true,
          ignoreAttribute: ['data-testid', 'testID'],
          ignoreCallee: ['console.log', 'console.warn', 'console.error'],
        },
      ],
      
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
          'newlines-between': 'never',
          alphabetize: {
            order: 'asc',
          },
        },
      ],
      
      // Prettier rules
      'prettier/prettier': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },
  {
    files: ['**/*.test.{js,jsx,ts,tsx}'],
    plugins: {
      vitest: fixupPluginRules(vitest),
    },
    rules: {
      ...vitest.configs.recommended.rules,
      'i18next/no-literal-string': 'off',
    },
  },
];