import styled from 'styled-components';

const FillCenterAndFadeIn = styled.div`
    flex-grow: 1;
    margin: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${props => props.theme.animation.fadeIn};
`;

export default FillCenterAndFadeIn;
