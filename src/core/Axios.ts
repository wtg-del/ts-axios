import { mergeConfig } from '../helpers'
import {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  Axios as AxiosType,
  Method,
  ResolvedFn,
  RejectFn
} from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManger from './InterceptorManger'

interface Interceptors {
  request: InterceptorManger<AxiosRequestConfig>
  response: InterceptorManger<AxiosResponse>
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectFn
}

export default class Axios implements AxiosType {
  interceptors: Interceptors

  constructor(public defaults: AxiosRequestConfig) {
    this.interceptors = {
      request: new InterceptorManger<AxiosRequestConfig>(),
      response: new InterceptorManger<AxiosResponse>()
    }
  }

  private requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
    return this.request({ ...config, method, url })
  }

  private requestMethodWithData(
    method: Method,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) {
    return this.request({ ...config, method, url, data })
  }

  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) config = {}
      config.url = url
    } else {
      config = url
    }

    config = mergeConfig(this.defaults, config)

    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    return chain.reduce((acc, cur) => acc.then(cur.resolved, cur.rejected), Promise.resolve(config))
  }

  get(url: string, config: AxiosRequestConfig): AxiosPromise {
    return this.requestMethodWithoutData('get', url, config)
  }

  delete(url: string, config: AxiosRequestConfig): AxiosPromise {
    return this.requestMethodWithoutData('delete', url, config)
  }

  head(url: string, config: AxiosRequestConfig): AxiosPromise {
    return this.requestMethodWithoutData('head', url, config)
  }

  options(url: string, config: AxiosRequestConfig): AxiosPromise {
    return this.requestMethodWithoutData('options', url, config)
  }

  post(url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestMethodWithData('post', url, data, config)
  }

  put(url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestMethodWithData('put', url, data, config)
  }

  patch(url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestMethodWithData('patch', url, data, config)
  }
}
