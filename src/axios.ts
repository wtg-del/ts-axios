import Axios from './core/Axios';
import { AxiosInstance, AxiosRequestConfig } from './types';
import { extend } from './helpers';
import defaults from './defaults';

function createIntance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config);
  const intance = Axios.prototype.request.bind(context);
  extend(intance, context);
  return intance as AxiosInstance;
};

const axios = createIntance(defaults);

export default axios;
