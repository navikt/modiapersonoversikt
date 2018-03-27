import styled from 'styled-components';

const FillCenterAndFadeIn = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    @keyframes fadeIn{ 0% { opacity: 0 } }
    animation: fadeIn .5s ease-out;
`;

export default FillCenterAndFadeIn;
