import React from 'react'
import { FontFamilies } from '@aptpod/data-viz-visual-parts-sdk'

import { Context } from './context'

export const FontProvider: React.FC<{ fontFamilies: FontFamilies }> = (
  props,
) => {
  return (
    <Context.Provider value={props.fontFamilies}>
      {props.children}
    </Context.Provider>
  )
}
