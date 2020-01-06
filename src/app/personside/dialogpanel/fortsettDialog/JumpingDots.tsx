import * as React from 'react';
import styled, { keyframes } from 'styled-components/macro';
import { pxToRem } from '../../../../styles/personOversiktTheme';

const dotHeight = 7;

const Wave = keyframes`
0%, 40%, 100% {
  transform: initial;
}
70% {
  transform: translateY(${pxToRem(-dotHeight)});
}
`;

const Wrapper = styled.div`
    display: inline-block;
    padding: ${pxToRem(dotHeight)} ${pxToRem(dotHeight)} ${pxToRem(dotHeight / 2)};
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: ${dotHeight / 8}rem;
`;

const Dot = styled.span`
    display: inline-block;
    width: ${pxToRem(dotHeight)};
    height: ${pxToRem(dotHeight)};
    border-radius: 50%;
    margin-right: ${pxToRem(dotHeight / 3)};
    background: dimgray;
    animation: ${Wave} 1.3s infinite ease-in-out;
    &:nth-child(2) {
        animation-delay: 0.2s;
    }
    &:nth-child(3) {
        animation-delay: 0.4s;
    }
`;

function JumpingDots() {
    return (
        <Wrapper>
            <Dot />
            <Dot />
            <Dot />
        </Wrapper>
    );
}

export default JumpingDots;
