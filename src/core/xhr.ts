import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeader, AxiosError, isURLSameOrigin, isFormDate } from '../helpers'
import cookie from '../helpers/cookie'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      url,
      method = 'get',
      data = null,
      headers = {},
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfHeaderName,
      xsrfCookieName,
      onDownloadProgress,
      onUploadProgress
    } = config

    const request = new XMLHttpRequest()

    request.open(method.toUpperCase(), url!, true)

    configureRequest()
    addEvents()
    processHeaders()
    processCancel()

    request.send(data)

    function handleResponse(response: AxiosResponse): void {
      if (request.status >= 200 && request.status < 300) {
        resolve(response)
      } else {
        reject(
          AxiosError.createError(
            `Response failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }

    function configureRequest(): void {
      if (responseType) {
        request.responseType = responseType
      }

      if (timeout) {
        request.timeout = timeout
      }

      if (withCredentials) {
        request.withCredentials = withCredentials
      }
    }

    function addEvents(): void {
      request.onreadystatechange = function() {
        if (request.readyState !== 4 || request.status === 0) {
          return
        }

        const responseHeader = request.getAllResponseHeaders()
        const responseData = responseType !== 'text' ? request.response : request.responseText
        const response: AxiosResponse = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: parseHeader(responseHeader),
          config,
          request
        }

        handleResponse(response)
      }

      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }

      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }

      request.onerror = function() {
        reject(AxiosError.createError('Network Error', config, null, request))
      }

      request.ontimeout = function() {
        reject(
          AxiosError.createError(
            `Timout of ${timeout} ms exceeded`,
            config,
            'ECONNABORTED',
            request
          )
        )
      }
    }

    function processHeaders(): void {
      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName && xsrfHeaderName) {
        const xsrfVal = cookie.read(xsrfCookieName)
        if (xsrfVal) {
          headers[xsrfHeaderName] = xsrfVal
        }
      }

      if (isFormDate(data)) {
        delete headers['Content-Type']
      }

      Object.keys(headers).forEach(name => {
        if (name === 'content-type' && data == null) {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    function processCancel(): void {
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }
    }
  })
}
