import axios, { AxiosError } from '../../src';

axios({
  url: '/error/get1',
}).then(res => {
  console.log(res);
}).catch((e: AxiosError) => {
  // console.log(e);
});

axios({
  url: '/error/get',
}).then(res => {
  console.log(res);
}).catch(e => {
  console.log(e);
  console.log(e.code);
  console.log(e.config);
  console.log(e.isAxiosError);
  console.log(e.isAxiosError);
  console.log(e.request);
  console.log(e.response);
  console.log(e.message);
});

axios({
  url: '/error/timeout',
  timeout: 2000,
}).then(res => {
  console.log(res);
}).catch(e => {
  // console.log(e);
});
