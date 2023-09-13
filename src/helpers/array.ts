/* eslint-disable @typescript-eslint/no-unsafe-return */
export function removeDuplicateObjectArr<T>(arr: T[]): T[] {
  return Array.from(new Set(arr.map((a) => JSON.stringify(a)))).map((a) =>
    JSON.parse(a),
  )
}

export function listToMap<T, K>(data: T[], getKey: (data: T) => K): Map<K, T> {
  const retval = new Map()
  for (const d of data) {
    const key = getKey(d)
    retval.set(key, d)
  }
  return retval
}
