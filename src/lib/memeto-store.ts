export class MemetoStore<T> {
  private _store: T[] = []
  private _pointer: number = -1

  save = (data: T) => {
    while (this._pointer < this._store.length - 1) {
      this._store.pop()
    }

    this._store.push(data)
    this._pointer++
  }

  redo = (): T | undefined => {
    if (this._pointer >= this._store.length - 1) return undefined

    this._pointer++
    return this._store[this._pointer]
  }

  undo = (): T | undefined => {
    if (this._pointer < 0) return undefined

    this._pointer--
    return this._store[this._pointer]
  }

  clear = () => {
    this._store = []
    this._pointer = -1
  }

  get data(): T[] {
    return this._store
  }

  get pointer(): number {
    return this._pointer
  }

  get current(): T | undefined {
    if (this._pointer === -1) return undefined
    if (this._pointer >= this._store.length) return undefined
    return this._store[this._pointer]
  }
}
