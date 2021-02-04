import path from 'path';
import webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import TerserPlugin from "terser-webpack-plugin"; // 对js进行压缩
import CssMinimizerPlugin from "css-minimizer-webpack-plugin"; // 对CSS进行压缩
import getBabelConfig from "./babel.config.js";

const dev = process.env.NODE_ENV === 'development' ? true : false;
const PUBLIC_PATH = "/";

const defaultConfig = {
  mode: dev ? 'development' : 'production',
  entry: [
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
                localIdentName: dev ? '[path][name]__[local]' : '[hash:base64:5]',
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
          options: getBabelConfig(dev),
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
    new WebpackManifestPlugin(), // https://github.com/shellscape/webpack-manifest-plugin/issues/219
    new MiniCssExtractPlugin(),
    new webpack.EvalSourceMapDevToolPlugin({}),
    new CleanWebpackPlugin(),
  ],
  output: {
    path: path.resolve('dist'),
    publicPath: PUBLIC_PATH, // 在生成的html中，文件的引入路径会相对于此地址，生成的css中，以及各类图片的URL都会相对于此地址
    filename: '[name].[chunkhash:8].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    symlinks: false,
    alias: {
      'Component': path.resolve('./src/client/component'),
    }
  },
};

const optimization =  {
  minimize: true,
  minimizer: [
    new TerserPlugin({
      parallel: true, // 多线程并行构建
      terserOptions: {
        // sourceMap: true,
        // https://github.com/terser/terser#minify-options
        compress: {
          warnings: false, // 删除无用代码时是否给出警告
          drop_debugger: true, // 删除所有的debugger
          // drop_console: true, // 删除所有的console.*
          pure_funcs: ["console.log"], // 删除所有的console.log
        },
      },
    }),
    new CssMinimizerPlugin(),
  ],
  splitChunks: {
    chunks: "all",
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all',
      },
    },
  },
};


export default function getWebpackConfig() {
  const config = defaultConfig;
  if (dev) {
    config.plugins.push(new ReactRefreshPlugin());
  }
  if (!dev) {
    config.optimization = optimization;
  }
  return config;
}