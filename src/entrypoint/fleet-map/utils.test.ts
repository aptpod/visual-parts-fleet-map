import {
  formatEdgeName,
  formatSocString,
  formatSocRatio,
  isFiniteLatLng,
  toDataURISchemaSvg,
} from './utils'

describe('formatEdgeName', () => {
  type TestData = {
    args: {
      edgeName: string
      stringWhenEmpty: string
    }
    exp: string
  }

  const testDatas: TestData[] = [
    {
      args: { edgeName: '', stringWhenEmpty: '--' },
      exp: '--',
    },
    {
      args: { edgeName: 'Edge01', stringWhenEmpty: '--' },
      exp: 'Edge01',
    },
  ]

  testDatas.forEach(({ args: { edgeName, stringWhenEmpty }, exp }) => {
    test(`should returns ${exp}  when edgeName=${edgeName}, stringWhenEmpty=${stringWhenEmpty}`, () => {
      expect(formatEdgeName(edgeName, stringWhenEmpty)).toBe(exp)
    })
  })
})

describe('formatSocString', () => {
  type TestData = {
    args: {
      soc: number
      stringWhenInvalid: string
    }
    exp: string
  }

  const testDatas: TestData[] = [
    {
      args: { soc: NaN, stringWhenInvalid: '--' },
      exp: '--',
    },
    {
      args: { soc: Infinity, stringWhenInvalid: '--' },
      exp: '--',
    },
    {
      args: { soc: 0.15, stringWhenInvalid: '--' },
      exp: '15%',
    },
    {
      args: { soc: 0.312, stringWhenInvalid: '--' },
      exp: '32%',
    },
  ]

  testDatas.forEach(({ args: { soc, stringWhenInvalid }, exp }) => {
    test(`should returns ${exp}  when soc=${soc}, stringWhenInvalid=${stringWhenInvalid}`, () => {
      expect(formatSocString(soc, stringWhenInvalid)).toBe(exp)
    })
  })
})

describe('formatSocRatio', () => {
  type TestData = {
    args: {
      soc: number
      numberWhenInvalid: number
    }
    exp: number
  }

  const testDatas: TestData[] = [
    {
      args: { soc: NaN, numberWhenInvalid: 0 },
      exp: 0,
    },
    {
      args: { soc: Infinity, numberWhenInvalid: -1 },
      exp: -1,
    },
    {
      args: { soc: 0.15, numberWhenInvalid: 0 },
      exp: 0.15,
    },
    {
      args: { soc: 0.312, numberWhenInvalid: 0 },
      exp: 0.312,
    },
  ]

  testDatas.forEach(({ args: { soc, numberWhenInvalid }, exp }) => {
    test(`should returns ${exp}  when soc=${soc}, numberWhenInvalid=${numberWhenInvalid}`, () => {
      expect(formatSocRatio(soc, numberWhenInvalid)).toBe(exp)
    })
  })
})

describe('isFiniteLatLng', () => {
  type TestData = {
    args: {
      lat: number
      lng: number
    }
    exp: boolean
  }

  const testDatas: TestData[] = [
    {
      args: { lat: NaN, lng: NaN },
      exp: false,
    },
    {
      args: { lat: 1, lng: NaN },
      exp: false,
    },
    {
      args: { lat: NaN, lng: 2 },
      exp: false,
    },
    {
      args: { lat: Infinity, lng: -Infinity },
      exp: false,
    },
    {
      args: { lat: 1, lng: -Infinity },
      exp: false,
    },
    {
      args: { lat: Infinity, lng: 2 },
      exp: false,
    },
    {
      args: { lat: 1, lng: 2 },
      exp: true,
    },
  ]

  testDatas.forEach(({ args: { lat, lng }, exp }) => {
    test(`should returns ${exp}  when lat=${lat}, lng=${lng}`, () => {
      expect(isFiniteLatLng(lat, lng)).toBe(exp)
    })
  })
})

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
