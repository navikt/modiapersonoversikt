import * as React from 'react';
import styled from 'styled-components';
import { Undertekst, UndertekstBold } from 'nav-frontend-typografi';
import theme from '../../../../../styles/personOversiktTheme';
import {
    createTable,
    formaterNOK,
    skattBelopAscComparator, trekkBelopAscComparator,
    ytelseBelopDescComparator
} from '../utils/utbetalingerUtils';
import { Ytelse, Ytelseskomponent } from '../../../../../models/utbetalinger';
import { EnkeltYtelseProps } from './SammensattUtbetaling';
import AlertStripeAdvarsel from 'nav-frontend-alertstriper/lib/advarsel-alertstripe';

const Wrapper = styled.aside`
  padding: .5rem 0;
  th {
    font-weight: bold;
  }
`;

const Border = styled.div`
  border-top: 2px solid ${theme.color.bakgrunn};
  margin: .5rem 0;
`;

function utbetalingsDetaljerTable(ytelse: Ytelse) {
    if (ytelse.ytelseskomponentListe || ytelse.trekkListe || ytelse.skattListe) {
        const tittelrekke = ['Detaljer', 'Sats', 'Antall', 'Beløp'];
        let tabellElementer: Array<Array<number | string | undefined>> = [];

        if (ytelse.ytelseskomponentListe) {
            ytelse.ytelseskomponentListe
                .sort(ytelseBelopDescComparator)
                .map((ytelseskomponent: Ytelseskomponent) =>
                    tabellElementer.push([
                        ytelseskomponent.ytelseskomponenttype,
                        ytelseskomponent.satsbeløp ? formaterNOK(ytelseskomponent.satsbeløp) : '',
                        ytelseskomponent.satsantall,
                        formaterNOK(ytelseskomponent.ytelseskomponentbeløp)
            ]));
        }

        if (ytelse.skattListe) {
            ytelse.skattListe
                .sort(skattBelopAscComparator)
                .map(skattElement =>
                    tabellElementer.push([
                        'Skattetrekk',
                        '',
                        '',
                        formaterNOK(skattElement.skattebeløp)
            ]));
        }

        if (ytelse.trekkListe) {
            ytelse.trekkListe
                .sort(trekkBelopAscComparator)
                .map(trekkElement =>
                    tabellElementer.push([
                        trekkElement.trekktype,
                        '',
                        '',
                        formaterNOK(trekkElement.trekkbeløp)
            ]));
        }

        return createTable(
            tittelrekke,
            tabellElementer
        );
    } else {
        return <AlertStripeAdvarsel>Manglende data. Kunne ikke finne detaljer om utbetaling.</AlertStripeAdvarsel>;
    }
}

function UtbetalingsDetaljer(props: EnkeltYtelseProps) {
    const ytelse = props.ytelse;
    const ytelsesKomponenter = utbetalingsDetaljerTable(ytelse);
    const oversikt = createTable(
        ['Konto', 'Brutto', 'Trekk', 'Utbetalt'],
        [[
            props.konto,
            formaterNOK(ytelse.ytelseskomponentersum),
            formaterNOK(ytelse.skattsum + ytelse.trekksum),
            formaterNOK(ytelse.nettobeløp)
        ]]
    );
    return (
        <Wrapper>
            <Undertekst tag="span">
                {oversikt}
            </Undertekst>
            <Border/>
            <Undertekst tag="span">
                {ytelsesKomponenter}
            </Undertekst>
            <Border/>
            <UndertekstBold tag={'h4'}>Melding</UndertekstBold>
            <Undertekst>{props.melding || ''}</Undertekst>
        </Wrapper>
    );
}

export default UtbetalingsDetaljer;
