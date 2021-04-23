module.exports = {
  plugins: ['jsx-a11y'],
  extends: ['plugin:jsx-a11y/recommended'],
  rules: {
    'jsx-a11y/no-autofocus': 'off',
    'jsx-a11y/label-has-for': [
      'error',
      {
        allowChildren: true,
      },
    ],
  },
}
