import path from 'path';
import webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CssMinimizerPlugin from "css-minimizer-webpack-plugin"; // 对CSS进行压缩

const dev = process.env.NODE_ENV === 'development' ? true : false;
const PUBLIC_PATH = "/";

const clientConfig = {
  mode: dev ? 'development' : 'production',
  entry: [
    './src/client/app.jsx',
  ],
  target: 'web',
  devtool: dev ? 'eval-source-map' : false,
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
  plugins: [
    new ESLintPlugin({ threads: true }),
    new HtmlWebpackPlugin({
      template: './src/views/index.html',
      publicPath: './',
    }),
    new WebpackManifestPlugin(), // https://github.com/shellscape/webpack-manifest-plugin/issues/219
    new MiniCssExtractPlugin(),
    new webpack.EvalSourceMapDevToolPlugin({}),
    new CleanWebpackPlugin(),
    dev && new ReactRefreshPlugin(),
  ],
  output: {
    path: path.resolve('dist'),
    publicPath: PUBLIC_PATH, // 在生成的html中，文件的引入路径会相对于此地址，生成的css中，以及各类图片的URL都会相对于此地址
    filename: '[name].[chunkhash:8].js',
  },
};


export default function getWebpackConfig() {
  const config = defaultConfig;
  if (dev) {
    config.plugins.push();
  }
  if (!dev) {
    config.optimization = optimization;
  }
  return config;
}