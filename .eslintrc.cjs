module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/typescript',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'unused-imports',
    'simple-import-sort',
    'sort-exports',
    'import',
    'prettier',
  ],
  rules: {
    'react/jsx-uses-react': 0,
    'react/react-in-jsx-scope': 0,
    'import/no-duplicates': 'error',
    'unused-imports/no-unused-imports': ['warn', { vars: 'all' }],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          [
            '^react',
            '^\\w',
            '^@',
            '^redux',
            '^contexts',
            '^components',
            '^hooks',
            '^utils',
            '^routes',
            '^assets',
            '^',
            '^styles/.+\\.scss$',
            '^styles/.+\\.css$',
            '^.+\\.scss$',
            '^.+\\.css$',
          ],
        ],
      },
    ],
    'sort-exports/sort-exports': [
      'error',
      {
        sortDir: 'asc',
        pattern: '**/components/*.{ts,tsx}',
      },
    ],
  },
};
