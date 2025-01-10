import { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import Chick from './Chick';

const rollIn = keyframes`
  from {
    left: -10rem;
    transform: rotate(-600deg);
  }
  to {
    transform: rotate(30deg);
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
    left: 3.2rem;
    top: 0.75rem;
`;

const RollIn = styled.div`
    left: 0;
    position: relative;
    animation: ${rollIn} 2.5s both ease-out;
`;

const StyledImg = styled.img<{ shake: boolean; clickable: boolean }>`
    height: 2rem;
    ${(props) =>
        props.clickable &&
        css`
            cursor: pointer;
        `};
    ${(props) =>
        props.shake &&
        css`
            animation: ${shake} 0.1s linear -0.05s 4.5 alternate;
        `};
`;

function PaaskeEgg() {
    const [chick, setChick] = useState(false);

    useEffect(() => {
        if (chick) {
            const timeout = setTimeout(() => setChick(false), 3000);
            return () => clearTimeout(timeout);
        }
        return () => null;
    }, [chick]);

    return (
        <Position>
            {chick && <Chick />}
            <RollIn>
                <StyledImg
                    shake={chick}
                    onClick={() => setChick(true)}
                    clickable={!chick}
                    src="./paaskeegg.svg"
                    alt="påskeegg"
                />
            </RollIn>
        </Position>
    );
}

export default PaaskeEgg;
