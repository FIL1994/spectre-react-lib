import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import storybook from 'eslint-plugin-storybook';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      'storybook-static/**',
      'node_modules/**',
      'coverage/**',
      '*.config.js',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  ...storybook.configs['flat/recommended'],
  prettier,
  {
    files: ['src/**/*.{ts,tsx,js,jsx}', '.storybook/**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      'no-plusplus': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'ts-essentials',
              message: 'Please use "import type {...} from "ts-essentials"".',
              allowTypeImports: true,
            },
          ],
        },
      ],
    },
  }
);
