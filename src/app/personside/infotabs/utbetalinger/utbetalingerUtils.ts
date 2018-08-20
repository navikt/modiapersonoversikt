import { Utbetaling } from '../../../../models/utbetalinger';
import moment = require('moment');

const månedTilNavnMapping = {
    0: 'Januar',
    1: 'Februar',
    2: 'Mars',
    3: 'April',
    4: 'Mai',
    5: 'Juni',
    6: 'Juli',
    7: 'August',
    8: 'September',
    9: 'Oktober',
    10: 'November',
    11: 'Desember'
};

export function datoVerbose(dato: string | Date) {
    const måned = månedTilNavnMapping[moment(dato).month()];
    const år = moment(dato).year();
    const dag = moment(dato).date();
    return {
        dag: dag,
        måned: måned,
        år: år,
        sammensatt: `${dag}. ${måned} ${år}`
    };
}

export function månedOgÅrForUtbetaling(utbetaling: Utbetaling) {
    const verbose = datoVerbose(utbetaling.posteringsdato);
    return `${verbose.måned} ${verbose.år}`;
}

export function sortByPosteringsDato(a: Utbetaling, b: Utbetaling) {
    return moment(b.posteringsdato).unix() - moment(a.posteringsdato).unix();
}
