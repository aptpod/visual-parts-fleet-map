import React from 'react'
import { storiesOf } from '@storybook/react'

import { FleetMap } from './component'
import { FrameNormal, WIDTH, HEIGHT } from './test.style'

storiesOf(__dirname, module).add('component', () => {
  return (
    <FrameNormal>
      <FleetMap
        size={{
          width: WIDTH,
          height: HEIGHT,
        }}
        openStreetMap={{
          url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          attribution:
            '<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
        }}
        datasets={[
          {
            edgeUUID: 'Edge01',
            edgeName: 'Edge Name',
            /** unit:degree */
            lat: 35.681,
            /** unit:degree */
            lng: 139.767,
            /** unit:degree  */
            heading: 30,
            /** unit: ratio */
            soc: 0.45,
            /** unit: Km/h */
            speed: 32,
          },
        ]}
      />
    </FrameNormal>
  )
})
