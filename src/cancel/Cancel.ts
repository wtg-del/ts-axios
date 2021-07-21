import { Cancel as CancelType } from '../types'

export default class Cancel implements CancelType {
  constructor(public message?: string) {}
}

export function isCancel(token: any): boolean {
  return token instanceof Cancel
}
