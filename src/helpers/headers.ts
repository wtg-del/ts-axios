// import a from 'axios';
import { isPlainObject } from './util';
import { Header } from '../types';

const contentType = 'Content-Type';
const json = 'application/json;charet=utf-8';

function normalizeHeaderNam(hedaer: Header, normalizeName: string): void {
  if (!hedaer) return;

  Object.keys(hedaer).forEach(name => {
    if (normalizeName !== name && normalizeName.toUpperCase() === name.toUpperCase()) {
      hedaer[normalizeName] = hedaer[name];
      delete hedaer[name];
    }
  });
}

export function processHeaders(headers: Header, data: any): Header {
  normalizeHeaderNam(headers, contentType);

  if (isPlainObject(data) && headers && !headers[contentType]) {
    headers[contentType] = json;
  }

  return headers;
};

export function parseHeader(headers: string): Record<string, unknown> {
  const parsed = Object.create(null);

  if (!headers) return parsed;

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':');
    key = key.trim().toLowerCase();

    if (!key) return;

    if (val) {
      val = val.trim();
    }

    parsed[key] = val;
  });

  return parsed;
}
