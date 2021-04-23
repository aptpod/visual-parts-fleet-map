import React, { memo } from 'react'

import * as C from './constant'
import * as S from './style'

type Props = {
  onZoomInClick: () => void
  onZoomOutClick: () => void
}

export const MapZoomController: React.VFC<Props> = memo((props) => {
  return (
    <S.Section>
      <S.ControlButton onClick={props.onZoomInClick}>
        {C.CONTROL_BUTTON_LABEL_ZOOM_IN}
      </S.ControlButton>

      <S.ControlButton onClick={props.onZoomOutClick}>
        {C.CONTROL_BUTTON_LABEL_ZOOM_OUT}
      </S.ControlButton>
    </S.Section>
  )
  return null
})
