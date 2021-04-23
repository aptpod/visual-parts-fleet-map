import 'reboot.css'
import React from 'react'
import { addDecorator } from '@storybook/react'
import { setDefaults } from 'react-storybook-addon-props-combinations'
import { withScreenshot } from 'storycap'

import { FONT_FAMILIES, FONT_LOADER_SPECS } from './src/constant/font'
import { FontStyle } from './src/components/font-style'
import { FontProvider } from './src/components/font-provider'
import { StyledGlobal } from './src/style'

setDefaults({
  showSource: true,
  style: {
    padding: '20px',
    margin: '10px',
    border: '1px solid #dfe2e5',
  },
})

addDecorator(withScreenshot)
addDecorator((storyFn) => (
  <>
    <StyledGlobal />
    <FontStyle fontLoaderSpecs={FONT_LOADER_SPECS} />
    <FontProvider fontFamilies={FONT_FAMILIES}>{storyFn()}</FontProvider>
  </>
))
