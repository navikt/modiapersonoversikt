import styled from 'styled-components';
import { styles } from '../styles/personOversiktStyles';

const FillCenterAndFadeIn = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${styles.animation.fadeIn};
`;

export default FillCenterAndFadeIn;
