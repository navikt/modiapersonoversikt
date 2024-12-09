import { Ingress } from 'nav-frontend-typografi';
import styled from 'styled-components';
import type { Pleiepengeperiode } from '../../../../../models/ytelse/pleiepenger';
import theme from '../../../../../styles/personOversiktTheme';
import { NOKellerNull, formaterDato, prosentEllerNull } from '../../../../../utils/string-utils';
import { StyledTable } from '../../../../../utils/table/StyledTable';
import YtelserPeriode from '../felles-styling/YtelserPeriode';

interface Props {
    periode: Pleiepengeperiode;
    periodeNummer: number;
}

const VedtaksTable = styled.div`
    ${theme.graattPanel};
    margin: ${theme.margin.layout};
    > *:not(:last-child) {
        margin-bottom: 1rem;
    }
`;

function Pleiepengerperiode({ periode, ...props }: Props) {
    const tittelRekke = ['Fra og med', 'Til og med', 'Bruttobeløp', 'Anvist utbetaling', 'Dagsats', 'Pleiepengegrad'];
    const rows = periode.vedtak.map((vedtak) => [
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
                <Ingress>Anviste utbetalinger</Ingress>
                <StyledTable tittelRekke={tittelRekke} rows={rows} />
            </VedtaksTable>
        </YtelserPeriode>
    );
}

export default Pleiepengerperiode;
