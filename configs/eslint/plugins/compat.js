module.exports = {
  plugins: ['compat'],
  extends: ['plugin:compat/recommended'],
  rules: {
    'class-methods-use-this': [
      'error',
      {
        exceptMethods: [
          // react life cycle methods
          'componentDidCatch',
          'componentDidMount',
          'componentDidUpdate',
          'componentWillMount',
          'componentWillReceiveProps',
          'componentWillUnmount',
          'componentWillUpdate',
          'constructor',
          'getSnapshotBeforeUpdate',
          'render',
          'shouldComponentUpdate',
          'UNSAFE_componentWillMount',
          'UNSAFE_componentWillReceiveProps',
          'UNSAFE_componentWillUpdate',
        ],
      },
    ],
  },
}
