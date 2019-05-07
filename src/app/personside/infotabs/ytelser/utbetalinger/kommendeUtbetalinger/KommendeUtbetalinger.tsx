import { KommendeUtbetaling } from '../../../../../../models/ytelse/ytelse-utbetalinger';
import * as React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import styled from 'styled-components';
import { AlignTextCenter } from '../../../../../../components/common-styled-components';
import { Undertittel } from 'nav-frontend-typografi';
import {
    datoEllerNull,
    NOKellerNull,
    periodeEllerNull,
    prosentEllerNull
} from '../../../../../../utils/stringFormatting';
import { StyledTable } from '../../../../../../utils/tableUtils';

interface Props {
    kommendeUtbetalinger: KommendeUtbetaling[];
}

const KommendeUtbetalingerStyle = styled.section`
    > *:not(:last-child) {
        margin-bottom: 1rem;
    }
`;

function getInnhold(kommendeUtbetalinger: KommendeUtbetaling[]) {
    if (kommendeUtbetalinger.length === 0) {
        return <AlertStripeInfo>Ingen kommende utbetalinger funnet</AlertStripeInfo>;
    }
    const tittelRekke = [
        'Registeringsdato',
        'Type',
        'Periode',
        'Utbetalingsgrad',
        'Dagsats',
        'Bruttobeløp',
        'Arbeidsgiver',
        'Orgnummer',
        'Saksbehandler'
    ];
    const rows = kommendeUtbetalinger.map(kommendeUtbetaling => [
        datoEllerNull(kommendeUtbetaling.utbetalingsdato),
        kommendeUtbetaling.type,
        periodeEllerNull(kommendeUtbetaling.vedtak),
        prosentEllerNull(kommendeUtbetaling.utbetalingsgrad),
        NOKellerNull(kommendeUtbetaling.dagsats),
        NOKellerNull(kommendeUtbetaling.bruttobeløp),
        kommendeUtbetaling.arbeidsgiverNavn,
        kommendeUtbetaling.arbeidsgiverOrgNr,
        kommendeUtbetaling.saksbehandler
    ]);
    return <StyledTable tittelRekke={tittelRekke} rows={rows} />;
}

function KommendeUtbetalinger(props: Props) {
    return (
        <KommendeUtbetalingerStyle>
            <AlignTextCenter>
                <Undertittel tag="h4">Kommende utbetalinger</Undertittel>
            </AlignTextCenter>
            {getInnhold(props.kommendeUtbetalinger)}
        </KommendeUtbetalingerStyle>
    );
}

export default KommendeUtbetalinger;
