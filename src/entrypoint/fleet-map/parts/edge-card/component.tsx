import React, { memo, useCallback } from 'react'

import { BarSubDivisionMeter } from '../bar-sub-division-meter'

import {
  SOC_PREFIX,
  SPEED_PREFIX,
  DRIVER_PREFIX,
  ACTION_BUTTON_TEXT,
} from './constant'
import * as S from './style'

type Props = {
  selected: boolean
  name: string
  soc: string
  socRatio: number
  speed: string
  driver: string
  onCardClick: () => void
  onActionClick: () => void
}

export const EdgeCard: React.VFC<Props> = memo((props) => {
  const {
    selected,
    name,
    soc,
    socRatio,
    speed,
    driver,
    onCardClick,
    onActionClick,
  } = props

  const onActionButtonClick = useCallback(
    (evt: React.MouseEvent<HTMLButtonElement>) => {
      // Section にMouseEventを伝搬しないように
      evt.stopPropagation()
      onActionClick()
    },
    [onActionClick],
  )

  return (
    <S.Section selected={selected} onClick={onCardClick}>
      <S.Title>{name}</S.Title>

      <S.WithSuffix>
        <S.Property>
          {SOC_PREFIX}
          {soc}
        </S.Property>
        <BarSubDivisionMeter ratio={socRatio} />
      </S.WithSuffix>

      <S.Property>
        {SPEED_PREFIX}
        {speed}
      </S.Property>

      {props.selected && (
        <>
          <S.Property>
            {DRIVER_PREFIX}
            {driver}
          </S.Property>

          <S.ActionButtonArea>
            <S.ActionButton type="button" onClick={onActionButtonClick}>
              {ACTION_BUTTON_TEXT}
            </S.ActionButton>
          </S.ActionButtonArea>
        </>
      )}
    </S.Section>
  )
})
