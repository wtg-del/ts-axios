import { AxiosRequestConfig, Method } from "./types";

const defaults: AxiosRequestConfig = {
  method: 'get',

  timeout: 0,

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*',
    },
  },
};

const methodsNoData: Method[] =  ['delete', 'get', 'head', 'options'];
methodsNoData.forEach(method => {
  defaults.headers[method] = {};
});

const methoddWithData: Method[] = ['post', 'put', 'patch'];
methoddWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
});

export default defaults;
