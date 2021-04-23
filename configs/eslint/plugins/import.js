module.exports = {
  plugins: ['import'],
  extends: ['plugin:import/recommended'],
  settings: {
    'import/ignore': ['node_modules'],
  },
  rules: {
    // static analysis
    'import/no-cycle': 'error',
    'import/no-unused-modules': 'error',
    'import/no-useless-path-segments': 'error',

    // helpful warnings
    // (no additional rules)

    // module systems
    // (no additional rules)

    // style guide
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-mutable-exports': 'error',
  },
}
