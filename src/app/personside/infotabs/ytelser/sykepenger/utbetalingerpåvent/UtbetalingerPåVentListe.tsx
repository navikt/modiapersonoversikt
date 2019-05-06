import * as React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import styled from 'styled-components';
import { AlignTextCenter } from '../../../../../../components/common-styled-components';
import { Undertittel } from 'nav-frontend-typografi';
import { UtbetalingPåVent } from '../../../../../../models/ytelse/ytelse-utbetalinger';
import { utledUtbetalingPåVentÅrsak } from './utledUtbetalingerPåVentÅrsak';
import { periodeEllerNull, prosentEllerNull } from '../../../../../../utils/stringFormatting';
import { createTable } from '../../../../../../utils/tableUtils';
import theme from '../../../../../../styles/personOversiktTheme';

interface Props {
    utbetalingerPåVent: UtbetalingPåVent[];
}

const Style = styled.section`
    > *:not(:last-child) {
        margin-bottom: 1rem;
    }
    ${theme.table}
`;

function getInnhold(utbetalingerpåVent: UtbetalingPåVent[]) {
    if (utbetalingerpåVent.length === 0) {
        return <AlertStripeInfo>Ingen utbetalinger på vent funnet</AlertStripeInfo>;
    }
    const tittelRekke = ['Årsak', 'Utbetalingsperiode', 'Utbetalingsgrad'];
    const rows = utbetalingerpåVent.map(utbetaling => [
        utledUtbetalingPåVentÅrsak(utbetaling),
        periodeEllerNull(utbetaling.vedtak),
        prosentEllerNull(utbetaling.utbetalingsgrad)
    ]);
    const table = createTable(tittelRekke, rows);

    return table;
}

function UtbetalingerPåVentListe(props: Props) {
    return (
        <Style>
            <AlignTextCenter>
                <Undertittel tag="h4">Utbetalinger på vent</Undertittel>
            </AlignTextCenter>
            {getInnhold(props.utbetalingerPåVent)}
        </Style>
    );
}

export default UtbetalingerPåVentListe;
