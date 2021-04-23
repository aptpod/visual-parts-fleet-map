import React, { memo, useMemo, useState, useCallback, useEffect } from 'react'
import { renderToString } from 'react-dom/server'

import { TileLayer, Marker, Map } from 'react-leaflet'
import { Icon, Point } from 'leaflet'

import { MapZoomController } from './parts/map-zoom-controller'
import { CarMarker } from './parts/car-maker'
import { BarSubDivisionMeter } from './parts/bar-sub-division-meter'
import { Scrollbar } from './parts/scrollbar'

import {
  LAYOUT_HEADER_HEIGHT,
  OPEN_STREET_MAP_ZOOM_DEFAULT,
  OPEN_STREET_MAP_LAT_LNG_DEFAULT,
  OPEN_STREET_MAP_ZOOM_CONTROLS_DEFAULT,
  OPEN_STREET_MAP_ZOOM_IN_LIMIT,
  OPEN_STREET_MAP_ZOOM_OUT_LIMIT,
} from './constant'
import * as S from './style'
import * as utils from './utils'

type Props = {
  size: {
    /** unit: px */
    width: number
    /** unit: px */
    height: number
  }
  openStreetMap: {
    url: string
    attribution: string
  }
  datasets: {
    edgeUUID: string
    edgeName: string
    /** unit:degree */
    lat: number
    /** unit:degree */
    lng: number
    /** unit:degree  */
    heading: number
    /** unit: ratio */
    soc: number
    /** unit: Km/h */
    speed: number
  }[]
}

export const FleetMap: React.VFC<Props> = memo((props) => {
  const { size, openStreetMap, datasets } = props
  const { width, height } = size

  const [centerCoord, setCenterCoord] = useState(
    OPEN_STREET_MAP_LAT_LNG_DEFAULT,
  )
  const [zoom, setZoom] = useState(OPEN_STREET_MAP_ZOOM_DEFAULT)
  const [selectedEdgeUUID, setSelectedEdgeUUID] = useState('')

  //
  // Zoom In / Outイベントハンドラ
  //
  const onZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 1, OPEN_STREET_MAP_ZOOM_IN_LIMIT))
  }, [])
  const onZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - 1, OPEN_STREET_MAP_ZOOM_OUT_LIMIT))
  }, [])

  const makeSetSelectedEdgeUUID = useCallback((edgeUUID: string) => {
    return () => {
      setSelectedEdgeUUID((prev) => {
        return prev === edgeUUID ? '' : edgeUUID
      })
    }
  }, [])

  // サイズ、または OpenSteetMapののURLが変更になったらKeyも変更する
  const mapContainerKey = `${width}-${height}-${openStreetMap.url}`

  // マップのコンテナスタイル
  const mapContainerStyle = useMemo(
    () => ({
      width,
      height: height - LAYOUT_HEADER_HEIGHT,
    }),
    [width, height],
  )

  //
  // マップの Center 座標を更新
  //
  useEffect(() => {
    datasets.forEach(({ edgeUUID, lat, lng }) => {
      if (edgeUUID === selectedEdgeUUID && isFinite(lat) && isFinite(lng)) {
        setCenterCoord([lat, lng])
      }
    })
  }, [datasets, selectedEdgeUUID])

  const numOfEdges = datasets.length
  const numOfActiveEdges = datasets.filter(({ lat }) => isFinite(lat)).length

  // Action ボタンを押したらなにか実行しよう！！
  // eslint-disable-next-line no-alert
  const doAction = useCallback(() => alert('Do Action!'), [])

  return (
    <S.Section>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
        integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=='crossorigin='"
      />

      <S.PanelBg top={LAYOUT_HEADER_HEIGHT}>
        <Scrollbar>
          <S.PanelInnterBg>
            <S.PanelHeaderArea>
              <S.PanelTitleLeftLarge>
                Driving {numOfActiveEdges}
              </S.PanelTitleLeftLarge>

              <S.PanelTitleRightSmall>
                /{numOfEdges} edges
              </S.PanelTitleRightSmall>
            </S.PanelHeaderArea>

            <S.EdgeCardsArea>
              {datasets.map((dataset, idx) => {
                const selected = selectedEdgeUUID === dataset.edgeUUID
                return (
                  <S.EdgeCard
                    key={idx}
                    selected={selected}
                    onClick={makeSetSelectedEdgeUUID(dataset.edgeUUID)}
                  >
                    <S.EdgeTitle>
                      {dataset.edgeName != '' ? dataset.edgeName : 'NO NAME'}
                    </S.EdgeTitle>

                    <S.WithSuffix>
                      <S.EdgeParameter>
                        SOC :
                        {isFinite(dataset.soc)
                          ? `${Math.ceil(dataset.soc * 100)}%`
                          : '--'}
                      </S.EdgeParameter>
                      {isFinite(dataset.soc) && (
                        <BarSubDivisionMeter ratio={dataset.soc} />
                      )}
                    </S.WithSuffix>

                    <S.EdgeParameter>
                      Speed :{' '}
                      {isFinite(dataset.speed) ? (
                        <>{dataset.speed.toFixed(0)} Km/h</>
                      ) : (
                        '--'
                      )}
                    </S.EdgeParameter>
                    {selected && (
                      <>
                        <S.EdgeParameter>Driver : aptpod</S.EdgeParameter>
                        <S.ActionArea>
                          <S.ActionButton onClick={doAction}>
                            Action
                          </S.ActionButton>
                        </S.ActionArea>
                      </>
                    )}
                  </S.EdgeCard>
                )
              })}
            </S.EdgeCardsArea>
          </S.PanelInnterBg>
        </Scrollbar>
      </S.PanelBg>

      <S.MapArea top={LAYOUT_HEADER_HEIGHT}>
        <Map
          key={mapContainerKey}
          center={centerCoord}
          zoom={zoom}
          zoomControl={OPEN_STREET_MAP_ZOOM_CONTROLS_DEFAULT}
          style={mapContainerStyle}
        >
          <TileLayer
            url={openStreetMap.url}
            attribution={openStreetMap.attribution}
          />
          {useMemo(() => {
            return datasets.map(({ lat, lng, heading, edgeUUID }, idx) => {
              const selected = selectedEdgeUUID === edgeUUID

              const carMarkerSvg = renderToString(
                <CarMarker
                  selected={selected}
                  rotationAngle={isFinite(heading) ? heading : 0}
                />,
              )
              const icon = makeMarkerIcon(
                utils.toDataURISchemaSvg(carMarkerSvg),
              )

              return (
                <React.Fragment key={idx}>
                  {isFinite(lat) && isFinite(lng) && (
                    <Marker
                      key={`Marker-${idx}`}
                      position={[lat, lng]}
                      icon={icon}
                      onClick={makeSetSelectedEdgeUUID(edgeUUID)}
                    />
                  )}
                </React.Fragment>
              )
            })
          }, [datasets, makeSetSelectedEdgeUUID, selectedEdgeUUID])}

          <S.MapZoomControllerArea>
            <MapZoomController
              onZoomInClick={onZoomIn}
              onZoomOutClick={onZoomOut}
            />
          </S.MapZoomControllerArea>
        </Map>
      </S.MapArea>
    </S.Section>
  )
})

/**
 * Marker のアイコンを作成する
 */
const makeMarkerIcon = (iconURL: string) => {
  return new Icon({
    iconUrl: iconURL,
    iconRetinaUrl: iconURL,
    iconAnchor: [32, 32],
    iconSize: new Point(64, 64),
  })
}
