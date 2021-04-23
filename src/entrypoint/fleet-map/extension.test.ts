import { parse, defaultExtension, Extension } from './extension'

/**
 * Parseのテスト
 */
describe('parse', () => {
  type TestData = {
    id: string
    args: {
      extension: any
    }
    exp: Extension
  }

  const testDatas: TestData[] = [
    {
      id: 'set extension to null',
      args: {
        extension: null,
      },
      exp: defaultExtension,
    },
    {
      id: 'set extension to undefined',
      args: {
        extension: undefined,
      },
      exp: defaultExtension,
    },
    {
      id: 'set extension to number',
      args: {
        extension: 123,
      },
      exp: defaultExtension,
    },
    {
      id: 'set extension to empty object',
      args: {
        extension: {},
      },
      exp: defaultExtension,
    },
    {
      id: 'set extension to OpenSteetMapURL=http://dummy.com',
      args: {
        extension: { openStreetMapURL: 'http://dummy.com' },
      },
      exp: { ...defaultExtension, openStreetMapURL: 'http://dummy.com' },
    },
    {
      id: 'set extension to all valid values',
      args: {
        extension: {
          openStreetMapURL: 'http://dmmy.com',
          openStreetMapAttribution: '<a href="http://dummy.com>Link</a>',
        },
      },
      exp: {
        ...defaultExtension,
        openStreetMapURL: 'http://dmmy.com',
        openStreetMapAttribution: '<a href="http://dummy.com>Link</a>',
      },
    },
    {
      id: 'set extension to all invalid values',
      args: {
        extension: {
          openStreetMapURL: 123,
          openStreetMapAttribution: false,
        },
      },
      exp: defaultExtension,
    },
    {
      id: 'set extension to additional property',
      args: {
        extension: {
          openStreetMapURL: 'http://dmmy.com',
          additionalProperty: 'additionalProperty',
        },
      },
      exp: { ...defaultExtension, openStreetMapURL: 'http://dmmy.com' },
    },
  ]

  testDatas.forEach(({ id, args: { extension }, exp }) => {
    test(id, () => {
      expect(parse(extension)).toStrictEqual(exp)
    })
  })
})
