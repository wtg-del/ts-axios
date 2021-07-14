import axios from '../../src';

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: ['bar', 'baz'],
//   },
// });

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: { bar: 'baz' },
//   },
// });

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: '@:$，',
//   },
// });

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: 'bar',
//     baz: null
//   },
// });

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     date: new Date(),
//   },
// });

// axios({
//   method: 'get',
//   url: '/base/get#hash',
//   params: {
//     foo: 'bar',
//   },
// });

// axios({
//   method: 'get',
//   url: '/base/get?foo=bar',
//   params: {
//     bar: 'baz',
//   },
// });

// axios({
//   method: 'post',
//   url: '/base/post',
//   data: {
//     a: 1,
//     b: 2,
//   }
// });

// axios({
//   method: 'post',
//   url: '/base/buffer',
//   data: new Int32Array([21, 31]),
// })

// axios({
//   method: 'post',
//   url: '/base/post',
//   data: {
//     a: 1,
//     b: 2,
//   },
//   headers: {
//     'content-type': 'application/json',
//     'Accept': 'application/json, text/plain, */*',
//   }
// });

// axios({
//   method: 'post',
//   url: '/base/post',
//   data: new URLSearchParams('q=URLUtils.searchParams&topic=api'),
// });

axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2,
  }
}).then(res => {
  console.log(res);
});

axios({
  method: 'post',
  url: '/base/post',
  responseType: 'json',
  data: {
    a: 1,
    b: 2,
  }
}).then(res => {
  console.log(res);
});
