import * as React from 'react';
import styled from 'styled-components';
import { Normaltekst } from 'nav-frontend-typografi';
import theme from '../../../../../styles/personOversiktTheme';
import {
    formaterNOK,
    skattBelopAscComparator,
    trekkBelopAscComparator,
    ytelseBelopDescComparator
} from '../utils/utbetalingerUtils';
import { Ytelse, Ytelseskomponent } from '../../../../../models/utbetalinger';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Bold } from '../../../../../components/common-styled-components';
import { Table } from '../../../../../utils/table/Table';

type Props = {
    ytelse: Ytelse;
    konto: string | undefined;
    melding: string | undefined;
};

const Wrapper = styled.aside`
    th:not(:first-child) {
        font-weight: normal;
        font-style: italic;
    }
`;

const OversiktStyle = styled.div`
    td:not(:first-child) {
        font-weight: bold;
    }
`;

const Border = styled.div`
    border-top: ${theme.border.skilleSvak};
    margin: 0.5rem 0;
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
                    ])
                );
        }

        if (ytelse.skattListe) {
            ytelse.skattListe
                .sort(skattBelopAscComparator)
                .map(skattElement =>
                    tabellElementer.push(['Skattetrekk', '', '', formaterNOK(skattElement.skattebeløp)])
                );
        }

        if (ytelse.trekkListe) {
            ytelse.trekkListe
                .sort(trekkBelopAscComparator)
                .map(trekkElement =>
                    tabellElementer.push([trekkElement.trekktype, '', '', formaterNOK(trekkElement.trekkbeløp)])
                );
        }

        return <Table tittelRekke={tittelrekke} rows={tabellElementer} />;
    } else {
        return <AlertStripeAdvarsel>Manglende data. Kunne ikke finne detaljer om utbetaling.</AlertStripeAdvarsel>;
    }
}

function UtbetalingsDetaljer(props: Props) {
    const ytelse = props.ytelse;
    const detaljer = utbetalingsDetaljerTable(ytelse);
    const oversikt = (
        <Table
            tittelRekke={['Konto', 'Brutto', 'Trekk', 'Utbetalt']}
            rows={[
                [
                    props.konto,
                    formaterNOK(ytelse.ytelseskomponentersum),
                    formaterNOK(ytelse.skattsum + ytelse.trekksum),
                    formaterNOK(ytelse.nettobeløp)
                ]
            ]}
        />
    );
    return (
        <Wrapper aria-label="Utbetalingsdetaljer">
            <Normaltekst tag="span">
                <OversiktStyle>{oversikt}</OversiktStyle>
            </Normaltekst>
            <Border />
            <Normaltekst tag="span">{detaljer}</Normaltekst>
            <Border />
            <Normaltekst tag={'h4'}>
                <Bold>Melding</Bold>
            </Normaltekst>
            <Normaltekst>{props.melding || ''}</Normaltekst>
        </Wrapper>
    );
}

export default UtbetalingsDetaljer;
