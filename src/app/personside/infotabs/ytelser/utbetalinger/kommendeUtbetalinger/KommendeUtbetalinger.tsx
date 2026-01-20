import { Link } from '@tanstack/react-router';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Ingress } from 'nav-frontend-typografi';
import styled from 'styled-components';
import type { KommendeUtbetaling } from '../../../../../../models/ytelse/ytelse-utbetalinger';
import theme from '../../../../../../styles/personOversiktTheme';
import { datoEllerNull, NOKellerNull, periodeEllerNull, prosentEllerNull } from '../../../../../../utils/string-utils';
import { StyledTable } from '../../../../../../utils/table/StyledTable';
import { usePaths } from '../../../../../routes/routing';

interface Props {
    kommendeUtbetalinger: KommendeUtbetaling[];
}

const KommendeUtbetalingerStyle = styled.section`
    > *:not(:last-child) {
        margin-bottom: 1rem;
    }
    ${theme.graattPanel};
    white-space: nowrap;
`;

function Utbetalinger({ kommendeUtbetalinger }: Props) {
    if (kommendeUtbetalinger.length === 0) {
        return <AlertStripeInfo>Ingen utbetalinger funnet</AlertStripeInfo>;
    }
    const tittelRekke = [
        'Reg.dato',
        'Type',
        'Periode',
        'Utb.grad',
        'Dagsats',
        'Bruttobeløp',
        'Arb.giver',
        'Org.nummer'
    ];
    const rows = kommendeUtbetalinger.map((kommendeUtbetaling) => [
        datoEllerNull(kommendeUtbetaling.utbetalingsdato),
        kommendeUtbetaling.type,
        periodeEllerNull(kommendeUtbetaling.vedtak),
        prosentEllerNull(kommendeUtbetaling.utbetalingsgrad),
        NOKellerNull(kommendeUtbetaling.dagsats),
        NOKellerNull(kommendeUtbetaling.bruttobelop),
        kommendeUtbetaling.arbeidsgiverNavn,
        kommendeUtbetaling.arbeidsgiverOrgNr
    ]);
    return <StyledTable tittelRekke={tittelRekke} rows={rows} />;
}

function KommendeUtbetalinger(props: Props) {
    const paths = usePaths();
    return (
        <KommendeUtbetalingerStyle>
            <Ingress tag="h4">Utbetalinger</Ingress>
            <Utbetalinger kommendeUtbetalinger={props.kommendeUtbetalinger} />
            <AlertStripeInfo>
                For detaljer om utførte utbetalinger <Link to={paths.utbetlainger}>se Utbetalingsoversikten.</Link>
            </AlertStripeInfo>
        </KommendeUtbetalingerStyle>
    );
}

export default KommendeUtbetalinger;
