import { isPlainObject } from './util';

export function tranformRequest(data?: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data);
  }

  return data;
};

export function tranformResponse(data: any): Record<string, unknown> {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch(e) {
      // do nothing
    }
  }
  return data;
}
