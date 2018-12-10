import * as React from 'react';
import { Pleiepengeperiode } from '../../../../../models/ytelse/pleiepenger';
import theme from '../../../../../styles/personOversiktTheme';
import styled from 'styled-components';
import { GråttPanel } from '../../../../../components/common-styled-components';
import YtelserPeriode from '../felles-styling/YtelserPeriode';
import DescriptionList from '../felles-styling/DescriptionList';
import { Undertittel } from 'nav-frontend-typografi';

interface Props {
    periode: Pleiepengeperiode;
}

const Padding = styled.div`
  margin: ${theme.margin.px10} ${theme.margin.px20} ${theme.margin.px40};
`;

const PaddingBottom = styled.div`
  padding-bottom: 1rem;
`;

function Pleiepengerperiode(props: Props) {

    const entries = {
        Pleiedager: props.periode.antallPleiepengedager
    };

    const avvisteUtbetalingerEntries = {
        Registreringsdato: '',
        Type: '',
        Periode: '',
        Utbetalingsdato: '',
        Dagsats: '',
        Bruttobeløp: '',
        Pleiegrad: ''
    };

    return (
        <YtelserPeriode tittel="Periode DATO">
            <Padding>
                <DescriptionList entries={entries}/>
            </Padding>
            <GråttPanel>
                <Undertittel>Avviste utbetalinger</Undertittel>
                <DescriptionList entries={avvisteUtbetalingerEntries}/>
                <PaddingBottom/>
            </GråttPanel>
        </YtelserPeriode>
    );
}

export default Pleiepengerperiode;
