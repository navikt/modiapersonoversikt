import * as React from 'react';
import { useEffect, useState } from 'react';
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
    const [sno, setSno] = useState(false);

    useEffect(() => {
        if (sno) {
            const timeout = setTimeout(() => setSno(false), 6000);
            return () => clearTimeout(timeout);
        }
        return () => null;
    }, [sno]);

    return (
        <Position>
            {sno && <Sno />}
            <StyledImg shake={sno} onClick={() => setSno(true)} clickable={!sno} src={nisselue} alt="nisselue" />
        </Position>
    );
}

export default Nisselue;
