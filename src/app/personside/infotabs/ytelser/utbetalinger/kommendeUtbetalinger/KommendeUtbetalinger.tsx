import { KommendeUtbetaling } from '../../../../../../models/ytelse/ytelse-utbetalinger';
import * as React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import styled from 'styled-components';
import { Undertittel } from 'nav-frontend-typografi';
import {
    datoEllerNull,
    NOKellerNull,
    periodeEllerNull,
    prosentEllerNull
} from '../../../../../../utils/stringFormatting';
import theme from '../../../../../../styles/personOversiktTheme';
import { StyledTable } from '../../../../../../utils/table/StyledTable';
import { erNyePersonoversikten } from '../../../../../../utils/erNyPersonoversikt';
import { Link } from 'react-router-dom';
import { usePaths } from '../../../../../routes/routing';

interface Props {
    kommendeUtbetalinger: KommendeUtbetaling[];
}

const KommendeUtbetalingerStyle = styled.section`
    > *:not(:last-child) {
        margin-bottom: 1rem;
    }
    ${theme.gråttPanel};
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
    const rows = kommendeUtbetalinger.map(kommendeUtbetaling => [
        datoEllerNull(kommendeUtbetaling.utbetalingsdato),
        kommendeUtbetaling.type,
        periodeEllerNull(kommendeUtbetaling.vedtak),
        prosentEllerNull(kommendeUtbetaling.utbetalingsgrad),
        NOKellerNull(kommendeUtbetaling.dagsats),
        NOKellerNull(kommendeUtbetaling.bruttobeløp),
        kommendeUtbetaling.arbeidsgiverNavn,
        kommendeUtbetaling.arbeidsgiverOrgNr
    ]);
    return <StyledTable tittelRekke={tittelRekke} rows={rows} />;
}

function KommendeUtbetalinger(props: Props) {
    const paths = usePaths();
    return (
        <KommendeUtbetalingerStyle>
            <Undertittel tag="h4">Utbetalinger</Undertittel>
            <Utbetalinger kommendeUtbetalinger={props.kommendeUtbetalinger} />
            {erNyePersonoversikten() ? (
                <AlertStripeInfo>
                    For detaljer om utførte utbetalinger <Link to={paths.utbetlainger}>se Utbetalingsoversikten.</Link>
                </AlertStripeInfo>
            ) : (
                <AlertStripeInfo>For detaljer om utførte utbetalinger, se Utbetalingsoversikten.</AlertStripeInfo>
            )}
        </KommendeUtbetalingerStyle>
    );
}

export default KommendeUtbetalinger;
