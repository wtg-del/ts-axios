import axios from '../../src';

// document.cookie = 'a=b';

// axios.get('/more/get').then(res => console.log(res));

// axios.post('http://localhost:8088/more/server2', {}, {
//   withCredentials: true,
// }).then(res => console.log(res));


const instnce = axios.create({
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'X-XSRF-TOKEN-D',
});

instnce.get('/more/get').then(res => console.log(res));
