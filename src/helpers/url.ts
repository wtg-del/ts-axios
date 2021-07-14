import { isDate, isPlainObject } from './util';

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params?: any): string {
  if (!params || !isPlainObject(params)) return url;

  const parts: string[] = [];

  Object.entries(params).forEach(([key, val]) => {
    if (val === null  || typeof val === 'undefined') return;

    let vals: unknown[] = [];

    if (Array.isArray(val)) {
      vals = val;
      key += '[]';
    } else {
      vals = [val];
    }

    vals.forEach(it => {
      if (isDate(it)) {
        it = it.toISOString();
      } else if (isPlainObject(it)) {
        it = JSON.stringify(it);
      }

      parts.push(`${encode(key)}=${encode(String(it))}`)
    });

  });

  const serializedParams = parts.join('&');

  if (serializedParams) {
    const markIndex = url.indexOf('#');
    if (markIndex !== -1) {
      url = url.slice(0, markIndex);
    }

    url += (url.includes('?') ? '&' : '?') + serializedParams;
  }

  return url;
}

