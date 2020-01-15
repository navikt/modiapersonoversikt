import * as React from 'react';
import styled, { keyframes } from 'styled-components/macro';
import { useOnMount } from '../../../../utils/customHooks';
import { loggEvent } from '../../../../utils/frontendLogger';

const descend = keyframes`
    from {
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    65% {
      opacity: 1;
    }
      to {
        top: 8rem;
        opacity: 0;
      }
`;

const speed = (x: number, y: number) => keyframes`
  to {
    transform: translate(${x * 6}rem, ${y * 7}rem);
  }
`;

const Base = styled.div`
    position: absolute;
    top: 0.4rem;
    left: 1.3rem;
    pointer-events: none;
`;

const Glow = styled.div<{ xSpeed: number; ySpeed: number }>`
    &:nth-child(odd) {
        background-color: blue;
    }
    &:nth-child(even) {
        background-color: greenyellow;
    }
    position: absolute;
    top: 2rem;
    height: 0.25rem;
    width: 0.25rem;
    border-radius: 50%;
    z-index: 10;
    box-shadow: 0 0 4px black;
    animation: ${descend} ease-in 3s both -0.2s,
        ${props => speed(props.xSpeed, props.ySpeed)} ease-out 3s forwards -0.2s;
`;

function Fireworks() {
    useOnMount(() => {
        loggEvent('Fyrverkeri', 'EasterEgg');
    });

    return (
        <Base>
            {[...new Array(15)].map((_, index) => (
                <Glow key={index} xSpeed={0.5 - Math.random()} ySpeed={-Math.random()} />
            ))}
        </Base>
    );
}

export default Fireworks;
