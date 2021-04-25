import React, { memo } from 'react'

import * as S from './style'

import {
  LEFT_LARGE_PREFIX,
  RIGHT_SMALL_PREFIX,
  RIGHT_SMALL_SUFFIX,
} from './constant'

type Props = {
  numOfActiveEdge: number
  numOfTotalEdge: number
}

export const EdgesPanelTitle: React.VFC<Props> = memo((props) => {
  const { numOfActiveEdge, numOfTotalEdge } = props

  return (
    <S.Section>
      <S.LeftLargeArea>
        {LEFT_LARGE_PREFIX}
        {numOfActiveEdge}
      </S.LeftLargeArea>

      <S.RightSmallArea>
        {RIGHT_SMALL_PREFIX}
        {numOfTotalEdge}
        {RIGHT_SMALL_SUFFIX}
      </S.RightSmallArea>
    </S.Section>
  )
})
