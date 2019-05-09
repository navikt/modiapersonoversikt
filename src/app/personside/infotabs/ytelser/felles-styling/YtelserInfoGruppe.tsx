import * as React from 'react';
import { ReactNode } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import theme from '../../../../../styles/personOversiktTheme';
import styled from 'styled-components';

interface Props {
    children: ReactNode;
    tittel: string;
}

const Style = styled.div`
    ${theme.gråttPanel}
`;

function YtelserInfoGruppe(props: Props) {
    return (
        <Style>
            <Undertittel tag="h3">{props.tittel}</Undertittel>
            {props.children}
        </Style>
    );
}

export default YtelserInfoGruppe;
