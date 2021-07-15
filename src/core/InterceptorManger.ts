import { RejectFn, ResolvedFn, AxiosInterceptorManger } from '../types';

interface Interceptor<T> {
  resolved: ResolvedFn<T>;
  rejected?: RejectFn;
};

interface AxiosInterceptorWithForEach<T> extends AxiosInterceptorManger<T> {
  forEach(fn: (interceptor: Interceptor<T>) => void): void;
};

export default class InterceptorManger<T> implements AxiosInterceptorWithForEach<T> {
  constructor(
    private interceptors: (Interceptor<T> | null)[] = [],
  ) {};

  use(resolved: ResolvedFn<T>, rejected?: RejectFn) {
    this.interceptors.push({ resolved, rejected });
    return this.interceptors.length - 1;
  };

  eject(id: number) {
    if (this.interceptors[id]) {
      this.interceptors[id] = null;
    }
  };

  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor) fn(interceptor);
    });
  };
}
