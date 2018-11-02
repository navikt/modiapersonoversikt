import * as React from 'react';
import { Utbetaling as UtbetalingInterface } from '../../../../../models/utbetalinger';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import SammensattUtbetaling from './SammensattUtbetaling';

import EnkelUtbetaling from './EnkelUtbetaling';
import { FokusProps } from '../Utbetalinger';

interface OwnProps {
    utbetaling: UtbetalingInterface;
}

type Props = OwnProps & FokusProps;

function Utbetaling(props: Props) {
    const utbetaling = props.utbetaling;
    if (!utbetaling.ytelser) {
        console.error('Utbetaling mangler ytelser', utbetaling);
        return <AlertStripeInfo>Manglende data om utbetaling</AlertStripeInfo>;
    }

    const enkeltYtelse = utbetaling.ytelser.length === 1;

    return enkeltYtelse
        ? (
            <EnkelUtbetaling
                utbetaling={utbetaling}
                updateYtelseIFokus={props.updateYtelseIFokus}
                erIFokus={props.ytelseIFokus === utbetaling.ytelser[0]}
            />)
        : <SammensattUtbetaling {...props}/>;
}

export default Utbetaling;
