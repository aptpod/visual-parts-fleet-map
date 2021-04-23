/**
 * 指定した引数の個数の要素を持つ配列作成します。
 */
export const buildEmptyArray = (num: number) => {
  return [...new Array(num)]
}

/**
 * 可変引数から null ではない要素のみを抽出した配列を取得します。
 */
export const selectNonNullables = <T>(...nullables: T[]): NonNullable<T>[] => {
  return nullables.filter((v): v is NonNullable<typeof v> => v !== null)
}
