module.exports = {
  env: {
    browser: true,
  },
  extends: ['airbnb'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline', { functions: 'never' }],
    'no-unused-vars': ['error', { ignoreRestSiblings: true }],
  },
};
