import * as React from 'react';
import { Utbetaling as UtbetalingInterface } from '../../../../../models/utbetalinger';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import SammensattUtbetaling from './SammensattUtbetaling';

import EnkelUtbetaling from './EnkelUtbetaling';
import { useInfotabsDyplenker } from '../../dyplenker';
import usePrinter from '../../../../../utils/UsePrinter';

interface Props {
    utbetaling: UtbetalingInterface;
}

function Utbetaling(props: Props) {
    const printer = usePrinter();
    const dyplenker = useInfotabsDyplenker();
    const utbetaling = props.utbetaling;
    if (!utbetaling.ytelser) {
        console.error('Utbetaling mangler ytelser', utbetaling);
        return <AlertStripeInfo>Manglende data om utbetaling</AlertStripeInfo>;
    }

    const enkeltYtelse = utbetaling.ytelser.length === 1;

    const erValgtIUrl = dyplenker.utbetaling.erValgt(utbetaling);
    const PrinterWrapper = printer.printerWrapper;
    if (enkeltYtelse) {
        const ytelse = utbetaling.ytelser[0];
        return (
            <PrinterWrapper>
                {printer.printKnapp}
                <EnkelUtbetaling utbetaling={utbetaling} ytelse={ytelse} valgt={erValgtIUrl} />
            </PrinterWrapper>
        );
    } else {
        return <SammensattUtbetaling utbetaling={utbetaling} erValgtIUrl={erValgtIUrl} />;
    }
}

export default React.memo(Utbetaling);
