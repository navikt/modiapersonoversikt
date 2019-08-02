import * as React from 'react';
import { Utbetaling as UtbetalingInterface } from '../../../../../models/utbetalinger';
import AlertStripeInfo from 'nav-frontend-alertstriper/lib/info-alertstripe';
import SammensattUtbetaling from './SammensattUtbetaling';

import EnkelUtbetaling from './EnkelUtbetaling';

interface Props {
    utbetaling: UtbetalingInterface;
}

function Utbetaling(props: Props) {
    const utbetaling = props.utbetaling;
    if (!utbetaling.ytelser) {
        console.error('Utbetaling mangler ytelser', utbetaling);
        return <AlertStripeInfo>Manglende data om utbetaling</AlertStripeInfo>;
    }

    const enkeltYtelse = utbetaling.ytelser.length === 1;

    if (enkeltYtelse) {
        const ytelse = utbetaling.ytelser[0];
        return <EnkelUtbetaling utbetaling={utbetaling} ytelse={ytelse} />;
    } else {
        return <SammensattUtbetaling utbetaling={utbetaling} />;
    }
}

export default Utbetaling;
