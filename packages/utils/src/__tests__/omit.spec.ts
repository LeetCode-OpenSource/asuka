import test from 'ava'

import { omit } from '../omit'

test('should omit specified filed', (t) => {
  const fixture = {
    a: 'foo',
    b: 'bar',
  }
  t.not('a' in omit(fixture, 'a'), true)
})
