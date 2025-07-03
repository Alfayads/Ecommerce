import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
export default tseslint.config(
  // Global ignores
  {
    ignores: ['node_modules', 'dist', 'build/'],
  },

  // Base configurations applied to all files
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // React-specific configurations
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      // Enforce Rules of Hooks
      ...reactHooks.configs['recommended-latest'].rules,
      // Enforce accessibility best practices
      ...jsxA11y.configs.recommended.rules,
      // Ensure React components are correctly structured for Fast Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },

  // Configuration for import plugin
  {
    plugins: {
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
      'import/no-unresolved': 'error',
      // Enforce a consistent and logical order for imports
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
);