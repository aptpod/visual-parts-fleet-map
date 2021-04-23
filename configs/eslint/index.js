module.exports = {
  parser: '@babel/eslint-parser',
  plugins: ['@babel'],
  extends: [
    // base
    './plugins/eslint.js',
    // utils
    './plugins/unicorn.js',
    // import
    './plugins/import.js',
    // react
    './plugins/react.js',
    './plugins/react-hooks.js',
    './plugins/jsx-a11y.js',
    // webpack
    './plugins/import-resolver-webpack.js',
    // compatible
    // './plugins/compat.js',
    // prettier
    './plugins/prettier.js',
  ],
  parserOptions: {
    // @ts-ignore
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  env: {
    es2021: true,
    node: true,
    browser: true,
    commonjs: true,
  },
}
