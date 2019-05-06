import * as React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { FlexCenter } from '../../../../../../components/common-styled-components';
import { Utbetaling } from '../../../../../../models/utbetalinger';
import { flatMapYtelser } from '../../../utbetalinger/utils/utbetalingerUtils';
import utførtUtbetalingEntries from './UtførtUtbetalingEntries';
import { KnappStatus } from './UtførteUtbetalingerContainer';
import { StyledTable, TableRow } from '../../../../../../utils/tableUtils';
import styled from 'styled-components';

interface Props {
    utbetalinger: Utbetaling[];
    knappStatus: KnappStatus;
    hentToÅrGamleUtbetalinger: () => void;
}

const Style = styled.div`
    > *:not(:last-child) {
        margin-bottom: 1rem;
    }
`;

function UtførteUtbetalinger(props: Props) {
    if (props.knappStatus === KnappStatus.Skjul && (!props.utbetalinger || props.utbetalinger.length === 0)) {
        return <AlertStripeInfo>Kunne ikke finne noen utførte utbetalinger</AlertStripeInfo>;
    }
    const tittelRekke = [
        'Type',
        'Netto',
        'Dato',
        'Periode',
        'Bruttobeløp',
        'Arbeidsgiver',
        'Orgnummer',
        'Skattetrekk',
        'Kreditortrekk'
    ];
    const rows = props.utbetalinger.reduce(
        (acc: TableRow[], utbetaling) => [
            ...acc,
            ...flatMapYtelser([utbetaling]).map(ytelse => utførtUtbetalingEntries(ytelse, utbetaling))
        ],
        []
    );
    const hentAlleUtbetalingerKnapp = !(props.knappStatus === KnappStatus.Skjul) && (
        <FlexCenter>
            <Knapp onClick={props.hentToÅrGamleUtbetalinger} spinner={props.knappStatus === KnappStatus.Spinner}>
                Hent alle utførte utbetalinger
            </Knapp>
        </FlexCenter>
    );

    return (
        <Style>
            {rows.length !== 0 && <StyledTable tittelRekke={tittelRekke} rows={rows} />}
            {hentAlleUtbetalingerKnapp || (
                <AlertStripeInfo>Viser alle utførte utbetalinger 2 år tilbake i tid</AlertStripeInfo>
            )}
        </Style>
    );
}

export default UtførteUtbetalinger;
