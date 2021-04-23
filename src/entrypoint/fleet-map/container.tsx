import React, { memo, useEffect, useState } from 'react'
import {
  ExposerEvent,
  ViewBox,
  DataSpecification,
  Value,
} from '@aptpod/data-viz-visual-parts-sdk'

import { FleetMap } from './component'
import {
  useSelectSize,
  useSelectOpenstreetMap,
  useSelectDatasets,
} from './selector/props-selector'
import {
  OPEN_STREET_MAP_URL_DEFAULT,
  OPEN_STREET_MAP_ATTRIBUTION_DEFAULT,
} from './constant'
import { parse as parseExtension, defaultExtension } from './extension'

type Props = {
  comm: ExposerEvent
}

const VIEW_BOX_DEFAULT: ViewBox = { width: 100, height: 100 }
const DATA_SPECS_DEFAULT: DataSpecification[] = []
const VALUES_DEFAULT: Value[] = []

/**
 * data-viz-visual-parts-sdk から取得したデータを FleetMap Component に必要なPropsに連携します。
 */
export const FleetMapContainer: React.FC<Props> = memo((props) => {
  // ビジュアルパーツの表示サイズを取得します。
  const [viewBox, setViewBox] = useState(VIEW_BOX_DEFAULT)

  // ビジュアルパーツの固有情報を取得します。
  const [extension, setExtension] = useState(defaultExtension)

  // Data Visualizer にバインドしているデータの定義リストを取得します。
  const [dataSpecifications, setDataSpecifications] = useState(DATA_SPECS_DEFAULT) // eslint-disable-line prettier/prettier

  // Data Visualizer にバインドしているデータに紐づく計測データを取得します。
  const [values, setValues] = useState(VALUES_DEFAULT)

  useEffect(() => {
    props.comm.viewBox.on(setViewBox)
    props.comm.extension.on((anyExtension: any) => {
      setExtension(parseExtension(anyExtension))
    })
    props.comm.dataSpecifications.on(setDataSpecifications)
    props.comm.values.on(setValues)

    // Data Visualizer に、ビジュアルパーツのイベント取得初期設定が完了したことを通知します。
    props.comm.loaded.emit()
  }, [props.comm])

  //
  // Data Visualizerから取得したデータを Fleet Map Component Props に変換します
  //
  const size = useSelectSize({ viewBox })

  const openSteetMap = useSelectOpenstreetMap({
    dataset: {
      url: extension.openStreetMapURL,
      attribution: extension.openStreetMapAttribution,
    },
    default: {
      url: OPEN_STREET_MAP_URL_DEFAULT,
      attribution: OPEN_STREET_MAP_ATTRIBUTION_DEFAULT,
    },
  })

  const datasets = useSelectDatasets({ dataSpecifications, values })

  //
  // Fleet Map Component を表示します。
  //
  return (
    <FleetMap size={size} openStreetMap={openSteetMap} datasets={datasets} />
  )
})
