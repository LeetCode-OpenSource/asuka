import { Observable } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { HttpRequest } from './http-request'
import { HttpHandle } from './http-handle'

export interface Interceptor {
  intercept<T, U>(req: HttpRequest, next: HttpHandle<T>): Observable<U>
}

export class DefaultInterceptor implements Interceptor {
  intercept<T, U>(req: HttpRequest, next: HttpHandle<T>): Observable<U> {
    return next.handle(req).pipe(mergeMap((res: any) => res.json()))
  }
}
