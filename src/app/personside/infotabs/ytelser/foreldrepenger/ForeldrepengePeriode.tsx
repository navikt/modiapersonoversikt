import * as React from 'react';
import { Foreldrepengerperiode } from '../../../../../models/ytelse/foreldrepenger';
import Utbetalinger from '../utbetalinger/Utbetalinger';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import { Normaltekst } from 'nav-frontend-typografi';
import DescriptionList from '../DescriptionList';
import { Bold, Uppercase } from '../../../../../components/common-styled-components';

interface Props {
    periode: Foreldrepengerperiode;
}

const Wrapper = styled.li`
  > *:first-child {
    background-color: ${theme.color.kategori};
    padding: .2rem ${theme.margin.px20};
  }
  ol {
    padding: 0;
    margin: 0;
  }
  ol > *:not(:first-child) {
    border-top: ${theme.border.skille};
  }
`;

const Padding = styled.div`
  margin: ${theme.margin.px10} ${theme.margin.px20} ${theme.margin.px40};
`;

function ForeldrepengePeriode(props: Props) {
    const entries = {
        'Midlertidig stans': 'Hei',
        Stansårsak: 'Avsluttet',
        MerInfo: 'Hei',
        TBA: ''
    };
    return (
        <Wrapper>
            <Normaltekst tag="h3"><Bold><Uppercase>Periode DATO</Uppercase></Bold></Normaltekst>
            <Padding>
                <DescriptionList entries={entries}/>
            </Padding>
            <Utbetalinger
                kommendeUtbetalinger={props.periode.kommendeUtbetalinger}
                historiskeUtbetalinger={props.periode.historiskeUtbetalinger}
            />
        </Wrapper>
    );
}

export default ForeldrepengePeriode;
