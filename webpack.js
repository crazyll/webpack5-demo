import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack.config.js';

const compiler = webpack(config
  //   , (err, stats) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }

  //   console.log(stats.toString({
  //     chunks: false,  // 使构建过程更静默无输出
  //     colors: true    // 在控制台展示颜色
  //   }));
  // }
);

const server = new WebpackDevServer(compiler, config.devServer)

server.listen(9000, '127.0.0.1', () => {
  console.log('Starting server on http://localhost:9000');
});