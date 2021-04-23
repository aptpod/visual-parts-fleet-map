import { FontFamilies } from '@aptpod/data-viz-visual-parts-sdk'

import URL_APT7SEG from '../assets/font/apt7seg-Regular.woff2'
import URL_APT_Q_REGULAR from '../assets/font/aptQ-Regular.woff2'
import URL_HOOG0553 from '../assets/font/HOOG0553.ttf'

const URL_QUANTICO_REGULAR =
  'https://fonts.googleapis.com/css2?family=Quantico&display=swap'
const URL_QUANTICO_BOLD =
  'https://fonts.googleapis.com/css2?family=Quantico:wght@700&display=swap'
const URL_OXYGEN_MONO_REGULAR =
  'https://fonts.googleapis.com/css2?family=Oxygen+Mono&display=swap'

export const FONT_FAMILIES: FontFamilies = {
  // style 指定時に font-weight: 100 を指定すること
  axisProNLight: 'sans-serif',
  // style 指定時に font-weight: 400 を指定すること
  axisProNRegular: 'sans-serif',
  // style 指定時に font-weight: 700 を指定すること
  axisProNMedium: 'sans-serif',
  quanticoRegular: 'quantico-regular',
  quanticoBold: 'quantico-bold',
  oxygenMonoRegular: 'oxygen-mono-regular',
  apt7seg: 'apt7seg',
  hoog0553: 'hoog0553',
  aptQRegular: 'apt-q-regular',
}

export type FONT_TYPE_NO_LOAD = {
  type: 'NO_LOAD'
}
export type FONT_TYPE_FETCH = {
  type: 'FETCH'
  url: string
  fontFamilyReplaceFrom: RegExp
  fontFamilyReplaceTo: string
}
export type FONT_TYPE_REQUIRE = {
  type: 'REQUIRE'
  url: string
  fontFamily: string
}
export type FontLoaderSpecs = Record<
  keyof FontFamilies,
  FONT_TYPE_NO_LOAD | FONT_TYPE_FETCH | FONT_TYPE_REQUIRE
>

export const FONT_LOADER_SPECS: FontLoaderSpecs = {
  axisProNLight: {
    type: 'NO_LOAD',
  },
  axisProNRegular: {
    type: 'NO_LOAD',
  },
  axisProNMedium: {
    type: 'NO_LOAD',
  },
  quanticoRegular: {
    type: 'FETCH',
    url: URL_QUANTICO_REGULAR,
    fontFamilyReplaceFrom: /Quantico/g,
    fontFamilyReplaceTo: FONT_FAMILIES.quanticoRegular,
  },
  quanticoBold: {
    type: 'FETCH',
    url: URL_QUANTICO_BOLD,
    fontFamilyReplaceFrom: /Quantico/g,
    fontFamilyReplaceTo: FONT_FAMILIES.quanticoBold,
  },
  oxygenMonoRegular: {
    type: 'FETCH',
    url: URL_OXYGEN_MONO_REGULAR,
    fontFamilyReplaceFrom: /Oxygen Mono/g,
    fontFamilyReplaceTo: FONT_FAMILIES.oxygenMonoRegular,
  },
  apt7seg: {
    type: 'REQUIRE',
    url: URL_APT7SEG,
    fontFamily: FONT_FAMILIES.apt7seg,
  },
  hoog0553: {
    type: 'REQUIRE',
    url: URL_HOOG0553,
    fontFamily: FONT_FAMILIES.hoog0553,
  },
  aptQRegular: {
    type: 'REQUIRE',
    url: URL_APT_Q_REGULAR,
    fontFamily: FONT_FAMILIES.aptQRegular,
  },
}
