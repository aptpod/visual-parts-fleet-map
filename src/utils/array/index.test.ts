import { buildEmptyArray, selectNonNullables } from '.'

describe('buildEmptyArray', () => {
  type TestData = {
    args: {
      num: number
    }
    exp: any[]
    error: boolean
  }

  const testDatas: TestData[] = [
    { args: { num: -1 }, exp: [], error: true },
    { args: { num: 0 }, exp: [], error: false },
    { args: { num: 1.2 }, exp: [], error: true },
    { args: { num: 2 }, exp: [undefined, undefined], error: false },
  ]

  testDatas.forEach(({ args: { num }, exp, error }) => {
    const expString = JSON.stringify(exp)
    if (!error) {
      test(`returns ${expString} when num=${num}`, () => {
        expect(buildEmptyArray(num)).toStrictEqual(exp)
      })
    } else {
      test(`throw error when num=${num}`, () => {
        expect(() => buildEmptyArray(num)).toThrow()
      })
    }
  })
})

describe('selectNonNullables', () => {
  type TestData = {
    args: {
      array: any[]
    }
    exp: any[]
  }

  const testDatas: TestData[] = [
    { args: { array: [] }, exp: [] },
    { args: { array: [1, 2, 3] }, exp: [1, 2, 3] },
    { args: { array: [1, 2, null, 3, null] }, exp: [1, 2, 3] },
  ]

  testDatas.forEach(({ args: { array }, exp }) => {
    const arrayString = JSON.stringify(array)
    const expString = JSON.stringify(exp)

    test(`returns ${expString} when array=${arrayString}`, () => {
      expect(selectNonNullables(...array)).toStrictEqual(exp)
    })
  })
})
