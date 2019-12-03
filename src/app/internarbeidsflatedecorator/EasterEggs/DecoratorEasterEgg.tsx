import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import nisselue from './nisselue.svg';
import moment from 'moment';

const dropDown = keyframes`
  from {
    top: -10rem;
  }
`;

const StyledImg = styled.img`
    position: absolute;
    height: 3rem;
    top: 0;
    left: 1.1rem;
    transform: rotateY(180deg);
    animation: ${dropDown} 1.5s backwards 1.5s;
`;

function DecoratorEasterEgg() {
    const today = moment();
    const erJul = today.month() === 11 && 17 < today.date() && today.date() < 28;

    if (erJul) {
        return <StyledImg src={nisselue} alt="nisselue" />;
    }

    return null;
}

export default DecoratorEasterEgg;
