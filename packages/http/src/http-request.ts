import { omit } from '@asuka/utils'

export class HttpRequest {
  constructor(private endPoint: string, private init: RequestInit, public shouldReportProgress = false) {}

  clone(update: RequestInit, shouldReportProgress = this.shouldReportProgress) {
    if (update.headers) {
      const headers = new Headers(this.init.headers)
      const patchHeaders = new Headers(update.headers)
      patchHeaders.forEach((value, key) => {
        headers.set(key, value)
      })
    }
    const requestInit = { ...this.init, ...omit(update, 'headers') }
    return new HttpRequest(this.endPoint, requestInit, shouldReportProgress)
  }

  // @internal
  makeRequest() {
    return new Request(this.endPoint, this.init)
  }
}
