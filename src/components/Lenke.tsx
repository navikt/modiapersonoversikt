import styled from 'styled-components';

const Lenke = styled.span`
    font-family: "Source Sans Pro", sans-serif;
    line-height: 1.1;
    background-color: transparent;
    color: ${props => props.theme.color.lenke};
    background: none;
    text-decoration: none;
    border-bottom: 1px solid rgb(183, 177, 169);
    cursor: pointer;
    &:hover{
      border-bottom: 1px solid ${props => props.theme.color.lenke};
    }
`;

export default Lenke;
