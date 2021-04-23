import styled from 'styled-components'

type OuterAreaProps = {
  width: number
  height: number
  scale: number
}

type InnerAreaProps = {
  width: number
  height: number
  scale: number
}

export const OuterArea = styled.div.attrs<OuterAreaProps>(
  ({ width, height, scale }) => ({
    style: {
      width: width * scale,
      height: height * scale,
    },
  }),
)<OuterAreaProps>``

export const InnerArea = styled.div.attrs<InnerAreaProps>(
  ({ width, height, scale }) => ({
    style: {
      width,
      height,
      transform: `scale(${scale})`,
    },
  }),
)<InnerAreaProps>`
  position: relative;
  transform-origin: top left;
`
