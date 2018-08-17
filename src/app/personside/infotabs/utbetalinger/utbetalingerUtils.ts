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

export function månedOgÅrForUtbetaling(utbetaling: Utbetaling) {
    const måned = moment(utbetaling.posteringsdato).month();
    const år = moment(utbetaling.posteringsdato).year();
    return månedTilNavnMapping[måned] + ' ' + år;
}

export function sortByPosteringsDato(a: Utbetaling, b: Utbetaling) {
    return moment(b.posteringsdato).unix() - moment(a.posteringsdato).unix();
}
