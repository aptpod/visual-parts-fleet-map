import { createContext } from 'react'
import { FontFamilies } from '@aptpod/data-viz-visual-parts-sdk'

import { FONT_FAMILIES } from '../../constant/font'

export const Context = createContext<FontFamilies>(FONT_FAMILIES)
