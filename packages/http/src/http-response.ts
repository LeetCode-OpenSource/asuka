import { from } from 'rxjs'

export class HttpResponse<T> {
  constructor(private readonly rawResponse: Response) {}

  getRaw() {
    return this.rawResponse
  }

  json() {
    return from(this.rawResponse.json() as Promise<T>)
  }

  arrayBuffer() {
    return from(this.rawResponse.arrayBuffer())
  }

  blob() {
    return from(this.rawResponse.blob())
  }

  formData() {
    return from(this.rawResponse.formData())
  }

  text() {
    return from(this.rawResponse.text())
  }
}
