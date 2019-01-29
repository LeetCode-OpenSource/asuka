import { Omit } from '@asuka/types'
import { keys } from './keys'

export function omit<T, K extends (keyof T)[]>(target: T, ...omitKeys: K) {
  const omitSet = new Set(omitKeys)
  const result = Object.create(null)
  keys(target).forEach((key) => {
    if (!omitSet.has(key)) {
      result[key] = target[key]
    }
  })
  return result as Omit<T, K>
}
