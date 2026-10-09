import { useSearch } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import { getPeriodeFromYtelser } from 'src/app/personside/infotabs/utbetalinger/utils/utbetalinger-utils';
import { getPeriodFromOption } from 'src/components/DateFilters/DatePeriodSelector';
import { PeriodType } from 'src/components/DateFilters/types';
import { type UtbetalingFilter, utbetalingFilterAtom } from 'src/components/Utbetaling/Filter';
import { errorPlaceholder, type QueryResult, responseErrorMessage } from 'src/components/ytelser/utils';
import { useUtbetalinger } from 'src/lib/clients/modiapersonoversikt-api';
import type { Utbetaling, UtbetalingerResponseDto, Ytelse } from 'src/lib/types/modiapersonoversikt-api';
import type { Periode } from 'src/models/tid';
import { datoSynkende, datoVerbose, formatterDato } from 'src/utils/date-utils';
import { type Group, groupBy } from 'src/utils/groupArray';

const filterUtbetalinger = (utbetalinger: Utbetaling[], filters: UtbetalingFilter): Utbetaling[] => {
    const { ytelseTyper, dateRange } = filters;

    if (utbetalinger.length === 0) {
        return [];
    }

    let filteredList = utbetalinger;
    if (ytelseTyper?.length) {
        filteredList = filteredList.filter((utbetaling) =>
            utbetaling.ytelser.some((item) => item.type && ytelseTyper.includes(item.type))
        );
    }

    if (dateRange?.from && dateRange?.to) {
        filteredList = filteredList.filter((utbetaling) => {
            const dato = dayjs(utbetaling.posteringsdato);
            return dato.isValid() && !dato.isBefore(dateRange.from, 'day') && !dato.isAfter(dateRange.to, 'day');
        });
    }

    return filteredList;
};

type FilteredUtbetalingerResponse = UtbetalingerResponseDto & { alleUtbetalinger: Utbetaling[] };

export const useFilterUtbetalinger = (): QueryResult<FilteredUtbetalingerResponse> => {
    const filters = useAtomValue(utbetalingFilterAtom);
    const { periode } = useSearch({ from: '/new/person/utbetaling' });
    const dateRange = periode === 'siste30' ? getPeriodFromOption(PeriodType.LAST_30_DAYS) : filters.dateRange;
    const startDato = (dateRange.from ?? dayjs().subtract(2, 'year')).startOf('day').format('YYYY-MM-DD');
    const sluttDato = (dateRange.to ?? dayjs()).endOf('day').format('YYYY-MM-DD');
    const utbetalingerResponse = useUtbetalinger(startDato, sluttDato);

    const utbetalinger = utbetalingerResponse?.data?.utbetalinger ?? [];
    const errorMessages = [errorPlaceholder(utbetalingerResponse, responseErrorMessage('utbetalinger'))];
    const sortedUtbetalinger = utbetalinger.toSorted(datoSynkende((t) => t.posteringsdato));

    return {
        ...utbetalingerResponse,
        data: {
            ...utbetalingerResponse.data,
            utbetalinger: filterUtbetalinger(sortedUtbetalinger, { ...filters, dateRange }),
            alleUtbetalinger: sortedUtbetalinger
        },
        errorMessages: errorMessages.filter(Boolean)
    } as QueryResult<FilteredUtbetalingerResponse>;
};

const getNettoSumYtelser = (ytelser: Ytelse[]): number => {
    return ytelser.reduce((acc: number, ytelse: Ytelse) => acc + ytelse.nettobelop, 0);
};

export const getBruttoSumYtelser = (ytelser: Ytelse[]): number => {
    return ytelser.reduce((acc: number, ytelse: Ytelse) => acc + ytelse.ytelseskomponentersum, 0);
};

export const getTrekkOgSkattSumYtelser = (ytelser: Ytelse[]): number => {
    return ytelser.reduce((acc: number, ytelse: Ytelse) => acc + ytelse.skattsum + ytelse.trekksum, 0);
};

const getSkattSumYtelser = (ytelser: Ytelse[]): number => {
    return ytelser.reduce((acc: number, ytelse: Ytelse) => acc + ytelse.skattsum, 0);
};

const getTrekkSumYtelser = (ytelser: Ytelse[]): number => {
    return ytelser.reduce((acc: number, ytelse: Ytelse) => acc + ytelse.trekksum, 0);
};

export const reduceUtbetlingerTilYtelser = (utbetalinger: Utbetaling[]): Ytelse[] => {
    return utbetalinger.flatMap((utbetaling) => utbetaling.ytelser ?? []);
};

export interface YtelseOppsummering {
    type: string;
    brutto: number;
    skatt: number;
    trekk: number;
    netto: number;
    periode: Periode | null;
}

export const oppsummerYtelserPerType = (utbetalinger: Utbetaling[]): YtelseOppsummering[] => {
    const ytelser = reduceUtbetlingerTilYtelser(utbetalinger).filter((ytelse): ytelse is Ytelse & { type: string } =>
        Boolean(ytelse.type?.trim())
    );
    type YtelseMedType = Ytelse & { type: string };
    const grupper: Group<YtelseMedType> = Object.create(null);
    const ytelserGruppertPaaType = ytelser.reduce<Group<YtelseMedType>>(
        groupBy<YtelseMedType>((ytelse) => ytelse.type.trim()),
        grupper
    );

    return Object.entries(ytelserGruppertPaaType).map(([type, ytelser]) => {
        const oppsummering = ytelser.reduce(
            (sum, ytelse) => ({
                type,
                brutto: sum.brutto + ytelse.ytelseskomponentersum,
                skatt: sum.skatt + ytelse.skattsum,
                trekk: sum.trekk + ytelse.trekksum,
                netto: sum.netto + ytelse.nettobelop
            }),
            { type, brutto: 0, skatt: 0, trekk: 0, netto: 0 }
        );
        const ytelserMedPeriode = ytelser.filter((ytelse) => ytelse.periode);
        return {
            ...oppsummering,
            periode: ytelserMedPeriode.length > 0 ? getPeriodeFromYtelser(ytelserMedPeriode) : null
        };
    });
};

export const formaterNOK = (belop: number): string => {
    return belop.toLocaleString('no', { minimumFractionDigits: 2 });
};

export const summertNettobelopFraUtbetalinger = (utbetalinger: Utbetaling[]): number => {
    const ytelser = reduceUtbetlingerTilYtelser(utbetalinger);
    return getNettoSumYtelser(ytelser);
};

export const summertBruttobelopFraUtbetalinger = (utbetalinger: Utbetaling[]): number => {
    const ytelser = reduceUtbetlingerTilYtelser(utbetalinger);
    return getBruttoSumYtelser(ytelser);
};

export const getAlleYtelseTyper = (utbetalinger: Utbetaling[]): string[] => {
    const ytelser = reduceUtbetlingerTilYtelser(utbetalinger);
    return ytelser.flatMap((ytelse) => ytelse.type?.trim() || []).unique();
};

export const summertSkattBelopFraUtbetalinger = (utbetalinger: Utbetaling[]): number => {
    const ytelser = reduceUtbetlingerTilYtelser(utbetalinger);
    return getSkattSumYtelser(ytelser);
};

export const summertTrekkBelopFraUtbetalinger = (utbetalinger: Utbetaling[]): number => {
    const ytelser = reduceUtbetlingerTilYtelser(utbetalinger);
    return getTrekkSumYtelser(ytelser);
};

export const getUtbetalingId = (utbetaling: Utbetaling) =>
    `${utbetaling.ytelser?.map((item) => item.type?.replace(/\s+/g, ''))?.join('')}${utbetaling.posteringsdato}`;

export function getGjeldendeDatoForUtbetaling(utbetaling: Utbetaling): string {
    return utbetaling.utbetalingsdato || utbetaling.forfallsdato || utbetaling.posteringsdato;
}
export function datoVisning(utbetaling: Utbetaling): string {
    const dato = formatterDato(getGjeldendeDatoForUtbetaling(utbetaling));
    if (utbetaling.utbetalingsdato) return dato;
    return `${dato} ${utbetaling.forfallsdato ? '(forfall)' : '(postering)'}`;
}
export function utbetalingDatoComparator(a: Utbetaling, b: Utbetaling) {
    return dayjs(getGjeldendeDatoForUtbetaling(b)).unix() - dayjs(getGjeldendeDatoForUtbetaling(a)).unix();
}
export function maanedOgAarForUtbetaling(utbetaling: Utbetaling) {
    const verbose = datoVerbose(getGjeldendeDatoForUtbetaling(utbetaling));
    return `${verbose.måned} ${verbose.år}`;
}

export const fargePaBelop = (belop: number) => {
    if (belop > 0) {
        return 'text-ax-text-success-subtle';
    } else if (belop < 0) {
        return 'text-ax-text-danger-subtle';
    } else {
        return '';
    }
};
