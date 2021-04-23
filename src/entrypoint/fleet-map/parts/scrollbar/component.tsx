import React from 'react'
import ScrollbarsCustom from 'react-scrollbars-custom'

import * as S from './style'

interface IProps {
  children: React.ReactNode
}

const renderer: React.ComponentProps<typeof ScrollbarsCustom>['renderer'] = (
  props,
) => {
  const { elementRef, ...restProps } = props
  return (
    <div
      {...restProps}
      style={{ width: '100%', height: '100%' }}
      ref={elementRef}
    />
  )
}

export const Scrollbar: React.FC<IProps> = (props) => {
  return (
    <>
      <S.GlobalStyledWrapper />
      <S.GlobalStyledThumbY />
      <S.GlobalStyledTrackY />

      <ScrollbarsCustom
        noDefaultStyles
        renderer={renderer}
        wrapperProps={{ className: S.className.wrapper }}
        thumbYProps={{ className: S.className.thumbY }}
        trackYProps={{ className: S.className.trackY }}
      >
        {props.children}
      </ScrollbarsCustom>
    </>
  )
}
