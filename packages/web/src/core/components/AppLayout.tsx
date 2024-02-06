import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { SideNav } from './SideNav'

const AppWrapper = styled.div`
  display: flex;
`

const AppContainer = styled.div`
  width: 100%;
  margin-left: ${(props) => props.theme.navWidth}px;
  background-color: ${(props) => props.theme.bgColor}px;

  padding: ${(props) => props.theme.pagePadding}px;
`

export const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <AppWrapper>
      <SideNav />
      <AppContainer>{children}</AppContainer>
    </AppWrapper>
  )
}
