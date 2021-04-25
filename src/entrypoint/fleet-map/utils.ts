export const formatEdgeName = (edgeName: string, stringWhenEmpty: string) => {
  return edgeName != '' ? edgeName : stringWhenEmpty
}
export const formatSocString = (soc: number, stringWhenInvalid: string) => {
  return isFinite(soc) ? `${Math.ceil(soc * 100)}%` : stringWhenInvalid
}

export const formatSocRatio = (soc: number, numberWhenInvalid: number) => {
  return isFinite(soc) ? soc : numberWhenInvalid
}

export const formatSppedString = (speed: number, stringWhenInvalid: string) => {
  return isFinite(speed)
    ? `${Math.ceil(speed).toFixed(0)} Km/h`
    : stringWhenInvalid
}

export const isFiniteLatLng = (lat: number, lng: number) => {
  return isFinite(lat) && isFinite(lng)
}

export const toDataURISchemaSvg = (svgString: string) => {
  return `data:image/svg+xml,${encodeURIComponent(svgString)}`
}
