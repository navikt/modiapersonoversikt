import * as React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components/macro';
import { Normaltekst } from 'nav-frontend-typografi';
import theme from '../../../../../styles/personOversiktTheme';
import { Bold, Uppercase } from '../../../../../components/common-styled-components';

interface Props {
    tittel: string;
    children: ReactNode;
}

const PeriodeStyling = styled.li`
    > *:first-child {
        background-color: ${theme.color.kategori};
        padding: 0.2rem ${theme.margin.px20};
    }
    ol {
        padding: 0;
        margin: 0;
    }
`;

function YtelserPeriode(props: Props) {
    return (
        <PeriodeStyling>
            <Normaltekst tag="h3">
                <Bold>
                    <Uppercase>{props.tittel}</Uppercase>
                </Bold>
            </Normaltekst>
            {props.children}
        </PeriodeStyling>
    );
}

export default YtelserPeriode;
