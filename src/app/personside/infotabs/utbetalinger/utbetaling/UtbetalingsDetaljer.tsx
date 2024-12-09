import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import styled from 'styled-components';
import type { Ytelse, Ytelseskomponent } from '../../../../../models/utbetalinger';
import theme from '../../../../../styles/personOversiktTheme';
import { Table } from '../../../../../utils/table/Table';
import {
    formaterNOK,
    skattBelopAscComparator,
    trekkBelopAscComparator,
    ytelseBelopDescComparator
} from '../utils/utbetalinger-utils';

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
        font-weight: 600;
    }
`;

const Border = styled.div`
    border-top: ${theme.border.skilleSvak};
    margin: 0.5rem 0;
`;

function utbetalingsDetaljerTable(ytelse: Ytelse) {
    if (ytelse.ytelseskomponentListe || ytelse.trekkListe || ytelse.skattListe) {
        const tittelrekke = ['Detaljer', 'Sats', 'Antall', 'Beløp'];
        const tabellElementer: Array<Array<number | string | undefined>> = [];

        if (ytelse.ytelseskomponentListe) {
            ytelse.ytelseskomponentListe
                .sort(ytelseBelopDescComparator)
                .map((ytelseskomponent: Ytelseskomponent) =>
                    tabellElementer.push([
                        ytelseskomponent.ytelseskomponenttype,
                        ytelseskomponent.satsbelop ? formaterNOK(ytelseskomponent.satsbelop) : '',
                        ytelseskomponent.satsantall,
                        formaterNOK(ytelseskomponent.ytelseskomponentbelop)
                    ])
                );
        }

        if (ytelse.skattListe) {
            ytelse.skattListe
                .sort(skattBelopAscComparator)
                .map((skattElement) =>
                    tabellElementer.push(['Skattetrekk', '', '', formaterNOK(skattElement.skattebelop)])
                );
        }

        if (ytelse.trekkListe) {
            ytelse.trekkListe
                .sort(trekkBelopAscComparator)
                .map((trekkElement) =>
                    tabellElementer.push([trekkElement.trekktype, '', '', formaterNOK(trekkElement.trekkbelop)])
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
                    formaterNOK(ytelse.nettobelop)
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
            <Element tag={'h4'}>Melding</Element>
            <Normaltekst>{props.melding || ''}</Normaltekst>
        </Wrapper>
    );
}

export default UtbetalingsDetaljer;
