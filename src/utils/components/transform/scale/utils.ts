export const calculateScale = (params: {
  originalWidth: number
  originalHeight: number
  width: number
  height: number
}) => {
  const { originalWidth, originalHeight, width, height } = params
  const scaleX = width / originalWidth
  const scaleY = height / originalHeight
  const scale = Math.min(scaleX, scaleY)
  return scale
}
