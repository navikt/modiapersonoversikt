import * as React from 'react';
import { Pleiepengeperiode } from '../../../../../models/ytelse/pleiepenger';
import styled from 'styled-components';
import YtelserPeriode from '../felles-styling/YtelserPeriode';
import { Undertittel } from 'nav-frontend-typografi';
import { formaterDato, NOKellerNull, prosentEllerNull } from '../../../../../utils/stringFormatting';
import { StyledTable } from '../../../../../utils/tableUtils';

interface Props {
    periode: Pleiepengeperiode;
    periodeNummer: number;
}

const VedtaksTable = styled.div`
    padding: 1rem;
    > *:not(:last-child) {
        margin-bottom: 1rem;
    }
`;

function Pleiepengerperiode({ periode, ...props }: Props) {
    const tittelRekke = ['Fra og med', 'Til og med', 'Bruttobeløp', 'Anvist utbetaling', 'Dagsats', 'Pleiepengegrad'];
    const rows = periode.vedtak.map(vedtak => [
        formaterDato(vedtak.periode.fom),
        formaterDato(vedtak.periode.tom),
        NOKellerNull(vedtak.bruttobeløp),
        formaterDato(vedtak.anvistUtbetaling),
        NOKellerNull(vedtak.dagsats),
        prosentEllerNull(vedtak.pleiepengegrad)
    ]);

    return (
        <YtelserPeriode tittel={`Periode ${props.periodeNummer} - ${formaterDato(periode.fom)}`}>
            <VedtaksTable>
                <Undertittel>Anviste utbetalinger</Undertittel>
                <StyledTable tittelRekke={tittelRekke} rows={rows} />
            </VedtaksTable>
        </YtelserPeriode>
    );
}

export default Pleiepengerperiode;
