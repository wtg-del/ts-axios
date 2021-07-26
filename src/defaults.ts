import { AxiosRequestConfig, Method } from './types'
import { processHeaders, tranformRequest, tranformResponse } from './helpers'

const defaults: AxiosRequestConfig = {
  method: 'get',

  timeout: 0,

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },

  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(headers, data)
      return tranformRequest(data)
    }
  ],

  transformResponse: [
    function(data: any): any {
      return tranformResponse(data)
    }
  ],

  xsrfCookieName: 'XSRF-TOKEN',

  xsrfHeaderName: 'X-XSRF-TOKEN'
}

const methodsNoData: Method[] = ['delete', 'get', 'head', 'options']
methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

const methoddWithData: Method[] = ['post', 'put', 'patch']
methoddWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
