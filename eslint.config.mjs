import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import pluginQuery from '@tanstack/eslint-plugin-query'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import nextPlugin from '@next/eslint-plugin-next'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: ['**/node_modules/**', '.next/**', 'dist/**']
  },
  ...compat.extends('next/core-web-vitals'),
  ...pluginQuery.configs['flat/recommended'],
  {
    plugins: {
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      '@next/next': nextPlugin
    },
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    }
  }
];

export default eslintConfig; 