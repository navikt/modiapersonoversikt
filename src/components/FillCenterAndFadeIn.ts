import styled from 'styled-components';
import theme from '../styles/personOversiktTheme';

const FillCenterAndFadeIn = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    ${theme.animation.fadeIn};
    > * {
        flex: 0 1 25rem;
        display: flex;
        justify-content: center;
    } /* IE-11 fix */
`;

export default FillCenterAndFadeIn;
