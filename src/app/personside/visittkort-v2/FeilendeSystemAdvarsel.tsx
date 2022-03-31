import * as React from 'react';
import styled from 'styled-components/macro';
import { ReactNode } from 'react';
import theme from '../../../styles/personOversiktTheme';

const StyledBeskrivelse = styled.div`
    color: ${theme.color.redError};
    font-size: 0.875rem;
    font-weight: 600;
`;

interface Props {
    children: ReactNode;
}

function FeilendeSystemAdvarsel(props: Props) {
    return <StyledBeskrivelse>{props.children}</StyledBeskrivelse>;
}

export default FeilendeSystemAdvarsel;
