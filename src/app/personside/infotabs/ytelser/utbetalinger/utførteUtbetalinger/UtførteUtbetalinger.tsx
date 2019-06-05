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
    white-space: nowrap;
`;

function UtførteUtbetalinger(props: Props) {
    const viserToÅrMedUtbetalinger = props.knappStatus === KnappStatus.Viser2årMedUtbetalinger;
    if (viserToÅrMedUtbetalinger && props.utbetalinger.length === 0) {
        return <AlertStripeInfo>Kunne ikke finne noen utførte utbetalinger</AlertStripeInfo>;
    }
    const tittelRekke = [
        'Type',
        'Netto',
        'Utb.dato',
        'Periode',
        'Bruttobeløp',
        'Arb.giver',
        'Org.nummer',
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
    const hentAlleUtbetalingerKnapp = (
        <FlexCenter>
            <Knapp
                onClick={props.hentToÅrGamleUtbetalinger}
                spinner={props.knappStatus === KnappStatus.Henter2årMedUtbetalinger}
            >
                Hent 2 år med utførte utbetalinger
            </Knapp>
        </FlexCenter>
    );

    return (
        <Style>
            {rows.length !== 0 && <StyledTable tittelRekke={tittelRekke} rows={rows} />}
            {viserToÅrMedUtbetalinger ? (
                <AlertStripeInfo>Viser utførte utbetalinger 2 år tilbake i tid</AlertStripeInfo>
            ) : (
                <AlertStripeInfo>Viser utførte utbetalinger 90 dager tilbake i tid</AlertStripeInfo>
            )}
            {!viserToÅrMedUtbetalinger && hentAlleUtbetalingerKnapp}
        </Style>
    );
}

export default UtførteUtbetalinger;
