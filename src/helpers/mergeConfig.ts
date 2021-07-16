import { AxiosRequestConfig } from '../types'
import { deepMerge, isPlainObject } from './util'

const strats: Record<string, (...args: any[]) => any> = {}

function defaultStrat(val1: any, val2: any): any {
  return typeof val2 === 'undefined' ? val1 : val2
}

function fromVal2Strat(_: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

const stratKeysFromVal2 = ['url', 'params', 'data']
stratKeysFromVal2.forEach(k => (strats[k] = fromVal2Strat))

const stratKeysDeepMerge = ['headers']
stratKeysDeepMerge.forEach(k => (strats[k] = deepMergeStrat))

export function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) config2 = {}

  const config: AxiosRequestConfig = {}

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string) {
    config[key] = (strats[key] || defaultStrat)(config1[key], config2![key])
  }

  return config
}
