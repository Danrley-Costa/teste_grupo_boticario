module.exports = {
  env: {
    node: true,
    mocha: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    'consistent-return': 'off',
  },
};
