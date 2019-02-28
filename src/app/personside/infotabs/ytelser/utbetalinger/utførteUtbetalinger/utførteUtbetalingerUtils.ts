import {
    filtrerBortUtbetalingerSomIkkeErUtbetalt,
    fjernTommeUtbetalinger,
    getTypeFromYtelse,
    reduceUtbetlingerTilYtelser
} from '../../../utbetalinger/utils/utbetalingerUtils';
import { Utbetaling, UtbetalingerResponse } from '../../../../../../models/utbetalinger';
import { YtelserKeys } from '../../ytelserKeys';
import { genericDescendingDateComparator } from '../../../../../../utils/dateUtils';
import { isLoaded, isReloading, RestReducer } from '../../../../../../redux/restReducers/restReducer';
import moment from 'moment';
import { PersonRespons } from '../../../../../../models/person/person';
import { KnappStatus } from './UtførteUtbetalingerContainer';

export const toÅrTilbakeITid = moment()
    .subtract(2, 'year')
    .startOf('day')
    .toDate();
export const nittiDagerTilbakeITid = moment()
    .subtract(90, 'day')
    .startOf('day')
    .toDate();

export function filtrerOgSorterUtbetalinger(utbetalinger: Utbetaling[], type: YtelserKeys): Utbetaling[] {
    return utbetalinger
        .map(fjernIrelevanteUtbetalinger(type))
        .filter(filtrerBortUtbetalingerSomIkkeErUtbetalt)
        .filter(fjernTommeUtbetalinger)
        .sort(genericDescendingDateComparator(utbetaling => utbetaling.utbetalingsdato || new Date()));
}

export function fjernIrelevanteUtbetalinger(relevantYtelse: YtelserKeys) {
    return (utbetaling: Utbetaling) => {
        const ytelser = reduceUtbetlingerTilYtelser([utbetaling]).filter(
            ytelse => relevantYtelse === getTypeFromYtelse(ytelse)
        );
        return {
            ...utbetaling,
            ytelser: ytelser
        };
    };
}

export function inneholderToÅrGamleUtbetalinger(reducer: RestReducer<UtbetalingerResponse>) {
    if (!isLoaded(reducer)) {
        return false;
    }
    return moment(reducer.data.periode.startDato).toDate() <= toÅrTilbakeITid;
}

export function getKnappStatus(reducer: RestReducer<PersonRespons>): KnappStatus {
    if (inneholderToÅrGamleUtbetalinger(reducer)) {
        return KnappStatus.Skjul;
    } else if (isReloading(reducer)) {
        return KnappStatus.Spinner;
    }
    return KnappStatus.Vis;
}
