import test from 'ava'

import { keys } from '../keys'

test('behavior should be same as Object.keys #1', (t) => {
  const fixtures = {
    foo: '1',
    bar: 2,
  }
  t.deepEqual(keys(fixtures), Object.keys(fixtures))
})

test('behavior should be same as Object.keys #2', (t) => {
  const fixtures = Object.create({
    foo: '1',
    bar: 2,
  })
  Object.assign(fixtures, {
    3: 'kk',
    4: 'baz',
    [Symbol('whaterver')]: 'symbol',
  })
  t.deepEqual(keys(fixtures), Object.keys(fixtures))
})
