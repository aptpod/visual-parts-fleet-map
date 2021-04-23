import React, { memo, useState } from 'react'

import { StyleSheetManager } from 'styled-components'

type Props = {
  children: React.ReactNode
}

/**
 * Styled Components の適用スコープを特定の DOM 以下に制限する
 */
export const StyleSheetManagerWrapper: React.FC<Props> = memo((props) => {
  const [element, setElement] = useState<HTMLDivElement | null>(null)
  return (
    <div ref={setElement}>
      {element && (
        <StyleSheetManager target={element}>{props.children}</StyleSheetManager>
      )}
    </div>
  )
})
