import * as React from 'react';
import { useState } from 'react';
import moment from 'moment';
import nisselue from './nisselue.svg';
import styled, { css, keyframes } from 'styled-components';
import Sno from './Sno';

const dropDown = keyframes`
  from {
    top: -10rem;
  }
`;

const shake = keyframes`
  from {
    margin-left: -.2rem;
  }
  to {
    margin-left: .2rem;
  }
`;

const Position = styled.div`
    position: absolute;
    left: 1.1rem;
    top: 0;
    animation: ${dropDown} 1.5s backwards 1.5s;
`;

const StyledImg = styled.img<{ shake: boolean; clickable: boolean }>`
    height: 3rem;
    transform: rotateY(180deg);
    ${props =>
        props.clickable &&
        css`
            cursor: pointer;
        `};
    ${props =>
        props.shake &&
        css`
            animation: ${shake} 0.1s linear -0.05s 4.5 alternate;
        `};
`;

function Nisselue() {
    const today = moment();
    const erJul = today.month() === 11 && 17 <= today.date() && today.date() <= 28;

    const [sno, setSno] = useState(false);

    if (erJul) {
        return (
            <Position>
                {sno && <Sno />}
                <StyledImg shake={sno} onClick={() => setSno(true)} clickable={!sno} src={nisselue} alt="nisselue" />
            </Position>
        );
    }

    return null;
}

export default Nisselue;
