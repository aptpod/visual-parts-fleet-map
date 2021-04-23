module.exports = {
  plugins: ['react'],
  extends: ['plugin:react/recommended'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaFeatures: { jsx: true },
  },
  rules: {
    // enable additional rules
    'react/button-has-type': 'error',
    'react/jsx-no-bind': [
      'error',
      {
        ignoreDOMComponents: true,
      },
    ],
    'react/display-name': 'off',
    'react/forbid-component-props': 'off',
    'react/jsx-uses-react': 'off',
    'react/no-children-prop': 'error',
    'react/no-did-mount-set-state': 'error',
    'react/no-did-update-set-state': 'error',
    'react/no-redundant-should-component-update': 'error',
    'react/no-render-return-value': 'error',
    'react/no-this-in-sfc': 'error',
    'react/no-typos': 'error',
    'react/no-unused-state': 'error',
    'react/no-will-update-set-state': 'error',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/void-dom-elements-no-children': 'error',
    // , 'react/no-multi-comp': 'error'
  },
}
