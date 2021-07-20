import Axios from './core/Axios'
import { AxiosRequestConfig, AxiosStatic } from './types'
import { extend, mergeConfig } from './helpers'
import defaults from './defaults'

function createIntance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const intance = Axios.prototype.request.bind(context)
  extend(intance, context)
  return intance as AxiosStatic
}

const axios = createIntance(defaults)

axios.create = function(config) {
  return createIntance(mergeConfig(defaults, config))
}

export default axios
