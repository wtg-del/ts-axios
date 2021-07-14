import { AxiosPromise, AxiosRequestConfig, Axios as AxiosType, Method } from '../types';
import dispatchRequest from './dispatchRequest';

export default class Axios implements AxiosType {
  private requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
    return this.request({ ...config, method, url });
  }

  private requestMethodWithData(method: Method, url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig) {
    return this.request({ ...config, method, url, data });
  }

  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url;
    } else {
      config = url;
    }
    return dispatchRequest(config);
  }

  get(url: string, config: AxiosRequestConfig): AxiosPromise {
    return this.requestMethodWithoutData('get', url, config);
  }

  delete(url: string, config: AxiosRequestConfig): AxiosPromise {
    return this.requestMethodWithoutData('delete', url, config);
  }

  head(url: string, config: AxiosRequestConfig): AxiosPromise {
    return this.requestMethodWithoutData('head', url, config);
  }

  options(url: string, config: AxiosRequestConfig): AxiosPromise {
    return this.requestMethodWithoutData('options', url, config);
  }

  post(url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestMethodWithData('post', url, data, config);
  }

  put(url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestMethodWithData('put', url, data, config);
  }

  patch(url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestMethodWithData('patch', url, data, config);
  }
}
