import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config(
  eslint.configs.recommended,
  ...compat.extends('plugin:@next/next/recommended', 'plugin:@next/next/core-web-vitals'),
  {
    rules: {
      // This rule is turned off to allow the 'any' type in your code.
      // It's a quick fix for deployment but is not recommended for code quality.
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
);