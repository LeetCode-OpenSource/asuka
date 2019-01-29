export function keys<T>(target: T) {
  return Object.keys(target) as (keyof T)[]
}
