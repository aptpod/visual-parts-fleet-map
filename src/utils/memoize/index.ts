/**
 * メモ化したfunctionを作成します。
 */
export function memoize<T extends any[], U>(
  calcFunc: (...params: T) => U,
): (...params: T) => U {
  let cacheParams: T | void
  let cacheValue: U | void

  return (...params: T): U => {
    // キャッシュなし
    if (
      typeof cacheParams === 'undefined' ||
      typeof cacheValue === 'undefined'
    ) {
      cacheValue = calcFunc(...params)
      cacheParams = params
      return cacheValue
    }

    // キャッシュあり
    for (let i = 0; i < params.length; i++) {
      //  差分あり
      if (
        params.length !== cacheParams.length ||
        params[i] !== cacheParams[i]
      ) {
        cacheValue = calcFunc(...params)
        cacheParams = params
        return cacheValue
      }
    }

    // 差分なし
    return cacheValue
  }
}
