import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { memo } from 'react';
import type { Utbetaling as UtbetalingInterface } from '../../../../../models/utbetalinger';
import { useInfotabsDyplenker } from '../../dyplenker';
import EnkelUtbetaling from './EnkelUtbetaling';
import SammensattUtbetaling from './SammensattUtbetaling';

interface Props {
    utbetaling: UtbetalingInterface;
}

function Utbetaling(props: Props) {
    const dyplenker = useInfotabsDyplenker();
    const utbetaling = props.utbetaling;
    if (!utbetaling.ytelser) {
        console.error('Utbetaling mangler ytelser', utbetaling);
        return <AlertStripeInfo>Manglende data om utbetaling</AlertStripeInfo>;
    }

    const enkeltYtelse = utbetaling.ytelser.length === 1;

    const erValgtIUrl = dyplenker.utbetaling.erValgt(utbetaling);
    if (enkeltYtelse) {
        const ytelse = utbetaling.ytelser[0];
        return <EnkelUtbetaling utbetaling={utbetaling} ytelse={ytelse} erValgtIUrl={erValgtIUrl} />;
    }
    return <SammensattUtbetaling utbetaling={utbetaling} erValgtIUrl={erValgtIUrl} />;
}

export default memo(Utbetaling);
