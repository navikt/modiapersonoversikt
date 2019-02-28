import * as React from 'react';
import HistoriskUtbetalingKomponent from './HistoriskUtbetalingKomponent';
import { Knapp } from 'nav-frontend-knapper';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { FlexCenter } from '../../../../../../components/common-styled-components';
import { Utbetaling } from '../../../../../../models/utbetalinger';
import { KnappStatus } from './HistoriskeUtbetalingerContainer';
import { flatMapYtelser } from '../../../utbetalinger/utils/utbetalingerUtils';

interface Props {
    utbetalinger: Utbetaling[];
    knappStatus: KnappStatus;
    hentToÅrGamleUtbetalinger: () => void;
}

function HistoriskeUtbetalingerListe(props: Props) {
    if (props.knappStatus === KnappStatus.Skjul && (!props.utbetalinger || props.utbetalinger.length === 0)) {
        return <AlertStripeInfo>Kunne ikke finne noen historiske utbetalinger</AlertStripeInfo>;
    }

    const historiskeUtbetalinger = props.utbetalinger.map(utbetaling =>
        flatMapYtelser([utbetaling]).map((ytelse, index) => (
            <HistoriskUtbetalingKomponent ytelse={ytelse} utbetaling={utbetaling} key={index} />
        ))
    );

    const hentAlleUtbetalingerKnapp = !(props.knappStatus === KnappStatus.Skjul) && (
        <FlexCenter>
            <Knapp onClick={props.hentToÅrGamleUtbetalinger} spinner={props.knappStatus === KnappStatus.Spinner}>
                Hent alle historiske utbetalinger
            </Knapp>
        </FlexCenter>
    );

    return (
        <>
            <ol>{historiskeUtbetalinger}</ol>
            {hentAlleUtbetalingerKnapp}
        </>
    );
}

export default HistoriskeUtbetalingerListe;
