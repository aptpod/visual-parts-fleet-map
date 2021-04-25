import React, { memo, useMemo, useState, useCallback, useEffect } from 'react'
import { renderToString } from 'react-dom/server'

import { TileLayer, Marker, Map } from 'react-leaflet'
import { Icon, Point } from 'leaflet'

import { MapZoomController } from './parts/map-zoom-controller'
import { CarMarker } from './parts/car-maker'
import { Scrollbar } from './parts/scrollbar'
import { EdgesPanelTitle } from './parts/edges-panel-title'
import { EdgeCard } from './parts/edge-card'

import * as C from './constant'
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
    C.OPEN_STREET_MAP_LAT_LNG_DEFAULT,
  )
  const [zoom, setZoom] = useState(C.OPEN_STREET_MAP_ZOOM_DEFAULT)
  const [selectedEdgeUUID, setSelectedEdgeUUID] = useState(C.EDGE_UNSELECTED)

  // Zoom In / Outイベントハンドラ
  const onZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 1, C.OPEN_STREET_MAP_ZOOM_IN_LIMIT))
  }, [])
  const onZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - 1, C.OPEN_STREET_MAP_ZOOM_OUT_LIMIT))
  }, [])

  // Mapを表示するサイズ、または OpenSteetMapのURLが変更になったら
  // Mapを再描画するようにKeyも変更する
  const mapKey = `${width}-${height}-${openStreetMap.url}`

  // マップのコンテナスタイル
  const mapContainerStyle = useMemo(
    () => ({
      width,
      height: height - C.LAYOUT_HEADER_HEIGHT,
    }),
    [width, height],
  )

  // マップの Center 座標を更新する
  // Edgeが未選択、または Lat, Lng が無効値なら更新しない
  useEffect(() => {
    datasets.forEach(({ edgeUUID, lat, lng }) => {
      if (edgeUUID === selectedEdgeUUID && utils.isFiniteLatLng(lat, lng)) {
        setCenterCoord([lat, lng])
      }
    })
  }, [datasets, selectedEdgeUUID])

  // Edgeを選択するイベントハンドラを作成する
  // すでに同一のEdgeが選択済みの場合は選択を解除する
  const makeOnSelectEdgeUUID = useCallback((edgeUUID: string) => {
    return () => {
      setSelectedEdgeUUID((prev) => {
        return prev === edgeUUID ? C.EDGE_UNSELECTED : edgeUUID
      })
    }
  }, [])

  //Car Marker の Icon を作成する
  const makeCarMarkerIcon = useCallback(
    (selected: boolean, heading: number) => {
      return new Icon({
        iconUrl: utils.toDataURISchemaSvg(
          renderToString(
            <CarMarker
              size={C.CAR_MARKER_SIZE}
              selected={selected}
              rotationAngle={
                isFinite(heading) ? heading : C.CAR_MARKER_HEADING_DEFAULT
              }
            />,
          ),
        ),
        iconAnchor: [C.CAR_MARKER_SIZE / 2, C.CAR_MARKER_SIZE / 2],
        iconSize: new Point(C.CAR_MARKER_SIZE, C.CAR_MARKER_SIZE),
      })
    },
    [],
  )

  // Edgeの数を判定する
  const numOfEdge = datasets.length
  const numOfActiveEdge = useMemo(
    () =>
      datasets.filter(({ lat, lng }) => utils.isFiniteLatLng(lat, lng)).length,
    [datasets],
  )

  // Action ボタンを押したらDriverに指示を送ろう！！
  // eslint-disable-next-line no-alert
  const doAction = useCallback(() => alert(C.DO_ACTION_MESSAGE), [])

  return (
    <S.Section marginTop={C.LAYOUT_HEADER_HEIGHT}>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
        integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=='crossorigin='"
      />

      <S.EdgesPanelArea>
        <Scrollbar>
          <S.EdgesPanelBg>
            <S.EdgesPanelHeaderArea>
              <EdgesPanelTitle
                numOfActiveEdge={numOfActiveEdge}
                numOfTotalEdge={numOfEdge}
              />
            </S.EdgesPanelHeaderArea>

            <S.EdgeCardsArea>
              {useMemo(() => {
                return datasets.map((dataset, idx) => (
                  <EdgeCard
                    key={idx}
                    selected={selectedEdgeUUID === dataset.edgeUUID}
                    name={utils.formatEdgeName(dataset.edgeName, C.NO_NAME)}
                    soc={utils.formatSocString(dataset.soc, C.INVALID_STRING)}
                    socRatio={utils.formatSocRatio(
                      dataset.soc,
                      C.SOC_RATIO_DEFAULT,
                    )}
                    speed={utils.formatSppedString(
                      dataset.speed,
                      C.INVALID_STRING,
                    )}
                    driver={C.DRIVER_NAME}
                    onCardClick={makeOnSelectEdgeUUID(dataset.edgeUUID)}
                    onActionClick={doAction}
                  />
                ))
              }, [datasets, doAction, makeOnSelectEdgeUUID, selectedEdgeUUID])}
            </S.EdgeCardsArea>
          </S.EdgesPanelBg>
        </Scrollbar>
      </S.EdgesPanelArea>

      <S.MapArea>
        <Map
          key={mapKey}
          center={centerCoord}
          zoom={zoom}
          zoomControl={C.OPEN_STREET_MAP_ZOOM_CONTROLS_DEFAULT}
          style={mapContainerStyle}
        >
          <TileLayer
            url={openStreetMap.url}
            attribution={openStreetMap.attribution}
          />

          {useMemo(() => {
            return datasets.map((dataset, idx) => (
              <React.Fragment key={idx}>
                {utils.isFiniteLatLng(dataset.lat, dataset.lng) && (
                  <Marker
                    position={[dataset.lat, dataset.lng]}
                    icon={makeCarMarkerIcon(
                      selectedEdgeUUID === dataset.edgeUUID,
                      dataset.heading,
                    )}
                    onClick={makeOnSelectEdgeUUID(dataset.edgeUUID)}
                  />
                )}
              </React.Fragment>
            ))
          }, [
            datasets,
            makeCarMarkerIcon,
            makeOnSelectEdgeUUID,
            selectedEdgeUUID,
          ])}

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
