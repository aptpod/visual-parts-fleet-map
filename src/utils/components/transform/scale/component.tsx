import React, { FC, memo } from 'react'

import * as S from './style'
import * as utils from './utils'

type Props = {
  originalWidth: number
  originalHeight: number
  width: number
  height: number
}

export const Scale: FC<Props> = memo((props) => {
  const scale = utils.calculateScale({
    originalWidth: props.originalWidth,
    originalHeight: props.originalHeight,
    width: props.width,
    height: props.height,
  })

  return (
    <S.OuterArea
      width={props.originalWidth}
      height={props.originalHeight}
      scale={scale}
    >
      <S.InnerArea
        width={props.originalWidth}
        height={props.originalHeight}
        scale={scale}
      >
        {props.children}
      </S.InnerArea>
    </S.OuterArea>
  )
})
