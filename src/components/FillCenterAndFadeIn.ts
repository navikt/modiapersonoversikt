import styled from 'styled-components';
import { theme } from '../styles/personOversiktTheme';

const FillCenterAndFadeIn = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${theme.animation.fadeIn};
`;

export default FillCenterAndFadeIn;
