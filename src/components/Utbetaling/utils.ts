import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import { type UtbetalingFilter, utbetalingFilterAtom } from 'src/components/Utbetaling/Filter';
import { errorPlaceholder, type QueryResult, responseErrorMessage } from 'src/components/ytelser/utils';
import { useUtbetalinger } from 'src/lib/clients/modiapersonoversikt-api';
import type { Utbetaling, UtbetalingerResponseDto, Ytelse } from 'src/lib/types/modiapersonoversikt-api';
import { datoSynkende, datoVerbose } from 'src/utils/date-utils';

const filterUtbetalinger = (utbetalinger: Utbetaling[], filters: UtbetalingFilter): Utbetaling[] => {
    const { ytelseTyper, dateRange } = filters;

    if (!utbetalinger || utbetalinger.length === 0) {
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
            return dato.isSameOrAfter(dateRange.from) && dato.isSameOrBefore(dateRange.to);
        });
    }

    return filteredList;
};

export const useFilterUtbetalinger = (): QueryResult<UtbetalingerResponseDto> => {
    const filters = useAtomValue(utbetalingFilterAtom);
    const startDato = filters.dateRange.from.format('YYYY-MM-DD');
    const sluttDato = filters.dateRange.to.format('YYYY-MM-DD');
    const utbetalingerResponse = useUtbetalinger(startDato, sluttDato);

    const utbetalinger = utbetalingerResponse?.data?.utbetalinger ?? [];
    const errorMessages = [errorPlaceholder(utbetalingerResponse, responseErrorMessage('utbetalinger'))];
    const sortedUtbetalinger = utbetalinger.toSorted(datoSynkende((t) => t.posteringsdato));

    return {
        ...utbetalingerResponse,
        data: {
            ...utbetalingerResponse.data,
            utbetalinger: filterUtbetalinger(sortedUtbetalinger, filters) ?? []
        },
        errorMessages: errorMessages.filter(Boolean)
    } as QueryResult<UtbetalingerResponseDto>;
};

export const getNettoSumYtelser = (ytelser: Ytelse[]): number => {
    return ytelser.reduce((acc: number, ytelse: Ytelse) => acc + ytelse.nettobelop, 0);
};

export const getBruttoSumYtelser = (ytelser: Ytelse[]): number => {
    return ytelser.reduce((acc: number, ytelse: Ytelse) => acc + ytelse.ytelseskomponentersum, 0);
};

export const getTrekkOgSkattSumYtelser = (ytelser: Ytelse[]): number => {
    return ytelser.reduce((acc: number, ytelse: Ytelse) => acc + ytelse.skattsum + ytelse.trekksum, 0);
};

export const reduceUtbetlingerTilYtelser = (utbetalinger: Utbetaling[]): Ytelse[] => {
    return utbetalinger.flatMap((utbetaling) => utbetaling.ytelser ?? []);
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

export const summertTrekkOgSkattBelopFraUtbetalinger = (utbetalinger: Utbetaling[]): number => {
    const ytelser = reduceUtbetlingerTilYtelser(utbetalinger);
    return getTrekkOgSkattSumYtelser(ytelser);
};

export const getUtbetalingId = (utbetaling: Utbetaling) =>
    `${utbetaling.ytelser?.map((item) => item.type?.replace(/\s+/g, ''))?.join('')}${utbetaling.posteringsdato}`;

export function getGjeldendeDatoForUtbetaling(utbetaling: Utbetaling): string {
    return utbetaling.utbetalingsdato || utbetaling.forfallsdato || utbetaling.posteringsdato;
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
