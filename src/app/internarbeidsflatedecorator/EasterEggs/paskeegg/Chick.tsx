import styled, { keyframes } from 'styled-components';
import chickIcon from './chickIcon.svg';
import { useOnMount } from '../../../../utils/customHooks';
import { loggEvent } from '../../../../utils/logger/frontendLogger';

const run = keyframes`
  70% {
    opacity: 1;
  }
  to {
    left: 50vw;
    opacity: 0;
  }
`;

const wag = keyframes`
  from {
    transform: rotate(-15deg);
  }
  to {
    transform: rotate(5deg);
  }
`;

const StyledImg = styled.img`
    animation: ${wag} 0.1s infinite alternate;
    height: 1.9rem;
`;

const Position = styled.div`
    position: absolute;
    left: 0;
    transform: rotateY(180deg);
    animation: ${run} 2.5s linear forwards 0.2s;
    pointer-events: none;
`;

function Chick() {
    useOnMount(() => {
        loggEvent('KlukkKlukk', 'EasterEgg');
    });

    return (
        <Position>
            <StyledImg src={chickIcon} alt="kylling pip pip pip" />
        </Position>
    );
}

export default Chick;
