import { createGlobalStyle } from 'styled-components'
import reboot from 'reboot.css'

import { custom } from './custom-shadow'

export const StyledShadowStyle = createGlobalStyle`
  ${reboot}
  ${custom}
`
