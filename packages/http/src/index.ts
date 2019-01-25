import { DocumentNode } from 'graphql'
import { Observable, Observer } from 'rxjs'
import { Maybe } from '@asuka/types'

export interface QueryOptions<V = {}> {
  query: DocumentNode
  variables: V
}

export class HttpClient {
  constructor(private endpoint: string, private defaultHeaders: HeadersInit = {}) {}

  setEndPoint(endpoint: string) {
    this.endpoint = endpoint
  }

  query<T, V>(options: QueryOptions<V>): Observable<T> {
    const body = {
      variables: options.variables,
      query: options.query,
    }
    return this.request(JSON.stringify(body))
  }

  mutate() {}

  private request<T>(body: Maybe<BodyInit>, options: RequestInit = {}): Observable<T> {
    return new Observable<T>((observer: Observer<T>) => {
      const controller = new AbortController()
      const headers = new Headers(this.defaultHeaders)
      const requestHeaders = options.headers ? new Headers(options.headers) : headers
      if (options.headers) {
        headers.forEach((value, name) => {
          requestHeaders.append(name, value)
        })
      }
      fetch(this.endpoint, {
        signal: controller.signal,
        method: 'POST',
        body,
        ...options,
        headers,
      })
        .then((response) => {
          return response.json()
        })
        .then((value: T) => {
          observer.next(value)
          observer.complete()
        })
        .catch((e) => observer.error(e))
    })
  }
}
