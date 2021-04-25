/* stylelint-disable a11y/font-size-is-readable */

import styled from 'styled-components'

export const Section = styled.section<{ selected: boolean }>`
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

export const Title = styled.span`
  color: #fff;
  font-size: 14px;
`

export const Property = styled.span`
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

export const ActionButtonArea = styled.div`
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
