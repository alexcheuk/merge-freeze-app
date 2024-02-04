import * as React from 'react'

import { SpaceItemStyled } from './styles/SpaceItemStyled'
import { SpaceStyled } from './styles/SpaceStyled'
import { FLEX_ALIGN, FLEX_DIRECTIONS, FLEX_JUSTIFY } from './types'
export interface ISpaceProps {
  /**
   * Sets the gutter space between each children
   */
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'

  /**
   * Defines the direction flex items are placed in the container
   */
  direction?: 'horizontal' | 'vertical'

  /**
   * Defines the behavior for how items are laid out along the cross axis.
   */
  align?: 'center' | 'start' | 'end' | 'baseline' | 'stretch'

  /**
   * Defines the behavior for how items are laid out along the main axis
   */
  justify?:
    | 'start'
    | 'end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  /**
   * Wrap items onto multiple lines
   */
  flexWrap?: boolean
}

export const Space = ({
  size = 'medium',
  direction = 'vertical',
  align,
  justify = 'start',
  flexWrap = false,
  children,
  ...props
}: React.PropsWithChildren<ISpaceProps>) => {
  return (
    <SpaceStyled
      size={size}
      direction={FLEX_DIRECTIONS[direction]}
      align={align ? FLEX_ALIGN[align] : undefined}
      justify={FLEX_JUSTIFY[justify]}
      flexWrap={flexWrap}
    >
      {React.Children.map(
        children,
        (child) =>
          React.isValidElement(child) && (
            <SpaceItemStyled>
              {child &&
                React.cloneElement(child as React.ReactElement<any>, props)}
            </SpaceItemStyled>
          )
      )}
    </SpaceStyled>
  )
}
