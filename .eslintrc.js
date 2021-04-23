/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    './configs/eslint',
    './configs/eslint/typescript',
    './configs/eslint/jest',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.dev.js',
      },
    },
    polyfills: ['document.querySelector'],
  },
  globals: {
    suite: true,
    benchmark: true,
    __DEVELOPMENT__: true,
    __DEVTOOLS__: true,
  },
  root: true,
  rules: {},
}
