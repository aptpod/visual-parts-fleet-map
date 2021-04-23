import styled from 'styled-components'

export const Section = styled.section`
  display: flex;
  position: relative;
  height: 12px;

  & > *:nth-child(n + 2) {
    margin-left: 2px;
  }
`

export const Bar = styled.div<{ color: string }>`
  width: 3px;
  background-color: ${({ color: c }) => c};
`
