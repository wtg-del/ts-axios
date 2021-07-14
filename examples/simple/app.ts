import axios from '../../src';

axios({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2,
    c: [3, 4],
    d: { a: 1, b: 2}
  },
});
