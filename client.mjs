import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import getWebpackConfig from './webpack.client.mjs';
import getSSRWebpackConfig from './webpack.server.mjs';

const ssr = true;
const dev = process.env.NODE_ENV === 'development' ? true : false;

function run() {
  let config;
  if (ssr) {
    config = getSSRWebpackConfig();
  } else {
    config = getWebpackConfig();
  }

  if (!dev) {
    webpack(config, (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(stats.toString({
        chunks: false,  // 使构建过程更静默无输出
        colors: true    // 在控制台展示颜色
      }));
    });
  } else {
    try {
      const compiler = webpack(config);

      const server = new WebpackDevServer(compiler, config.devServer)

      server.listen(9000, '127.0.0.1', () => {
        console.log('Starting server on http://localhost:9000');
      });
    } catch (e) {
      console.log(e)
    }
  }
}

run();
