module.exports = {
  extends: [
    'react-app',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:jest-dom/recommended',
    'plugin:react-hooks/recommended'
  ],
  plugins: ['react-hooks', 'jest-dom', 'testing-library'],
  settings: {
    react: {
      version: '999.999.999'
    }
  },
  overrides: [
    {
      // 3) Now we enable eslint-plugin-testing-library rules or preset only for matching files!
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react']
    }
  ]
};
