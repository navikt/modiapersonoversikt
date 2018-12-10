import * as React from 'react';
import { Foreldrepengerperiode } from '../../../../../models/ytelse/foreldrepenger';
import Utbetalinger from '../utbetalinger/Utbetalinger';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import DescriptionList from '../felles-styling/DescriptionList';
import YtelserPeriode from '../felles-styling/YtelserPeriode';

interface Props {
    periode: Foreldrepengerperiode;
}

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
        <YtelserPeriode tittel="Periode DATO">
            <Padding>
                <DescriptionList entries={entries}/>
            </Padding>
            <Utbetalinger
                kommendeUtbetalinger={props.periode.kommendeUtbetalinger}
                historiskeUtbetalinger={props.periode.historiskeUtbetalinger}
            />
        </YtelserPeriode>
    );
}

export default ForeldrepengePeriode;
