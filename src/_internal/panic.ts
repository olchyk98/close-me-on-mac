export function panic (message: string): never {
  throw new Error(`[PANIC] ${message}`)
}
