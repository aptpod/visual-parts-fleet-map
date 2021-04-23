const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

require('dotenv').config()

/**
 * BASE_URL to be published on the Web
 */
const BASE_URL = process.env.BASE_URL ?? ''

/**
 * license information
 */
const LICENSE_TEXT = `For license information please see ${BASE_URL}licenses.txt`

/** @type import('webpack').Configuration */
module.exports = {
  mode: 'production',
  cache: false,
  entry: {
    app: path.join(__dirname, 'src/entrypoint/index.ts'),
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      src: path.join(__dirname, 'src'),
    },
  },
  node: {
    fs: 'empty',
    Buffer: false,
  },
  module: {
    rules: [
      // ts or tsx
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
      {
        test: /reboot\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      // font
      {
        test: /\.((otf|ttf|woff|woff2)$)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './font.[hash].[ext]',
            },
          },
        ],
      },
      // images
      {
        test: /\.((svg|png|jpg|jpeg|webp)$)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './img.[hash].[ext]',
            },
          },
          'image-webpack-loader',
        ],
      },
    ],
  },
  target: 'web',
  devtool: false,
  optimization: {
    minimizer: [
      // 圧縮
      new TerserPlugin({
        cache: false,
        parallel: true,
        terserOptions: {
          output: {
            comments: false,
          },
          compress: {
            drop_console: true,
            inline: false,
          },
        },
        extractComments: {
          // append license message
          condition: true,
          banner: () => LICENSE_TEXT,
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  plugins: [
    new ProgressBarPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
    }),
    new MiniCssExtractPlugin({
      filename: 'c.[chunkhash].css',
      chunkFilename: 'c.[chunkhash].css',
    }),
    process.platform !== 'linux'
      ? new BundleAnalyzerPlugin({
          analyzerMode: 'static',
        })
      : undefined,
  ].filter((v) => v),
  performance: {
    hints: 'warning',
  },
}
