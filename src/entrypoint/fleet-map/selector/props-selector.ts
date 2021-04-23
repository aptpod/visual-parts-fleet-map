import { ComponentProps, useMemo } from 'react'
import {
  ViewBox,
  DataSpecification,
  Value,
} from '@aptpod/data-viz-visual-parts-sdk'
import { FleetMap } from '../component'

type FleetMapProps = ComponentProps<typeof FleetMap>

/**
 * FleetMap Component Size Props に変換します。
 */
export const useSelectSize = (params: {
  viewBox: ViewBox
}): FleetMapProps['size'] => {
  const { width, height } = params.viewBox

  const size = useMemo(() => {
    return { width, height }
  }, [width, height])

  return size
}

/**
 * FleetMap Component の OpenStreetMap Props に変換します。
 */
export const useSelectOpenstreetMap = (params: {
  dataset: {
    url: string
    attribution: string
  }
  default: {
    url: string
    attribution: string
  }
}): FleetMapProps['openStreetMap'] => {
  const p = params

  const trimedURL = p.dataset.url.trim()
  const trimedAttribution = p.dataset.attribution.trim()

  const url = trimedURL !== '' ? trimedURL : p.default.url
  const attribution =
    trimedAttribution !== '' ? trimedAttribution : p.default.attribution

  const openStreetMap = useMemo(() => {
    return {
      url,
      attribution,
    }
  }, [url, attribution])

  return openStreetMap
}

/**
 * FleetMap Component の Datasets Props に変換します。
 */
export const useSelectDatasets = (params: {
  dataSpecifications: DataSpecification[]
  values: Value[]
}): FleetMapProps['datasets'] => {
  const { dataSpecifications, values } = params

  const edgeMap: Map<
    string,
    {
      edgeUUID: string
      edgeName: string
      values: number[]
    }
  > = new Map()

  for (const [i, { edgeUUID, edgeName }] of dataSpecifications.entries()) {
    const has = edgeMap.has(edgeUUID)
    if (!has) {
      edgeMap.set(edgeUUID, {
        edgeUUID,
        edgeName,
        values: [],
      })
    }

    const value = values[i]
    if (!value) {
      continue
    }

    const numValue = Number((value.data[value.baseIdx] ?? { v: NaN }).v)

    const edge = edgeMap.get(edgeUUID)
    edge?.values.push(numValue)
  }

  const datasets = [...edgeMap.values()].map((edge) => {
    return {
      edgeUUID: edge.edgeUUID,
      edgeName: edge.edgeName,
      lat: edge.values[0] ?? NaN,
      lng: edge.values[1] ?? NaN,
      heading: edge.values[2] ?? NaN,
      soc: edge.values[3] ?? NaN,
      speed: edge.values[4] ?? NaN,
    }
  })

  return datasets
}
