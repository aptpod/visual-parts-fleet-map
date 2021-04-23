import React, { memo } from 'react'

import * as C from './constant'
import * as S from './style'

type Props = {
  ratio: number
}

export const BarSubDivisionMeter: React.VFC<Props> = memo((props) => {
  // ratioのLimitフィルタ
  const ratio = Math.max(Math.min(1, props.ratio), 0)

  // colorをactive にするメモリ数 (小数点は切り上げ)
  const numOfActiveBar = Math.ceil(ratio * 10)

  // color判定
  const activeColor =
    numOfActiveBar <= C.THRESHOLD.CRITICAL
      ? C.COLOR.CRITICAL
      : // eslint-disable-next-line unicorn/no-nested-ternary
      numOfActiveBar <= C.THRESHOLD.WARNING
      ? C.COLOR.WARNING
      : C.COLOR.OK

  const inActiveColor = C.COLOR.INACTIVE

  return (
    <S.Section>
      {[...new Array(C.NUM_OF_BAR)].map((_, idx) => {
        const color = idx < numOfActiveBar ? activeColor : inActiveColor
        return <S.Bar key={idx} color={color} />
      })}
    </S.Section>
  )
})
