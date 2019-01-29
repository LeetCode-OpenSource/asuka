import test from 'ava'

import { HttpClient } from '../http-client'

test('should new with endPoint and headersInit', (t) => {
  const endPoint = '/graphql'
  const initHeaders = {
    'x-request-id': 'whatever',
  }
  const httpClient = new HttpClient(endPoint, initHeaders)
  t.true(httpClient instanceof HttpClient)
})
