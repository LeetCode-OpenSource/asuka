import { Observable } from 'rxjs'
import { HttpRequest } from './http-request'
import { HttpHandle } from './http-handle'

export interface Interceptor {
  intercept<T, U>(req: HttpRequest, next: HttpHandle<T>): Observable<U>
}
