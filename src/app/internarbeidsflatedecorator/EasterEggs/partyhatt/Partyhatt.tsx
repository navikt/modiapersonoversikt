import * as React from 'react';
import { useState } from 'react';
import partyhatt from './partyhatt.svg';
import styled, { createGlobalStyle, css, keyframes } from 'styled-components/macro';
import { pxToRem } from '../../../../styles/personOversiktTheme';
import Fireworks from './Fireworks';

const GlobalStyles = createGlobalStyle<{ dropNavLogo: boolean }>`
  .dekorator__hode__logo svg {
      transition: 2s;
      ${props =>
          props.dropNavLogo &&
          css`
              transform: translateY(1.5rem);
              border-right: 1px solid transparent !important;
          `};
  }
`;

const spinUp = keyframes`
  from {
    opacity: 0;
    transform: rotate(180deg);
  }
  20% {
    opacity: 1;
  }
`;

const jump = keyframes`
from {
  bottom: 0;
  left: 0;
}
20% {
  bottom: 1rem;
}
  to {
    bottom: -4rem;
    left: 1rem;
    opacity: 0;
  }
`;

const Position = styled.div`
    position: absolute;
    left: ${pxToRem(31)};
    top: ${pxToRem(-4)};
    animation: ${spinUp} 0.5s both 2s;
    transform-origin: bottom;
`;

const StyledImg = styled.img<{ jump: boolean; clickable: boolean }>`
    position: relative;
    height: 3.3rem;
    transform: rotateY(180deg);
    ${props =>
        props.clickable &&
        css`
            cursor: pointer;
        `};
    ${props =>
        props.jump &&
        css`
            animation: ${jump} 1s forwards;
        `};
`;

function Partyhatt() {
    const [fireworks, setFireworks] = useState(false);

    return (
        <Position>
            <GlobalStyles dropNavLogo={!fireworks} />
            {fireworks && <Fireworks />}
            <StyledImg
                jump={fireworks}
                onClick={() => setFireworks(true)}
                clickable={!fireworks}
                src={partyhatt}
                alt="partyhatt"
            />
        </Position>
    );
}

export default Partyhatt;
