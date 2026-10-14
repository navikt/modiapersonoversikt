import { renderHook } from '@testing-library/react';
import dayjs from 'dayjs';
import { createStore, Provider } from 'jotai';
import type { ReactNode } from 'react';
import { PeriodType } from 'src/components/DateFilters/types';
import type { Utbetaling, Ytelse } from 'src/generated/modiapersonoversikt-api';
import { useUtbetalinger } from 'src/lib/clients/modiapersonoversikt-api';
import { utbetalingFilterAtom } from './Filter';
import {
    getAlleYtelseTyper,
    getYtelseTema,
    oppsummerYtelserPerType,
    summertBruttobelopFraUtbetalinger,
    summertNettobelopFraUtbetalinger,
    summertSkattBelopFraUtbetalinger,
    summertTrekkBelopFraUtbetalinger,
    useFilterUtbetalinger
} from './utils';

const routeSearch = vi.hoisted(() => ({ periode: 'siste30' as string | undefined }));

vi.mock('@tanstack/react-router', () => ({ useSearch: () => ({ periode: routeSearch.periode }) }));
vi.mock('src/lib/clients/modiapersonoversikt-api', () => ({ useUtbetalinger: vi.fn() }));

const utbetaling = (posteringsdato: string, utbetalingsdato: string): Utbetaling => ({
    posteringsdato,
    utbetalingsdato,
    erUtbetaltTilPerson: true,
    erUtbetaltTilOrganisasjon: false,
    erUtbetaltTilSamhandler: false,
    nettobelop: 100,
    metode: 'bank',
    status: 'utbetalt',
    ytelser: []
});

const ytelse = (type: string | null, brutto: number, skatt: number, trekk: number, netto: number): Ytelse => ({
    type,
    ytelseskomponentListe: [],
    ytelseskomponentersum: brutto,
    trekkListe: [],
    trekksum: trekk,
    skattListe: [],
    skattsum: skatt,
    nettobelop: netto
});

const ytelseMedPeriode = (ytelse: Ytelse, start: string, slutt: string): Ytelse => ({
    ...ytelse,
    periode: { start, slutt }
});

beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-09-28T12:00:00'));
});

afterEach(() => {
    routeSearch.periode = 'siste30';
    vi.useRealTimers();
    vi.clearAllMocks();
});

it.each([null, undefined, '', '   '])('viser Mangler tema for typen %s', (type) => {
    expect(getYtelseTema({ type })).toBe('Mangler tema');
});

it('viser samme temanavn i oversikten og betalingslisten', () => {
    const betalinger = [
        {
            ...utbetaling('2026-09-20', '2026-09-20'),
            ytelser: [
                ytelse(null, 100, 0, 0, 100),
                ytelse('   ', 200, 0, 0, 200),
                ytelse(' Sykepenger ', 300, 0, 0, 300)
            ]
        }
    ];

    expect(getAlleYtelseTyper(betalinger)).toEqual(['Mangler tema', 'Sykepenger']);
    expect(oppsummerYtelserPerType(betalinger).map((rad) => rad.type)).toEqual(getAlleYtelseTyper(betalinger));
});

it('summerer beløp per ytelsestype og inkluderer ytelser uten type', () => {
    const betalinger = [
        {
            ...utbetaling('2026-09-20', '2026-09-20'),
            ytelser: [
                ytelseMedPeriode(ytelse('Sykepenger', 1000, -200, -50, 750), '2026-01-01', '2026-03-31'),
                ytelseMedPeriode(ytelse('Dagpenger', 500, -50, 0, 450), '2026-02-01', '2026-04-30')
            ]
        },
        {
            ...utbetaling('2026-09-10', '2026-09-10'),
            ytelser: [
                ytelseMedPeriode(ytelse(' Sykepenger ', 2000, -400, -100, 1500), '2025-12-01', '2026-05-31'),
                ytelse(null, 300, -30, 0, 270)
            ]
        }
    ];

    expect(oppsummerYtelserPerType(betalinger)).toEqual([
        {
            type: 'Sykepenger',
            brutto: 3000,
            skatt: -600,
            trekk: -150,
            netto: 2250,
            periode: { fra: '2025-12-01', til: '2026-05-31' }
        },
        {
            type: 'Dagpenger',
            brutto: 500,
            skatt: -50,
            trekk: 0,
            netto: 450,
            periode: { fra: '2026-02-01', til: '2026-04-30' }
        },
        {
            type: 'Mangler tema',
            brutto: 300,
            skatt: -30,
            trekk: 0,
            netto: 270,
            periode: null
        }
    ]);
});

it('samler manglende og tomme typer slik at radene stemmer med hovedsummene', () => {
    const betalinger = [
        {
            ...utbetaling('2026-09-20', '2026-09-20'),
            ytelser: [
                ytelse('Sykepenger', 1000, -200, -50, 750),
                ytelse(null, 300, -30, -10, 260),
                { ...ytelse(null, 200, -20, -5, 175), type: undefined },
                ytelse('', 100, -10, 0, 90),
                ytelse('   ', 50, -5, 0, 45)
            ]
        }
    ];
    const rader = oppsummerYtelserPerType(betalinger);

    expect(rader.find((rad) => rad.type === 'Mangler tema')).toEqual({
        type: 'Mangler tema',
        brutto: 650,
        skatt: -65,
        trekk: -15,
        netto: 570,
        periode: null
    });
    expect(rader.reduce((sum, rad) => sum + rad.brutto, 0)).toBe(summertBruttobelopFraUtbetalinger(betalinger));
    expect(rader.reduce((sum, rad) => sum + rad.skatt, 0)).toBe(summertSkattBelopFraUtbetalinger(betalinger));
    expect(rader.reduce((sum, rad) => sum + rad.trekk, 0)).toBe(summertTrekkBelopFraUtbetalinger(betalinger));
    expect(rader.reduce((sum, rad) => sum + rad.netto, 0)).toBe(summertNettobelopFraUtbetalinger(betalinger));
});

it('filtrerer lenket periode på posteringsdato, også når vist dato er en annen', () => {
    const innenfor = utbetaling('2026-09-20', '2026-01-01');
    const kommende = utbetaling('2026-09-28', '2026-10-01');
    const utenfor = utbetaling('2026-08-28', '2026-09-28');
    vi.mocked(useUtbetalinger).mockReturnValue({
        data: {
            utbetalinger: [innenfor, kommende, utenfor],
            periode: { startDato: '2026-08-29', sluttDato: '2026-09-28' }
        },
        isLoading: false,
        isError: false
    } as ReturnType<typeof useUtbetalinger>);

    const { result } = renderHook(() => useFilterUtbetalinger(), {
        wrapper: ({ children }: { children: ReactNode }) => <Provider>{children}</Provider>
    });

    expect(useUtbetalinger).toHaveBeenCalledWith('2026-08-29', '2026-09-28');
    expect(result.current.data.utbetalinger).toEqual([kommende, innenfor]);
});

it('henter og filtrerer etter det vanlige datofilteret når lenkeperioden er fjernet', () => {
    routeSearch.periode = undefined;
    const innenfor = utbetaling('2026-07-15', '2026-07-15');
    const utenfor = utbetaling('2026-09-28', '2026-09-28');
    vi.mocked(useUtbetalinger).mockReturnValue({
        data: { utbetalinger: [innenfor, utenfor], periode: { startDato: '2026-07-01', sluttDato: '2026-07-31' } },
        isLoading: false,
        isError: false
    } as ReturnType<typeof useUtbetalinger>);
    const store = createStore();
    store.set(utbetalingFilterAtom, {
        dateRange: { from: dayjs('2026-07-01'), to: dayjs('2026-07-31') },
        periodeType: PeriodType.CUSTOM,
        ytelseTyper: []
    });

    const { result } = renderHook(() => useFilterUtbetalinger(), {
        wrapper: ({ children }: { children: ReactNode }) => <Provider store={store}>{children}</Provider>
    });

    expect(useUtbetalinger).toHaveBeenCalledWith('2026-07-01', '2026-07-31');
    expect(result.current.data.utbetalinger).toEqual([innenfor]);
});
