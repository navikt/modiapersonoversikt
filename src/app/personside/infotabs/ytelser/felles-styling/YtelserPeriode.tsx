import * as React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { Undertittel } from 'nav-frontend-typografi';
import theme from '../../../../../styles/personOversiktTheme';

interface Props {
    tittel: string;
    children: ReactNode;
}

const PeriodeStyling = styled.li`
    > *:first-child {
        background-color: ${theme.color.kategori};
        padding: 0.5rem ${theme.margin.px20};
    }
    ol {
        padding: 0;
        margin: 0;
    }
`;

function YtelserPeriode(props: Props) {
    return (
        <PeriodeStyling>
            <Undertittel tag="h3">{props.tittel}</Undertittel>
            {props.children}
        </PeriodeStyling>
    );
}

export default YtelserPeriode;
