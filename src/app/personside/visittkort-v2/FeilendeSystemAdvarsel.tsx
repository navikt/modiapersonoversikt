import * as React from 'react';
import styled from 'styled-components/macro';
import { ReactNode } from 'react';
import theme from '../../../styles/personOversiktTheme';

const BeskrivelseDiv = styled.div`
    color: ${theme.color.redError};
    font-size: 0.875rem;
    font-weight: 600;
`;

interface Props {
    beskrivelse: ReactNode;
}

function FeilendeSystemAdvarsel(props: Props) {
    return <BeskrivelseDiv>{props.beskrivelse}</BeskrivelseDiv>;
}

export default FeilendeSystemAdvarsel;
