import {
    filtrerBortUtbetalingerSomIkkeErUtbetalt,
    fjernTommeUtbetalinger,
    getTypeFromYtelse,
    reduceUtbetlingerTilYtelser
} from '../../../utbetalinger/utils/utbetalingerUtils';
import { Utbetaling, UtbetalingerResponse } from '../../../../../../models/utbetalinger';
import { YtelserKeys } from '../../ytelserKeys';
import { datoSynkende } from '../../../../../../utils/dateUtils';
import moment from 'moment';
import { KnappStatus } from './UtførteUtbetalingerContainer';
import { RestResource, isLoaded, isReloading } from '../../../../../../rest/utils/restResource';

function toÅrTilbakeITid() {
    return moment()
        .subtract(2, 'year')
        .startOf('day')
        .toDate();
}

export function sorterYtelser(utbetaling: Utbetaling): Utbetaling {
    const ytelser = utbetaling.ytelser || [];
    return {
        ...utbetaling,
        ytelser: ytelser
            .sort(datoSynkende(ytelse => ytelse.periode.start))
            .sort(datoSynkende(ytelse => ytelse.periode.slutt))
    };
}

export function filtrerOgSorterUtbetalinger(utbetalinger: Utbetaling[], type: YtelserKeys): Utbetaling[] {
    return utbetalinger
        .map(fjernIrelevanteUtbetalinger(type))
        .filter(filtrerBortUtbetalingerSomIkkeErUtbetalt)
        .filter(fjernTommeUtbetalinger)
        .map(sorterYtelser)
        .sort(datoSynkende(utbetaling => utbetaling.utbetalingsdato || new Date()));
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

export function inneholderToÅrGamleUtbetalinger(resource: RestResource<UtbetalingerResponse>) {
    if (!isLoaded(resource)) {
        return false;
    }
    return moment(resource.data.periode.startDato).toDate() <= toÅrTilbakeITid();
}

export function getKnappStatus(resource: RestResource<UtbetalingerResponse>): KnappStatus {
    if (inneholderToÅrGamleUtbetalinger(resource)) {
        return KnappStatus.Skjul;
    } else if (isReloading(resource)) {
        return KnappStatus.Spinner;
    }
    return KnappStatus.Vis;
}
