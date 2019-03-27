import * as React from 'react';
import DescriptionList, { DescriptionListEntries } from '../../../../../../components/DescriptionList';
import styled from 'styled-components';
import theme from '../../../../../../styles/personOversiktTheme';
import { UtbetalingPåVent } from '../../../../../../models/ytelse/ytelse-utbetalinger';
import { periodeEllerNull, prosentEllerNull } from '../../../../../../utils/stringFormatting';
import { utledUtbetalingPåVentÅrsak } from './utledUtbetalingerPåVentÅrsak';

interface Props {
    utbetalingPåVent: UtbetalingPåVent;
}

const Style = styled.li`
    ${theme.gråttPanel};
`;

function UtbetalingPåVentElement(props: Props) {
    const entries: DescriptionListEntries = {
        Årsak: utledUtbetalingPåVentÅrsak(props.utbetalingPåVent),
        Utbetalingsperiode: periodeEllerNull(props.utbetalingPåVent.vedtak),
        Utbetalingsgrad: prosentEllerNull(props.utbetalingPåVent.utbetalingsgrad)
    };
    return (
        <Style aria-label={'Utbetaling på vvent' + entries.Registeringsdato}>
            <DescriptionList entries={entries} />
        </Style>
    );
}

export default UtbetalingPåVentElement;
