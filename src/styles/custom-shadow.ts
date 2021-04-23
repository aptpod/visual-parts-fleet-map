import { css } from 'styled-components'

const DEFAULT_BG_COLOR = 'red'
const DEFAULT_TEXT_COLOR = 'white'
const COLOR_TRANSPARENT = 'transparent'

export const custom = css`
  :host-context(*) {
    transition-timing-function: ease-in-out;
  }

  :host {
    font-size: 62.5%; /* 10px */
    -webkit-font-smoothing: antialiased;
    line-height: 1;
  }

  :host {
    /* stylelint-disable-next-line plugin/no-unsupported-browser-features */
    width: max-content;
    background-color: ${DEFAULT_BG_COLOR};
    color: ${DEFAULT_TEXT_COLOR};
    line-height: 1;
  }

  :host-context(img) {
    color: ${COLOR_TRANSPARENT};
  }

  :host-context(h1),
  :host-context(p),
  :host-context(label),
  :host-context(dl),
  :host-context(dt),
  :host-context(dd) {
    margin: 0;
  }

  :host-context(h1) {
    font-weight: normal;
  }

  :host-context(a:hover),
  :host-context(a:focus) {
    text-decoration: none;
  }

  :host-context(input::-ms-clear) {
    visibility: hidden;
  }

  :host-context(input::-ms-reveal) {
    visibility: hidden;
  }

  :host-context(ul) {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  /* Chrome Browser: Scrollbar が表示されない症状の対策  */
  :host-context(::-webkit-scrollbar) {
    min-width: 1px;
    min-height: 1px;
  }
`
