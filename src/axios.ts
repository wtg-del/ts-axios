import Axios from './core/Axios'
import { AxiosRequestConfig, AxiosStatic } from './types'
import { extend, mergeConfig } from './helpers'
import defaults from './defaults'
import Cancel, { isCancel } from './cancel/Cancel'
import CancelToken from './cancel/CancelToken'

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

axios.isCancel = isCancel
axios.CancelToken = CancelToken
axios.Cancel = Cancel

export default axios
