import * as React from 'react';
import { HistoriskUtbetaling, KommendeUtbetaling } from '../../../../../models/ytelse/ytelse-utbetalinger';
import /()=
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import { Undertittel } from 'nav-frontend-typografi';
import DescriptionList from '../felles-styling/DescriptionList';
import { GråttPanel } from '../../../../../components/common-styled-components';

interface Props {
    kommendeUtbetalinger: KommendeUtbetaling[];
    historiskeUtbetalinger: HistoriskUtbetaling[];
}

const Wrapper = styled.div`
  > * {
    margin-top: ${theme.margin.px20};
  }
`;

const VedtaksListe = styled.ul`
  list-style: none;
  margin-right: 1rem;
  li {
    margin-bottom: ${theme.margin.px20};
  }
`;

function HistoriskeUtbetalinger({histUtbetal}: {histUtbetal: HistoriskUtbetaling}) {
    const utbetaltEntries  = {
        'Registeringsdato': histUtbetal.utbetalingsdato,
        'periode': histUtbetal.vedtak.til,
        Type: histUtbetal.type,
        Utbetalingsgrad: histUtbetal.utbetalingsgrad,
        Dagsats: histUtbetal.dagsats,
        Bruttobeløp: histUtbetal.bruttobeløp,
        nettobeløp: histUtbetal.nettobeløp,
        Arbeidsgiver: histUtbetal.arbeidsgiverNavn,

        Fo: 'Bar',
        Sneile: 'Smaker rart'
    };
    return (
        <li>
        <GråttPanel>
            <DescriptionList entries={utbetaltEntries}/>
        </GråttPanel>
        </li>
    );
}

function KommendeUtbetalinger({kommendeUtbetal}: {kommendeUtbetal: KommendeUtbetaling}) {
    const kommendeEntries = {
        'Registeringsdato': kommendeUtbetal.utbetalingsdato,
        'Arbeidsgiver': kommendeUtbetal.arbeidsgiverNavn,

        Sneile: 'Smaker rart'
    };
    return (
        <li>
        <GråttPanel>
            <DescriptionList entries={kommendeEntries}/>
        </GråttPanel>
        </li>
    );
}


function Utbetalinger(props: Props) {

    const histUtbetal = props.historiskeUtbetalinger
        .map((v, index) => <HistoriskeUtbetalinger key={index} histUtbetal={v}/>);
    const kommendeUtbetal = props.kommendeUtbetalinger
        .map((v, index) =>  <KommendeUtbetalinger key={index} kommendeUtbetal={v}/>);

    return (
        <Wrapper>
                <Undertittel tag="h4">Kommende utbetalinger</Undertittel>
                <VedtaksListe> {kommendeUtbetal} </VedtaksListe>
                <Undertittel tag="h4">Histortiske utbetalinger</Undertittel>
                <VedtaksListe> {histUtbetal} </VedtaksListe>
        </Wrapper>
    );
}

export default Utbetalinger;
