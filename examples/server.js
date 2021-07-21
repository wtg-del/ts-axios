const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');

const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false,
  },
}));

app.use(webpackHotMiddleware(compiler));

app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();

router.get('/simple/get', function(req, res) {
  res.json(req.query);
});

router.get('/base/get', function(req, res) {
  res.json(req.query);
});

router.post('/base/post', function(req, res) {
  res.json(req.body);
});

router.post('/base/buffer', function(req, res) {
  let msg = [];
  req.on('data', chunk => {
    if (chunk) msg.push(chunk);
  });

  req.on('end', () => {
    let buf = Buffer.concat(msg);
    res.json(buf.toJSON());
  });
});

router.get('/error/get', function(req, res) {
  if (Math.random() > 0.5) {
    res.json({ msg: 'hello world' });
  } else {
    res.status(500);
    res.end();
  }
});

router.get('/error/timeout', function(req, res) {
  setTimeout(() => {
    res.json({ msg: 'hello world' });
  }, 3000);
});

['get', 'post', 'delete', 'head', 'options', 'put', 'patch'].forEach(m => {
  router[m](`/extend/${m}`, function(req, res) {
    res.json({ msg: 'hello world' });
  });
});

router.get('/extend/user', function(req, res) {
  res.json({
    code: 0,
    message: 'ok',
    result: {
      name: 'jack',
      age: 18,
    }
  })
});

router.get('/interceptor/get', function(req, res) {
  res.json({ msg: 'hello world' });
});

router.post('/config/post', function(req, res) {
  res.json(req.body);
});

router.get('/cancel/get', function(req, res) {
  setTimeout(() => {
    res.json('hello world');
  }, 1000);
});

router.post('/cancel/post', function(req, res) {
  setTimeout(() => {
    res.json(req.body);
  }, 1000);
});

app.use(router);

const port = process.env.PORT || 8080;

module.exports = app.listen(port, () => {
  const url = ` http://localhost:${port}`;
  console.log(`Server listening on ${url}`);
});
