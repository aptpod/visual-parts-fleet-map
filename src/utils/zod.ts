import * as Z from 'zod'

export const estimate = <T extends any>(
  z: Z.ZodTypeAny,
  target: T | undefined,
  default_: T,
): T => {
  return (z.check(target) ? target : default_) as T
}

export const estimatePartialObject = <T extends {}>(
  target: any,
): Partial<T> => {
  return estimate(Z.object({}).nonstrict(), target, {})
}
