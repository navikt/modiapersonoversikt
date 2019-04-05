import { Utbetaling, UtbetalingerResponse } from '../../../../../../models/utbetalinger';
import { statiskMockUtbetaling, statiskMockYtelse } from '../../../../../../mock/statiskMockUtbetaling';
import { YtelserKeys } from '../../ytelserKeys';
import {
    filtrerOgSorterUtbetalinger,
    getKnappStatus,
    inneholderToÅrGamleUtbetalinger
} from './utførteUtbetalingerUtils';
import { Loaded, NotStarted, Reloading } from '../../../../../../redux/restReducers/deprecatedRestResource';
import { STATUS } from '../../../../../../redux/restReducers/utils';
import moment from 'moment';
import { backendDatoformat } from '../../../../../../mock/utils/mock-utils';
import { KnappStatus } from './UtførteUtbetalingerContainer';

test('filtrerer vekk urelevante ytelser', () => {
    const utbetalinger: Utbetaling[] = [
        {
            ...statiskMockUtbetaling,
            ytelser: [
                {
                    ...statiskMockYtelse,
                    type: YtelserKeys.Foreldrepenger
                }
            ]
        },
        {
            ...statiskMockUtbetaling,
            ytelser: [
                {
                    ...statiskMockYtelse,
                    type: YtelserKeys.Sykepenger
                }
            ]
        }
    ];

    const resultat = filtrerOgSorterUtbetalinger(utbetalinger, YtelserKeys.Foreldrepenger);

    expect(resultat).toHaveLength(1);
    expect(resultat[0].ytelser![0].type).toEqual(YtelserKeys.Foreldrepenger);
});

test('gjennkjenner at reducer inneholder to år gamle utbetalinger', () => {
    const resource: Loaded<UtbetalingerResponse> = loadedRestReducerMed2ÅrGamleUtbetalinger();

    const resultat = inneholderToÅrGamleUtbetalinger(resource);
    expect(resultat).toBe(true);
});

test('leverer riktig knappstatus', () => {
    let result = getKnappStatus(unLoadedRestReducer());
    expect(result).toBe(KnappStatus.Vis);

    result = getKnappStatus(loadedRestReducerMed90DagerGamleUtbetalinger());
    expect(result).toBe(KnappStatus.Vis);

    result = getKnappStatus(reloadingRestReducerMed90DagerGamleUtbetalinger());
    expect(result).toBe(KnappStatus.Spinner);

    result = getKnappStatus(loadedRestReducerMed2ÅrGamleUtbetalinger());
    expect(result).toBe(KnappStatus.Skjul);
});

function unLoadedRestReducer(): NotStarted<UtbetalingerResponse> {
    return {
        status: STATUS.NOT_STARTED
    };
}

function loadedRestReducerMed2ÅrGamleUtbetalinger(): Loaded<UtbetalingerResponse> {
    return {
        status: STATUS.SUCCESS,
        data: {
            periode: {
                startDato: moment()
                    .subtract(2, 'year')
                    .startOf('day')
                    .format(backendDatoformat),
                sluttDato: moment().format(backendDatoformat)
            },
            utbetalinger: []
        }
    };
}

function loadedRestReducerMed90DagerGamleUtbetalinger(): Loaded<UtbetalingerResponse> {
    let reducer = loadedRestReducerMed2ÅrGamleUtbetalinger();
    reducer.data.periode.startDato = moment()
        .subtract(90, 'day')
        .startOf('day')
        .format(backendDatoformat);
    return reducer;
}

function reloadingRestReducerMed90DagerGamleUtbetalinger(): Reloading<UtbetalingerResponse> {
    let reducer = loadedRestReducerMed90DagerGamleUtbetalinger() as Reloading<UtbetalingerResponse>;
    reducer.status = STATUS.RELOADING;
    return reducer;
}
