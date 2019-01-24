const Koa = require('koa');
const app = new Koa();
const {AwesomeStatic} = require('..');

app.use(
  AwesomeStatic('public', {
    allowMethods: ['GET', 'HEAD', 'POST'],
    route: 'hello',
  }),
);

app.listen(8888);
