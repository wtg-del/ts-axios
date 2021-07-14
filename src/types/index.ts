export type Method =
'get' |
'GET' |
'delete' |
'DELETE' |
'head' |
'HEAD' |
'options' |
'OPTIONS' |
'post' |
'POST' |
'put' |
'PUT' |
'patch' |
'PATCH';


export type Header = Record<string, string>;

export interface AxiosRequestConfig {
  url?: string;
  method?: Method;
  data?: any;
  params?: any;
  headers?: Header;
  responseType?: XMLHttpRequestResponseType;
  timeout?: number;
};


export interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request: any;
};

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {

};

export interface AxiosError<T = any> extends Error {
  isAxiosError: boolean;
  config: AxiosRequestConfig;
  code?: string | number | null;
  request?: any;
  response?: AxiosResponse<T>;
};
export interface Axios {
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  post<T = any>(url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig): AxiosPromise<T>;
  put<T = any>(url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig): AxiosPromise<T>;
  patch<T = any>(url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig): AxiosPromise<T>;
};


export interface AxiosInstance extends Axios {
  <T = any>(config?: AxiosRequestConfig): AxiosPromise<T>;

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
};

