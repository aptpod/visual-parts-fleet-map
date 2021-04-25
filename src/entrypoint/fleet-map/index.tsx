import {
  expose,
  Renderer,
  Metadata,
  ExposerEvent,
} from '@aptpod/data-viz-visual-parts-sdk'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

// Shadow DOM に適用するStyle
import { StyledShadowStyle } from '../../styles/shadow'
// Styled Components を Shadow DOM 以下で適用するための Utility
import { StyleSheetManagerWrapper } from '../../utils/components/style/stylesheet-manager-wrapper'

import { FleetMapContainer } from './container'
import { EXTENSION_CONFIGS, defaultExtension } from './extension'
import thumbnailSrc from 'src/assets/images/fleet-map/th-fleet-map@3x.png'

/**
 * Metadata 作成
 */
const metadata: Metadata = {
  partsType: '@demo/fleet-map',
  partsName: 'Fleet Map',
  groupName: 'Demo',
  panelTagName: 'x-demo-fleet-map',
  getThumbnailURL: (baseURL: string) => `${baseURL}${thumbnailSrc}`,
  panelViewConfig: {
    displayTimestamp: true,
  },
  panelOptionConfig: {
    rangeAtMost: 0,
    canEditColor: false,
    bindDataCountMax: 250,
    extensionConfigs: EXTENSION_CONFIGS,
  },
  defaultExtension,
}

/**
 * Renderer クラスを継承したPluginRendererを定義します。
 */
class PluginRenderer extends Renderer {
  /**
   * 描画を実行します。 1回だけコールします。
   * 状態を変更する場合は、 ExposerEvent のイベントを利用し、 element のDOMを再描画します。
   */
  // eslint-disable-next-line class-methods-use-this
  render(el: HTMLElement, comm: ExposerEvent) {
    // Reactを使用した描画
    render(
      <StyleSheetManagerWrapper>
        <>
          <StyledShadowStyle />
          <FleetMapContainer comm={comm} />
        </>
      </StyleSheetManagerWrapper>,
      el,
    )
  }
  /**
   * element に紐づく子要素のDOMや子要素のイベントハンドラを解放します。
   * HTMLElement は、 render メソッドに引数として渡された HTMLElement （コンテナ）と同じです。
   */
  // eslint-disable-next-line class-methods-use-this
  dispose(el: HTMLElement) {
    unmountComponentAtNode(el)
  }
}

/**
 * 作成した metadata, renderer を公開します。
 */
expose({
  metadata,
  renderer: PluginRenderer,
})
