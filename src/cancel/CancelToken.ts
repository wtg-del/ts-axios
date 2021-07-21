import {
  CancelTokenSource,
  CancelExecutor,
  Canceler,
  CancelToken as CancelTokenType
} from '../types'
import Cancel from './Cancel'

interface ResolvePromise {
  (reason: Cancel): void
}

export default class CancelToken implements CancelTokenType {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve
    })

    const fn: Canceler = (message?: string): void => {
      if (this.reason) return
      this.reason = new Cancel(message)
      resolvePromise(this.reason!)
    }

    executor(fn)
  }

  throwIfRequested() {
    if (this.reason) {
      throw this.reason
    }
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })

    return { cancel, token }
  }
}
