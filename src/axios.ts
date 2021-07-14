import Axios from './core/Axios';
import { AxiosInstance } from './types';
import { extend } from './helpers';

function createIntance(): AxiosInstance {
  const context = new Axios();
  const intance = Axios.prototype.request.bind(context);
  extend(intance, context);
  return intance as AxiosInstance;
};

const axios = createIntance();

export default axios;
