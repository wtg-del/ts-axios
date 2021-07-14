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

export interface AxiosRequestConfig {
  url: string;
  method?: Method;
  data?: Record<string, unknown>;
  params?: Record<string, unknown>;
}
