import { Observable } from 'rxjs'

export class HttpHandle<T> {
  constructor(private readonly response$: Observable<T>) {}

  handle(): Observable<T> {
    return this.response$
  }
}
