import * as React from 'react';
import { useState } from 'react';
import moment from 'moment';
import partyhatt from './partyhatt.svg';
import styled, { createGlobalStyle, css, keyframes } from 'styled-components';
import { pxToRem } from '../../../../styles/personOversiktTheme';
import Fireworks from './Fireworks';

const dropLogo = keyframes`
  to {
    transform: translateY(1.5rem);
  }
`;

const GlobalStyles = createGlobalStyle`
  .dekorator__hode__logo svg {
    animation: ${dropLogo} 1.5s forwards 1.5s;
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
}
20% {
  bottom: 1rem;
}
  to {
    bottom: -4rem;
    opacity: 0;
  }
`;

const Position = styled.div`
    position: absolute;
    left: ${pxToRem(31)};
    top: ${pxToRem(-4)};
    animation: ${spinUp} 0.7s both 2.5s;
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

function Partyhatt(props: { forceShow: boolean }) {
    const today = moment();
    const erNyttårsaften = today.month() === 11 && today.date() === 31;

    const [fireworks, setFireworks] = useState(false);

    if (erNyttårsaften || props.forceShow) {
        return (
            <Position>
                <GlobalStyles />
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

    return null;
}

export default Partyhatt;
