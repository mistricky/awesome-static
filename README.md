# Awesome-Static

Koa static file serving middleware base on [`koa-send`](https://github.com/koajs/send).

## Feature

Some new features compared to koa-static.

- :monkey:Set the route map to static file directory
- :sunny:More than `GET` and `HEAD`
- :coffee:Develop with Typescript

## Installation

#### npm

```
npm install awesome-static
```

#### yarn

```
yarn add awesome-static
```

## Usage

```javascript
const Koa = require('koa');
const {AwesomeStatic} = require('awesome-static');
const app = new Koa();

app.use(
  AwesomeStatic('public', {
    allowMethods: ['GET', 'HEAD', 'POST'],
    route: 'hello',
  }),
);

app.listen(8080);
```

See `/example`.

## API

```javascript
AwesomeStatic(root, options)
```

- `root` root directory string. nothing above this root directory can be served (Type: `string`).
- `options` options object (Type:`AwesomeOptions`).

#### [Type] AwesomeOptions

Extends options from `koa-static`

- `route` route for mapping to a static server (Type:`string`).
- `allowMethods` HTTP method for allow access static file (Type:`HTTPMethod`).

#### [Type] HTTPMethod

`GET` | `HEAD` | `POST` | `PUT` | `DELETE`

## License

MIT
