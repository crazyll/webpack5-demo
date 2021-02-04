import Koa from 'koa';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import Router from 'koa-router';
import koaStatic from 'koa-static';
import favicon from 'koa-favicon';

const app = new Koa();
const router = new Router();

app.use(koaStatic(
  path.resolve('public'), { // 静态文件所在目录
    maxage: 30 * 24 * 60 * 60 * 1000, // 指定静态资源在浏览器中的缓存时间
  },
));

app.use(koaStatic(
  path.resolve('dist'), { // 静态文件所在目录
    maxage: 30 * 24 * 60 * 60 * 1000, // 指定静态资源在浏览器中的缓存时间
  },
));

app.use(favicon('./favicon.ico'));

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response
router.get(/\/*/, async (ctx) => {
  ctx.type = 'html';
  ctx.body = fs.createReadStream('dist/index.html');

  const input = fs.createReadStream('dist/index.html');
  const hash = crypto.createHash('sha256');
  input.on('readable', () => {
    // 哈希流只会生成一个元素。
    const data = input.read();
    if (data) hash.update(data);
    else {
      ctx.response.etag = hash.digest('hex');
      console.log(`${ctx.response.etag}`);
    }
  });
});

app.use(router.routes());

app.listen(3000);
