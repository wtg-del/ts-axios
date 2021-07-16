import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import {
  buildURL,
  tranformRequest,
  processHeaders,
  tranformResponse,
  flattenHeaders
} from '../helpers'
import xhr from './xhr'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return tranformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.headers = flattenHeaders(tranformHeader(config), config.method!)
  config.url = tranformURL(config)
  config.data = tranformRequestDate(config)
}

function tranformRequestDate(config: AxiosRequestConfig): any {
  return tranformRequest(config?.data)
}

function tranformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}

function tranformHeader(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function tranformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = tranformResponse(res.data)
  return res
}
