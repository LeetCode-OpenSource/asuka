import { Observable, Subject } from 'rxjs'
import { Maybe, ConstructorOf } from '@asuka/types'
import { stringify } from 'qs'

import { Interceptor } from './interceptor'
import { HttpHandle } from './http-handle'
import { HttpRequest } from './http-request'

export interface QueryOptions<V = {}> {
  query: string
  variables: V
  httpQuery: {
    [index: string]: string | number
  }
  requestInit: RequestInit
}

export class HttpClient {
  private interceptors: Interceptor[] = []

  constructor(private endpoint: string, private defaultHeaders: HeadersInit = {}) {}

  setEndPoint(endpoint: string) {
    this.endpoint = endpoint
  }

  addInterceptors(...interceptors: ConstructorOf<Interceptor>[]) {
    interceptors.forEach((interceptorClass) => {
      this.interceptors.push(new interceptorClass())
    })
  }

  query<T, V = {}>(options: QueryOptions<V>): Observable<T> {
    const body = {
      variables: options.variables,
      query: options.query,
    }
    return this.request(
      JSON.stringify(body),
      options.httpQuery ? stringify(options.httpQuery) : '',
      options.requestInit,
    )
  }

  mutate<T, V = {}>(options: QueryOptions<V>): Observable<T> {
    const body = {
      variables: options.variables,
      query: options.query,
    }
    return this.request(
      JSON.stringify(body),
      options.httpQuery ? stringify(options.httpQuery) : '',
      options.requestInit,
    )
  }

  private request<T>(body: Maybe<BodyInit>, query = '', options: RequestInit = {}): Observable<T> {
    const controller = new AbortController()
    const headers = new Headers(this.defaultHeaders)
    const requestHeaders = options.headers ? new Headers(options.headers) : headers
    const endpoint = query ? `${this.endpoint}?${query}` : this.endpoint
    if (options.headers) {
      headers.forEach((value, name) => {
        requestHeaders.append(name, value)
      })
    }
    const _source$ = new Subject<Response>()
    const httpRequest = new HttpRequest(endpoint, {
      signal: controller.signal,
      method: 'POST',
      body,
      ...options,
      headers,
    })
    fetch(httpRequest.makeRequest())
      .then((response) => {
        _source$.next(response)
        _source$.complete()
      })
      .catch((e) => {
        _source$.error(e)
      })
    const res$ = this.interceptors.reduce((res$, cur) => {
      const handler = new HttpHandle(res$)
      return cur.intercept(httpRequest, handler)
    }, _source$ as Observable<Response>)
    return (res$ as Observable<any>) as Observable<T>
  }
}
