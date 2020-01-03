import * as React from 'react';
import { ReactNode } from 'react';
import { Ingress } from 'nav-frontend-typografi';
import theme from '../../../../../styles/personOversiktTheme';
import styled from 'styled-components/macro';

interface Props {
    children: ReactNode;
    tittel: string;
}

const Style = styled.div`
    ${theme.gråttPanel}
    > h3 {
        margin-bottom: 1rem;
    }
`;

function YtelserInfoGruppe(props: Props) {
    return (
        <Style>
            <Ingress tag="h3">{props.tittel}</Ingress>
            {props.children}
        </Style>
    );
}

export default YtelserInfoGruppe;
