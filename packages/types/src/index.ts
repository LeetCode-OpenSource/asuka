export type Maybe<T> = T | null
export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
export interface ConstructorOf<T> {
  new (...args: any[]): T
}
