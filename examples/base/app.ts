import axios from '../../src';

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz'],
  },
});

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: { bar: 'baz' },
  },
});

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$，',
  },
});

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'bar',
    baz: null
  },
});

axios({
  method: 'get',
  url: '/base/get',
  params: {
    date: new Date(),
  },
});

axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'bar',
  },
});

axios({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'baz',
  },
});
