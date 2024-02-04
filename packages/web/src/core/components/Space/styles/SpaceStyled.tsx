import styled from "styled-components";

import { ISpaceProps } from "../Space";
import { flexAlign, flexDirection, flexJustify } from "../types";

interface ISpaceStyledProps {
  size: ISpaceProps["size"];
  direction: flexDirection;
  align: flexAlign;
  justify: flexJustify;
  flexWrap: ISpaceProps["flexWrap"];
}

const spaces = {
  xsmall: 4,
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
};

export const SpaceStyled = styled.div<ISpaceStyledProps>`
  width: 100%;
  gap: ${(props) => `${spaces[props.size || "small"]}px`};
  display: inline-flex;
  flex-direction: ${(props) => props.direction};
  ${(props) =>
    props.align &&
    `
  align-items: ${props.align};
  `}
  justify-content: ${(props) => props.justify};
  flex-wrap: ${(props) => (props.flexWrap ? `wrap` : `nowrap`)};

  /* Mitigates Chromium bug for empty divs with gap property https://bugs.chromium.org/p/chromium/issues/detail?id=1161709 */
  &:empty {
    gap: unset;
  }
`;

SpaceStyled.displayName = "SpaceStyled";
