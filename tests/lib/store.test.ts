import { MemetoStore } from '../../src/lib/store'

describe('[unit] test memeto store', () => {
  const store = new MemetoStore<number>()
  const tmpArr = [1, 2, 3, 4, 5]

  beforeEach(() => {
    store.clear()
  })

  test('save data to store', () => {
    for (const i of tmpArr) {
      store.save(i)
    }

    const arr = store.data
    const pointer = store.pointer
    expect(arr).toEqual(tmpArr)
    expect(pointer).toEqual(tmpArr.length - 1)
  })

  test('undo data ', () => {
    const expectedArr = [4, 3]
    const autuallyArr = []
    for (const i of tmpArr) {
      store.save(i)
    }

    let tmp = store.undo()
    autuallyArr.push(tmp)
    tmp = store.undo()
    autuallyArr.push(tmp)

    expect(autuallyArr).toEqual(expectedArr)
  })

  test('redo data', () => {
    const expectedArr = [4, 3, 4, 5]
    const autuallyArr = []
    for (const i of tmpArr) {
      store.save(i)
    }

    let tmp = store.undo()
    autuallyArr.push(tmp)
    tmp = store.undo()
    autuallyArr.push(tmp)

    tmp = store.redo()
    autuallyArr.push(tmp)
    tmp = store.redo()
    autuallyArr.push(tmp)

    expect(autuallyArr).toEqual(expectedArr)
  })

  test('overwrite data', () => {
    const expectedArr = [1, 2, 3, 6]
    for (const i of tmpArr) {
      store.save(i)
    }

    store.undo()
    store.undo()
    store.save(6)

    const arr = store.data
    expect(arr).toEqual(expectedArr)
  })
})
