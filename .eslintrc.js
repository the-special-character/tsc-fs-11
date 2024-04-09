module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@babel/eslint-parser',
  extends: [
    'airbnb',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
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
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['html'],
  rules: {
    'import/no-extraneous-dependencies': 0,
    'react/state-in-constructor': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'default-param-last': 0,
  },
};
