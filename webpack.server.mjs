import path from 'path';
import webpack from "webpack";
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import nodeExternals from 'webpack-node-externals';

const dev = process.env.NODE_ENV === 'development' ? true : false;

const plugins = [
  new webpack.DefinePlugin({
    '__isBrowser__': false //eslint-disable-line
  })
]

const config = {
  mode: dev ? "development" : "production",
  // context: path.resolve(),
  entry: {
    app: "./src/client/app.jsx",
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].[chunkhash:8].js',
  },
  target: 'node',
  externals: nodeExternals({
    allowlist: [/\.(css|less|sass|scss)$/, /^antd.*?css/],
    modulesDir: process.cwd(),
  }),
  module: {
    rules: [
      {
        test: /\.(css|less)$/i,
        use: [
          process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              import: true,
              importLoaders: 1,
              modules: {
                // 回调必须返回 `local`，`global`，或者 `pure`
                mode: (resourcePath) => {
                  if (/pure.css$/i.test(resourcePath)) {
                    return 'pure';
                  }

                  if (/global.css$/i.test(resourcePath) || /node_modules/.test(resourcePath)) {
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
                  ["postcss-preset-env", { stage: 0 }],
                  ['autoprefixer']
                ],
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              }
            }
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          // options: getBabelConfig(dev),
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    symlinks: false,
    alias: {
      '@': path.resolve('./src/client'),
    }
  },
  plugins: [
    ...plugins,
    new CleanWebpackPlugin(),
  ],
};


export default function getServerSideConfig() {
  return config;
}