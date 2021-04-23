import { createGlobalStyle } from 'styled-components'

const thumbVerticalRight = '4px'
const thumbVerticalWidth = '4px'
const thumbBorderRadius = '2px'
const trackPadding = '0px'
const thumbBgColor = '#2facff'

export const className = {
  wrapper: '__scrollbar-wrapper',
  thumbY: '__scrollbar-thumbY',
  trackY: '__scrollbar-trackY',
} as const

export const GlobalStyledWrapper = createGlobalStyle`
  .${className.wrapper} {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`

export const GlobalStyledThumbY = createGlobalStyle`
  .${className.thumbY} {
    display: block;
    width: ${thumbVerticalWidth};
    border-radius: ${thumbBorderRadius};
    background: ${thumbBgColor};
    cursor: pointer;
  }
`

export const GlobalStyledTrackY = createGlobalStyle`
  .${className.trackY} {
    position: absolute;
    right: ${thumbVerticalRight};
    width: ${thumbVerticalWidth};
    height: 100%;
    padding: ${trackPadding} 0;
  }
`
