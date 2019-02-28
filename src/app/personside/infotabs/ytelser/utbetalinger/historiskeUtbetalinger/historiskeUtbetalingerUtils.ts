import {
    filtrerBortUtbetalingerSomIkkeErUtbetalt,
    fjernTommeUtbetalinger,
    getTypeFromYtelse,
    reduceUtbetlingerTilYtelser
} from '../../../utbetalinger/utils/utbetalingerUtils';
import { Trekk, Utbetaling, UtbetalingerResponse, Ytelse } from '../../../../../../models/utbetalinger';
import { YtelserKeys } from '../../ytelserKeys';
import { genericDescendingDateComparator } from '../../../../../../utils/dateUtils';
import { isLoaded, isReloading, RestReducer } from '../../../../../../redux/restReducers/restReducer';
import { KnappStatus } from './HistoriskeUtbetalingerContainer';
import moment from 'moment';
import { PersonRespons } from '../../../../../../models/person/person';

export const toÅrTilbakeITid = moment()
    .subtract(2, 'year')
    .startOf('day')
    .toDate();
export const nittiDagerTilbakeITid = moment()
    .subtract(90, 'day')
    .startOf('day')
    .toDate();

export function getSummertKreditortrekkFraUtbetaling(ytelse: Ytelse): number {
    if (!ytelse.trekkListe || ytelse.trekkListe.length === 0) {
        return 0;
    }
    const trekkSummert = ytelse.trekkListe.reduce((acc: number, trekk: Trekk) => acc + trekk.trekkbeløp, 0);
    return trekkSummert;
}

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
