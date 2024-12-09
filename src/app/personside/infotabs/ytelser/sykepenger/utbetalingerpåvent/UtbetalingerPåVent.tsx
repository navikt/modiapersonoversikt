import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Ingress } from 'nav-frontend-typografi';
import styled from 'styled-components';
import type { UtbetalingPåVent } from '../../../../../../models/ytelse/ytelse-utbetalinger';
import theme from '../../../../../../styles/personOversiktTheme';
import { periodeEllerNull, prosentEllerNull } from '../../../../../../utils/string-utils';
import { StyledTable } from '../../../../../../utils/table/StyledTable';
import { utledUtbetalingPåVentÅrsak } from './utledUtbetalingerPåVentÅrsak';

interface Props {
    utbetalingerPåVent: UtbetalingPåVent[];
}

const Style = styled.section`
    > *:not(:last-child) {
        margin-bottom: 1rem;
    }
    ${theme.graattPanel};
    white-space: nowrap;
`;

function getInnhold(utbetalingerpåVent: UtbetalingPåVent[]) {
    if (utbetalingerpåVent.length === 0) {
        return <AlertStripeInfo>Ingen utbetalinger på vent funnet</AlertStripeInfo>;
    }
    const tittelRekke = ['Årsak', 'Utbetalingsperiode', 'Utbetalingsgrad'];
    const rows = utbetalingerpåVent.map((utbetaling) => [
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
            {getInnhold(props.utbetalingerPåVent)}
        </Style>
    );
}

export default UtbetalingerPVent;
