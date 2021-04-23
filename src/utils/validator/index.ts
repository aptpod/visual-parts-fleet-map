// 表示可能な数値
export const canDisplayNumber = (value: any) => {
  // 文字列の数値も許容する、ただし、空文字列, null は許容しない
  return isFinite(value) && value !== null && value !== ''
}
