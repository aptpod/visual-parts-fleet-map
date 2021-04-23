import { canDisplayNumber } from '.'

describe('canDisplayNumber', () => {
  type TestCase = { value: any; expected: boolean }

  const testCases: TestCase[] = [
    // true
    { value: -1, expected: true },
    { value: 0, expected: true },
    { value: 1, expected: true },
    { value: '-1', expected: true },
    { value: '0', expected: true },
    { value: '1', expected: true },
    { value: -0.1, expected: true },
    { value: 0.1, expected: true },
    { value: '-0.1', expected: true },
    { value: '0.1', expected: true },
    { value: '012', expected: true },
    { value: 0x12, expected: true },
    { value: '0x12', expected: true },
    { value: true, expected: true },
    { value: false, expected: true },
    // false
    { value: '', expected: false },
    { value: 'true', expected: false },
    { value: 'false', expected: false },
    { value: undefined, expected: false },
    { value: 'undefined', expected: false },
    { value: null, expected: false },
    { value: 'null', expected: false },
    { value: NaN, expected: false },
    { value: 'NaN', expected: false },
  ]

  testCases.forEach(({ value, expected }) => {
    const id = JSON.stringify(value)
    test(`${id}`, () => {
      expect(canDisplayNumber(value)).toBe(expected)
    })
  })
})
