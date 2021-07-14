import axios from '../../src';

// axios({
//   method: 'delete',
//   url: '/extend/delete',
//   params: {
//     a: 1,
//     b: 2,
//   },
// });

// axios.get('/extend/get', { params: { aa: 1, bb: 2 } });

// axios.post('/extend/post', { aa: 1, bb: 2 })
// axios.options('/extend/options');
// axios.delete('/extend/delete');
// axios.head('/extend/head');
// axios.put('/extend/put');
// axios.patch('/extend/patch', { aa: 1, bb: 2 });

// axios({
//   url: '/extend/post',
//   data: { aa: 1, bb: 2 },
//   method: 'post',
// });

// axios('/extend/post', {
//   data: { aa: 1, bb: 22 },
//   method: 'post',
// })

interface Result<T> {
  result: T,
  code:  number,
  message: string;
};

axios.get<Result<{ name: string, age: number }>>('/extend/user', {
  data: { aa: 1, bb: 22 },
  method: 'post',
}).then(res => {
  console.log(res);

})
