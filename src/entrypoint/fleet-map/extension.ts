import * as Z from 'zod'
import { Metadata } from '@aptpod/data-viz-visual-parts-sdk'
import { estimate, estimatePartialObject } from 'src/utils/zod'

/**
 * Extension の型を定義
 */
export type Extension = {
  openStreetMapURL: string
  openStreetMapAttribution: string
}

/**
 * Extension のDefault値を設定します。
 */
export const defaultExtension: Extension = {
  openStreetMapURL: '',
  openStreetMapAttribution: '',
}

/**
 * Extension のスキーマ定義します。
 */
export const schema = {
  openStreetMapURL: Z.string(),
  openSteetMapAttribution: Z.string(),
}

/**
 * Extension の各フィールドをチェックします。
 */
export const parse = (anyExtension: any): Extension => {
  const def = defaultExtension
  const ext = estimatePartialObject<Extension>(anyExtension)

  // eslint-disable-next-line prettier/prettier
  const openStreetMapURL = estimate(schema.openStreetMapURL, ext.openStreetMapURL, def.openStreetMapURL)
  // eslint-disable-next-line prettier/prettier
  const openStreetMapAttribution = estimate(schema.openStreetMapURL, ext.openStreetMapAttribution, def.openStreetMapAttribution)

  return {
    openStreetMapURL,
    openStreetMapAttribution,
  }
}

/**
 * Data VisualizerのPanel Optionに表示する入力項目を定義します。
 */
export const EXTENSION_CONFIGS: Metadata['panelOptionConfig']['extensionConfigs'] = [
  {
    id: 'InputText',
    key: 'openStreetMapURL',
    label: 'OpenStreetMap URL',
    option: { placeholder: 'URL' },
  },
  {
    id: 'InputText',
    key: 'openStreetMapAttribution',
    label: 'OpenStreetMap Attribution',
    option: { placeholder: 'HTML Source Code' },
  },
]
