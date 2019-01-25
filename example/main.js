const Koa = require('koa');
const app = new Koa();
const static = require('..');

app.use(
  static('public', {
    allowMethods: ['GET', 'HEAD', 'POST'],
    route: 'hello',
  }),
);

app.listen(8888);
