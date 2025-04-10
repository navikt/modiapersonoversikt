import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Ingress } from 'nav-frontend-typografi';
import type { UtbetalingPaaVent } from 'src/models/ytelse/ytelse-utbetalinger';
import { periodeEllerNull, prosentEllerNull } from 'src/utils/string-utils';
import { StyledTable } from 'src/utils/table/StyledTable';
import styled from 'styled-components';
import theme from '../../../../../../styles/personOversiktTheme';
import { utledUtbetalingPåVentÅrsak } from './utledUtbetalingerPåVentÅrsak';

interface Props {
    utbetalingerPaaVent: UtbetalingPaaVent[];
}

const Style = styled.section`
    > *:not(:last-child) {
        margin-bottom: 1rem;
    }
    ${theme.graattPanel};
    white-space: nowrap;
`;

function getInnhold(utbetalingerpaaVent: UtbetalingPaaVent[]) {
    if (utbetalingerpaaVent.length === 0) {
        return <AlertStripeInfo>Ingen utbetalinger på vent funnet</AlertStripeInfo>;
    }
    const tittelRekke = ['Årsak', 'Utbetalingsperiode', 'Utbetalingsgrad'];
    const rows = utbetalingerpaaVent.map((utbetaling) => [
        utledUtbetalingPåVentÅrsak(utbetaling),
        periodeEllerNull(utbetaling.vedtak),
        prosentEllerNull(utbetaling.utbetalingsgrad)
    ]);
    return <StyledTable tittelRekke={tittelRekke} rows={rows} />;
}

function UtbetalingerPVent(props: Props) {
    return (
        <Style>
            <Ingress tag="h4">Utbetalinger på vent</Ingress>
            {getInnhold(props.utbetalingerPaaVent)}
        </Style>
    );
}

export default UtbetalingerPVent;
