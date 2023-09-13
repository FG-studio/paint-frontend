export class PersistanceStore {
  private static _ins: PersistanceStore | undefined
  public static get Instance(): PersistanceStore {
    if (!this._ins) {
      this._ins = new PersistanceStore()
    }
    return this._ins
  }
  private _data: Map<string, string>
  private constructor() {
    this._data = new Map()
  }

  set = (key: string, value: string) => {
    this._data.set(key, value)
  }

  setObj = <T>(key: string, value: T) => {
    this._data.set(key, JSON.stringify(value))
  }

  get = (key: string) => {
    return this._data.get(key)
  }

  getObj = <T>(key: string): T | undefined => {
    try {
      const data = this._data.get(key)
      if (!data) return undefined
      const obj = JSON.parse(data) as T
      return obj
    } catch (e) {
      console.error('error when parser data ', key)
      return undefined
    }
  }
}
