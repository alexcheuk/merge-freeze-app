import { PropsWithChildren } from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'
import styled from 'styled-components'
import { Space } from '../Space'

export const TabStyled = styled.div`
  border-bottom: 1px solid #ccc;
`

export const TabItem = styled((props: NavLinkProps) => <NavLink {...props} />)`
  display: inline-block;
  color: ${(props) => props.theme.textSecondary};
  padding: 12px 12px;
  position: relative;
  font-weight: 500;
  font-size: 14px;

  text-align: center;

  &.active {
    color: ${(props) => props.theme.textPrimary};
  }

  &.active:after {
    position: absolute;
    content: '';
    display: block;
    bottom: 0;
    height: 3px;
    left: 0;
    right: 0;

    background-color: ${(props) => props.theme.primaryColor};
  }
`

export const Tabs = ({ children }: PropsWithChildren) => {
  return (
    <TabStyled>
      <Space direction='horizontal'>{children}</Space>
    </TabStyled>
  )
}

Tabs.Item = TabItem
