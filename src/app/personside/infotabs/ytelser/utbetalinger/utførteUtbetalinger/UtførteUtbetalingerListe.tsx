import * as React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { FlexCenter } from '../../../../../../components/common-styled-components';
import { Utbetaling } from '../../../../../../models/utbetalinger';
import { flatMapYtelser } from '../../../utbetalinger/utils/utbetalingerUtils';
import UtførtUtbetaling from './UtførtUtbetaling';
import { KnappStatus } from './UtførteUtbetalingerContainer';

interface Props {
    utbetalinger: Utbetaling[];
    knappStatus: KnappStatus;
    hentToÅrGamleUtbetalinger: () => void;
}

function UtførteUtbetalingerListe(props: Props) {
    if (props.knappStatus === KnappStatus.Skjul && (!props.utbetalinger || props.utbetalinger.length === 0)) {
        return <AlertStripeInfo>Kunne ikke finne noen utførte utbetalinger</AlertStripeInfo>;
    }

    const utførtUtbetaling = props.utbetalinger.map(utbetaling =>
        flatMapYtelser([utbetaling]).map((ytelse, index) => (
            <UtførtUtbetaling ytelse={ytelse} utbetaling={utbetaling} key={index} />
        ))
    );

    const hentAlleUtbetalingerKnapp = !(props.knappStatus === KnappStatus.Skjul) && (
        <FlexCenter>
            <Knapp onClick={props.hentToÅrGamleUtbetalinger} spinner={props.knappStatus === KnappStatus.Spinner}>
                Hent alle utførte utbetalinger
            </Knapp>
        </FlexCenter>
    );

    return (
        <>
            <ol>{utførtUtbetaling}</ol>
            {hentAlleUtbetalingerKnapp}
        </>
    );
}

export default UtførteUtbetalingerListe;
