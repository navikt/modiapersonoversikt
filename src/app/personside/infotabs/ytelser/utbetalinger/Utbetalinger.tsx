import * as React from 'react';
import { HistoriskUtbetaling, KommendeUtbetaling } from '../../../../../models/ytelse/ytelse-utbetalinger';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import { Undertittel } from 'nav-frontend-typografi';
import DescriptionList from '../../../../../components/DescriptionList';
import { formaterDato } from '../../../../../utils/dateUtils';
import { formaterNOK } from '../../utbetalinger/utils/utbetalingerUtils';
import DetaljerCollapse from '../../../../../components/DetaljerCollapse';
import { useState } from 'react';
import { AlignTextCenter } from '../../../../../components/common-styled-components';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { getFormatertKreditortrekkFraHistoriskUtbetaling } from './utbetalingerUtils';

interface Props {
    kommendeUtbetalinger: KommendeUtbetaling[];
    historiskeUtbetalinger: HistoriskUtbetaling[];
}

const Wrapper = styled.div`
    > * {
        margin: ${theme.margin.px10} 0;
    }
    margin-right: 1rem;
`;

const VedtaksListe = styled.ul`
    list-style: none;
`;

const Padding = styled.div`
    padding: 0.5rem;
`;

function HistoriskUtbetalingKomponent({ historiskUtbetaling }: { historiskUtbetaling: HistoriskUtbetaling }) {
    const utbetaltEntries = {
        Dato: historiskUtbetaling.utbetalingsdato && formaterDato(historiskUtbetaling.utbetalingsdato),
        Type: historiskUtbetaling.type,
        Periode:
            historiskUtbetaling.vedtak &&
            `${formaterDato(historiskUtbetaling.vedtak.fra)} - ${formaterDato(historiskUtbetaling.vedtak.til)}`,
        Utbetalingsgrad: historiskUtbetaling.utbetalingsgrad && historiskUtbetaling.utbetalingsgrad + '%',
        Netto: historiskUtbetaling.nettobeløp && formaterNOK(historiskUtbetaling.nettobeløp) + ' NOK',
        Registeringsdato: historiskUtbetaling.utbetalingsdato && formaterDato(historiskUtbetaling.utbetalingsdato)
    };
    const utbetaltDetaljerEntries = {
        Dagsats: historiskUtbetaling.dagsats && formaterNOK(historiskUtbetaling.dagsats),
        Bruttobeløp: historiskUtbetaling.bruttobeløp && formaterNOK(historiskUtbetaling.bruttobeløp) + ' NOK',
        Nettobeløp: historiskUtbetaling.nettobeløp && formaterNOK(historiskUtbetaling.nettobeløp) + ' NOK',
        Arbeidsgiver: historiskUtbetaling.arbeidsgiverNavn,
        Organisasjonsnummer: historiskUtbetaling.arbeidsgiverOrgNr,
        Skattetrekk: historiskUtbetaling.skattetrekk,
        Kreditortrekk: getFormatertKreditortrekkFraHistoriskUtbetaling(historiskUtbetaling)
    };
    const [visDetaljer, setVisDetaljer] = useState(false);
    return (
        <li>
            <DetaljerCollapse
                header={<DescriptionList entries={utbetaltEntries} />}
                alwaysGrayBackground={true}
                open={visDetaljer}
                toggle={() => setVisDetaljer(!visDetaljer)}
            >
                <DescriptionList entries={utbetaltDetaljerEntries} />
            </DetaljerCollapse>
        </li>
    );
}

function KommendeUtbetalingKomponent({ kommendeUtbetaling }: { kommendeUtbetaling: KommendeUtbetaling }) {
    const kommendeEntries = {
        Registeringsdato: kommendeUtbetaling.utbetalingsdato && formaterDato(kommendeUtbetaling.utbetalingsdato),
        Type: kommendeUtbetaling.type,
        Periode:
            kommendeUtbetaling.vedtak &&
            `${formaterDato(kommendeUtbetaling.vedtak.fra)} - ${formaterDato(kommendeUtbetaling.vedtak.til)}`,
        Utbetalingsgrad: kommendeUtbetaling.utbetalingsgrad && kommendeUtbetaling.utbetalingsgrad + '%'
    };

    const kommendeDetaljerEntries = {
        Dagsats: kommendeUtbetaling.dagsats && formaterNOK(kommendeUtbetaling.dagsats) + ' NOK',
        Bruttobeløp: kommendeUtbetaling.bruttobeløp && formaterNOK(kommendeUtbetaling.bruttobeløp) + ' NOK',
        Arbeidsgiver: kommendeUtbetaling.arbeidsgiverNavn,
        Organisasjonsnummer: kommendeUtbetaling.arbeidsgiverOrgNr,
        'Saksbehandlerident (Tryde-ident)': kommendeUtbetaling.saksbehandler
    };
    const [visDetaljer, setVisDetaljer] = useState(false);
    return (
        <li>
            <DetaljerCollapse
                header={<DescriptionList entries={kommendeEntries} />}
                alwaysGrayBackground={true}
                open={visDetaljer}
                toggle={() => setVisDetaljer(!visDetaljer)}
            >
                <DescriptionList entries={kommendeDetaljerEntries} />
            </DetaljerCollapse>
        </li>
    );
}

function Utbetalinger(props: Props) {
    const kommendeUtbetalinger = props.kommendeUtbetalinger.map((utbetaling, index) => (
        <KommendeUtbetalingKomponent key={index} kommendeUtbetaling={utbetaling} />
    ));
    const utførteUtbetalinger = props.historiskeUtbetalinger.map((utbetaling, index) => (
        <HistoriskUtbetalingKomponent key={index} historiskUtbetaling={utbetaling} />
    ));

    return (
        <Wrapper>
            <Padding>
                <AlignTextCenter>
                    <Undertittel tag="h4">Kommende utbetalinger</Undertittel>
                </AlignTextCenter>
            </Padding>
            <VedtaksListe>
                {kommendeUtbetalinger.length > 0 ? (
                    kommendeUtbetalinger
                ) : (
                    <AlertStripeInfo>Ingen kommende utbetalinger funnet</AlertStripeInfo>
                )}
            </VedtaksListe>
            <Padding>
                <AlignTextCenter>
                    <Undertittel tag="h4">Utførte utbetalinger</Undertittel>
                </AlignTextCenter>
            </Padding>
            <VedtaksListe>
                {utførteUtbetalinger.length > 0 ? (
                    utførteUtbetalinger
                ) : (
                    <AlertStripeInfo>Ingen utførte utbetalinger funnet</AlertStripeInfo>
                )}
            </VedtaksListe>
        </Wrapper>
    );
}

export default Utbetalinger;
