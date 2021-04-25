import styled from 'styled-components'

export const Section = styled.section<{ marginTop: number }>`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: ${({ marginTop }) => `calc(100% - ${marginTop}px)`};
  margin-top: ${({ marginTop }) => `${marginTop}px`};
`

export const EdgesPanelArea = styled.div`
  position: absolute;
  z-index: 9999;
  top: 20px;
  right: 20px;
  box-sizing: border-box;
  width: 320px;
  height: calc(100% - 40px);
`

export const EdgesPanelBg = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 24px 20px;
  background-color: rgba(0, 0, 0, 0.8);
`

export const EdgesPanelHeaderArea = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
`

export const EdgeCardsArea = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 24px;

  & > *:nth-child(n + 2) {
    margin-top: 8px;
  }
`

export const MapArea = styled.div`
  position: absolute;
`

export const MapZoomControllerArea = styled.div`
  position: absolute;
  z-index: 9999;
  bottom: 40px;
  left: 10px;
`
