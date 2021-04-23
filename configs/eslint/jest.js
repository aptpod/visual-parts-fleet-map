module.exports = {
  plugins: ['jest'],
  env: {
    'jest/globals': true,
  },
  extends: ['plugin:jest/recommended'],
  rules: {
    'jest/valid-title': 'off',
    'jest/no-conditional-expect': 'off',
  },
}
