import { Utbetaling, UtbetalingerResponse } from '../../../../../../models/utbetalinger';
import { statiskMockUtbetaling, statiskMockYtelse } from '../../../../../../mock/statiskMockUtbetaling';
import { YtelserKeys } from '../../ytelserKeys';
import {
    filtrerOgSorterUtbetalinger,
    getKnappStatus,
    inneholderToÅrGamleUtbetalinger,
    sorterYtelser
} from './utførteUtbetalingerUtils';
import { Loaded, NotStarted, Reloading } from '../../../../../../rest/utils/restResource';
import { STATUS } from '../../../../../../redux/restReducers/utils';
import moment from 'moment';
import { backendDatoformat } from '../../../../../../mock/utils/mock-utils';
import { KnappStatus } from './UtførteUtbetalingerContainer';
import { mockRestResourceState } from '../../../../../../rest/utils/mockRestResourceState';

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

test('sorterer ytelser riktig, sluttdato får prioritet forran startdato', () => {
    const utbetalinger: Utbetaling = {
        ...statiskMockUtbetaling,
        ytelser: [
            {
                ...statiskMockYtelse,
                periode: {
                    start: '2010-01-01',
                    slutt: '2010-01-10'
                }
            },
            {
                ...statiskMockYtelse,
                periode: {
                    start: '2010-01-05',
                    slutt: '2010-01-10'
                }
            },
            {
                ...statiskMockYtelse,
                periode: {
                    start: '2010-01-01',
                    slutt: '2010-01-15'
                }
            }
        ]
    };

    const ytelser = { ...utbetalinger.ytelser };
    const sorterteYtelser = sorterYtelser(utbetalinger).ytelser;

    expect(sorterteYtelser![0].periode).toEqual(ytelser![2].periode);
    expect(sorterteYtelser![1].periode).toEqual(ytelser![1].periode);
    expect(sorterteYtelser![2].periode).toEqual(ytelser![0].periode);
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
        ...mockRestResourceState,
        status: STATUS.NOT_STARTED
    };
}

function loadedRestReducerMed2ÅrGamleUtbetalinger(): Loaded<UtbetalingerResponse> {
    return {
        ...mockRestResourceState,
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
