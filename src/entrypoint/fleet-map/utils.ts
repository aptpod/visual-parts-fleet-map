export const toDataURISchemaSvg = (svgString: string) => {
  return `data:image/svg+xml,${encodeURIComponent(svgString)}`
}
