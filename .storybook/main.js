const path = require('path')
const webpack = require('webpack')

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-actions/register', 'storycap/register'],
  webpackFinal: async (config /*, { configType } */) => {
    config.node = {
      fs: 'empty',
      __dirname: true,
      __filename: true,
    }

    config.resolve = {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        src: path.join(__dirname, '../src'),
        'storybook/src': path.join(__dirname, './src'),
      },
    }

    config.module.rules = config.module.rules
      // Remove default CSS loader
      .filter((rule) => !rule.test.toString().includes('.css'))
      .reduce((acc, rule) => [...acc, rule], [
        // add CSS Modules loader
        {
          test: /\.css$/,
          exclude: /reboot\.css$/,
          use: [
            'style-loader',
            {
              loader: 'dts-css-modules-loader',
              options: {
                namedExport: true,
              },
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: {
                  mode: 'local',
                  localIdentName: '[folder]__[local]__[hash:base64:5]',
                },
                importLoaders: 1,
              },
            },
            'postcss-loader',
          ],
        },
        // add reboot.css loader
        {
          test: /reboot\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ])

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
        __DEVELOPMENT__: true,
        __DEVTOOLS__: true,
      }),
    )

    return config
  },
}
