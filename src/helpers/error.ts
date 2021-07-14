import { AxiosRequestConfig } from '../types';

export class AxiosError extends Error {
  isAxiosError: boolean = false;

  private constructor(
    public message: string,
    public config: AxiosRequestConfig,
    public code: string | null,
    public request: any,
    public response?: any,
  ) {
    super(message);
    this.isAxiosError = true;

    Object.setPrototypeOf(this, AxiosError.prototype);
  }

  static createError(
    message: string,
    config: AxiosRequestConfig,
    code: string | null,
    request: any,
    response?: any,
  ) {
    const error = new AxiosError(message, config, code, request, response);

    return error;
  }
}
