import { panic } from './panic'

export const safe = (
  <A extends unknown[], R>(fn: AsyncFn<A, R>): (...args: A) => Promise<Result<R>> => (
    async (...args) => {
      try {
        const value = await fn(...args)
        return { value }
      } catch (e) {
        if (!(e instanceof Error)) {
          panic(`safe() could not handle an error: "e" is not instance of Error; "e" is "${e}"`)
        }
        return { error: e }
      }
    }
  )
)

export type AsyncFn<A extends unknown[], R> = (...args: A) => Promise<R>

export type Result<T, E extends Error = Error> =
  | { value: T, error?: never }
  | { error: E, value?: never }
