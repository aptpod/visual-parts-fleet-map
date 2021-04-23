const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const dotenv = require('dotenv')
const { formatHowToUseDevPluginURLs } = require('./webpack.utils')

dotenv.config()

/** @type import('webpack').Configuration */
module.exports = {
  mode: 'development',
  cache: true,
  entry: {
    app: path.join(__dirname, 'src/entrypoint/index.ts'),
  },
  output: {
    path: path.join(__dirname, 'debug'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      src: path.join(__dirname, 'src'),
      'storybook/src': path.join(__dirname, '.storybook/src'),
    },
  },
  node: {
    fs: 'empty',
    Buffer: false,
  },
  module: {
    rules: [
      // js(x) or ts(x)
      {
        test: /\.([jt])sx?$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.([jt])sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      // mjs
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      // font
      {
        test: /\.((otf|ttf|woff|woff2)$)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path]/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /reboot\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      // images
      {
        test: /\.((svg|png|jpg|jpeg|webp)$)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path]/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  target: 'web',
  devtool: 'cheap-source-map',
  plugins: [
    new ProgressBarPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
    }),
    {
      i: 0,
      apply(compiler) {
        compiler.hooks.afterEmit.tap('ShowMessagePlugin', (compilation) => {
          if (this.i++ !== 0) {
            return
          }
          setTimeout(() => {
            const pluginURLs = Object.keys(compilation.options.entry).map(
              (entry) => {
                return `http://localhost:8080/${entry}.js`
              },
            )
            formatHowToUseDevPluginURLs(pluginURLs)
          }, 0)
        })
      },
    },
  ],
  devServer: {
    writeToDisk: true,
    contentBase: path.join(__dirname, 'debug'),
    port: 8080,
    compress: true,
    // dissable live reloading.
    inline: false,
  },
}
