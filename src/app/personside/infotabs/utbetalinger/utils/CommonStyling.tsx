import styled from 'styled-components/macro';

export const UtbetalingTabellStyling = styled.div`
    table {
        width: 100%;
        text-align: right;
        border-spacing: 0;
        * {
            padding: 0;
            margin: 0;
        }
        tr {
            > * {
                padding: 0.1rem;
                text-align: right;
            }
            > *:first-child {
                text-align: left;
            }
            > *:not(:first-child) {
                width: 6rem;
            }
        }
    }
`;
