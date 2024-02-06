import { PropsWithChildren } from 'react'
import styled from 'styled-components'

export interface HeaderProps {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
}

const sizeMap: { [key in HeaderProps['as']]: string } = {
  h1: 'text-4xl',
  h2: 'text-xl',
  h3: 'text-lg',
  h4: 'text-base',
  h5: 'text-sm',
}

const HeaderStyled = styled.h1`
  color: ${(props) => props.theme.textPrimary};
  font-weight: 700;

  margin-bottom: 1em;
`

export const Header = ({
  as = 'h1',
  ...props
}: PropsWithChildren<HeaderProps>) => {
  return (
    <HeaderStyled
      as={as}
      className={`${sizeMap[as] || sizeMap.h1}`}
      {...props}
    />
  )
}
