module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: ['next/core-web-vitals', 'prettier', 'eslint:recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['prettier'],
  rules: {
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before'
          }
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ],
    'no-console': 1,
    'no-unused-vars': 1,
    'no-undef': 1,
    'prettier/prettier': 1,
    'react/prop-types': 0
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
