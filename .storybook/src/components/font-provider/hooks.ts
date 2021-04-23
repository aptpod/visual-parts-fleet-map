import { useContext } from 'react'
import { FontFamilies } from '@aptpod/data-viz-visual-parts-sdk'

import { Context } from './context'

export const useFontFamily = (fontFamily: keyof FontFamilies) => {
  return useContext(Context)[fontFamily]
}
