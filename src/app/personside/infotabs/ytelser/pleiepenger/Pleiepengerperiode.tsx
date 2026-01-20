import { Ingress } from 'nav-frontend-typografi';
import type { Pleiepengeperiode } from 'src/models/ytelse/pleiepenger';
import { formaterDato, NOKellerNull, prosentEllerNull } from 'src/utils/string-utils';
import { StyledTable } from 'src/utils/table/StyledTable';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
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
        NOKellerNull(vedtak.bruttobelop),
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
