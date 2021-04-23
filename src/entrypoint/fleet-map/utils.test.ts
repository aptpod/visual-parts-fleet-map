import { toDataURISchemaSvg } from './utils'

describe('toDataURISchemaSvg', () => {
  type TestData = {
    args: {
      svg: string
    }
    exp: string
  }

  const testDatas: TestData[] = [
    {
      args: { svg: '' },
      exp: 'data:image/svg+xml,',
    },
    {
      args: { svg: '<svg><circle cx="10" cy="30" r="100" /></svg>' },
      exp:
        'data:image/svg+xml,%3Csvg%3E%3Ccircle%20cx%3D%2210%22%20cy%3D%2230%22%20r%3D%22100%22%20%2F%3E%3C%2Fsvg%3E',
    },
  ]

  testDatas.forEach(({ args: { svg }, exp }) => {
    test(`should returns ${exp}  when svg=${svg}`, () => {
      expect(toDataURISchemaSvg(svg)).toBe(exp)
    })
  })
})
