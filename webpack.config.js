import path from 'path';
import webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// const ManifestPlugin = require('webpack-manifest-plugin');

// import babelConfig from './babel.config.json';

const config = {
  mode: 'development',
  entry: [
    'react-hot-loader/patch',
    './src/client/app.jsx',
  ],
  target: 'web',
  devServer: {
    contentBase: path.join('dist'),
    port: 9000,
    hot: true,
    proxy: {
      '/': 'http://localhost:3000',
    },
    stats: 'errors-only',
    writeToDisk: (filePath) => /index\.html$/.test(filePath),
  },
  devtool: 'eval-source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
        },
        // vendors: {
        //   test: /[\\/]node_modules[\\/]/,
        //   name: 'vendors',
        //   chunks: 'all',
        // },
      },
    },
    // https://developers.google.com/web/fundamentals/performance/webpack/use-long-term-caching
    // https://www.jianshu.com/p/714ce38b9fdc
    runtimeChunk: 'single',
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/i,
        exclude: /node_modules/,
        use: [
          process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                // 回调必须返回 `local`，`global`，或者 `pure`
                mode: (resourcePath) => {
                  if (/pure.css$/i.test(resourcePath)) {
                    return 'pure';
                  }

                  if (/global.css$/i.test(resourcePath)) {
                    return 'global';
                  }

                  return 'local';
                },
                localIdentName: process.env.NODE_ENV === 'development' ? '[path][name]__[local]' : '[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                  ],
                ],
              },
            },
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [
              [
                "@babel/preset-env",
                {
                  "targets": {
                    "browsers": "> 0.25%, not dead",
                    "node": "current"
                  },
                  "useBuiltIns": "usage",
                  "corejs": {
                    "version": "3.8",
                    "proposals": true
                  }
                }
              ],
              "@babel/preset-react"
            ],
            "plugins": [
              "@babel/plugin-transform-runtime",
              "react-loadable/babel",
              "react-hot-loader/babel"
            ]
          },
        },
      },
    ],
  },
  plugins: [
    new ESLintPlugin({ threads: true }),
    new HtmlWebpackPlugin({
      template: './src/client/index.html',
      publicPath: './',
    }),
    // new ManifestPlugin(), // https://github.com/shellscape/webpack-manifest-plugin/issues/219
    new MiniCssExtractPlugin(),
    new webpack.EvalSourceMapDevToolPlugin({}),
    new CleanWebpackPlugin(),
  ],
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve('dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    symlinks: false,
    alias: {
      'react-dom': '@hot-loader/react-dom',
      'Component': path.resolve('./src/client/component'),
    }
  },
};

export default config;