import * as React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { Element } from 'nav-frontend-typografi';
import { KategoriSkille } from '../../../dialogpanel/fellesStyling';

interface Props {
    tittel: string;
    children: ReactNode;
}

const PeriodeStyling = styled.li`
    ol {
        padding: 0;
        margin: 0;
    }
`;

function YtelserPeriode(props: Props) {
    return (
        <PeriodeStyling>
            <KategoriSkille>
                <Element tag="h3">{props.tittel}</Element>
            </KategoriSkille>
            {props.children}
        </PeriodeStyling>
    );
}

export default YtelserPeriode;
