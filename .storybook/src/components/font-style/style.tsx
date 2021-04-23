import { css, FlattenSimpleInterpolation } from 'styled-components'

export const buildURLFontCss = (params: {
  fontFamily: string
  url: string
}) => {
  return css`
    @font-face {
      font-family: ${params.fontFamily};
      src: url(${params.url});
      font-display: 'swap';
    }
  `
}

export const createFontStyle = (
  fontStyles: (string | FlattenSimpleInterpolation)[],
) => {
  return css`
    ${fontStyles.map((fontStyle) => {
      return css`
        ${fontStyle}
      `
    })}
  `
}
