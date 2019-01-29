import { Observable } from 'rxjs'
import { HttpRequest } from './http-request'

export class HttpHandle<T> {
  public req!: HttpRequest

  constructor(private response$: Observable<T>) {}

  handle(req: HttpRequest): Observable<T> {
    this.req = req
    return this.response$
  }
}
