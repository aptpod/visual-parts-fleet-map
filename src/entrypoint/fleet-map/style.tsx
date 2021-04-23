/* stylelint-disable a11y/font-size-is-readable */

import styled from 'styled-components'

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

export const PanelBg = styled.div<{ top: number }>`
  position: absolute;
  z-index: 9999;
  top: ${({ top }) => top + 20}px;
  right: 20px;
  box-sizing: border-box;
  width: 320px;
  height: ${({ top }) => `calc(100% - ${top}px - 40px)`};
  background-color: rgba(0, 0, 0, 0.8);
`

export const PanelInnterBg = styled.div`
  box-sizing: border-box;
  padding: 24px 20px;
`

export const PanelHeaderArea = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
`

export const PanelTitleLeftLarge = styled.span`
  color: #fff;
  font-size: 24px;
`

export const PanelTitleRightSmall = styled.span`
  position: relative;
  top: -2px;
  color: #fff;
  font-size: 16px;
`

export const EdgeCardsArea = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 24px;

  & > *:nth-child(n + 2) {
    margin-top: 8px;
  }
`

export const EdgeCard = styled.div<{ selected: boolean }>`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;
  height: ${({ selected: s }) => (s ? '156px' : '84px')};
  padding: 12px 16px;
  overflow: hidden;
  transition: 0.2s;
  border: solid 1px transparent;
  border-color: ${({ selected: s }) =>
    s ? '#2facff' : 'rgba(255, 255, 255, 0.5)'};
  background-color: ${({ selected: s }) =>
    s ? 'rgba(47, 172, 255, 0.2)' : 'transparent'};
  line-height: 1.5;
  cursor: pointer;
`

export const EdgeTitle = styled.span`
  color: #fff;
  font-size: 14px;
`

export const EdgeParameter = styled.span`
  color: #fff;
  font-size: 12px;
`

export const WithSuffix = styled.div`
  display: flex;
  align-items: center;

  & > *:nth-child(n + 2) {
    margin-left: 8px;
  }
`

export const ActionArea = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 12px;
`

export const ActionButton = styled.button`
  align-self: center;
  width: 100px;
  height: 32px;
  border-width: 0;
  border-radius: 4px;
  background-color: #2facff;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
`

export const MapZoomControllerArea = styled.div`
  position: absolute;
  z-index: 9999;
  bottom: 40px;
  left: 10px;
`

export const MapArea = styled.div<{ top: number }>`
  position: absolute;
  top: ${({ top }) => top}px;
`
