import styled from 'styled-components';

const Lamell = styled.div`
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            padding: 1%;
            min-height: 400px;
            > * {
              flex-grow: 1;
            }
        `;

export default Lamell;
