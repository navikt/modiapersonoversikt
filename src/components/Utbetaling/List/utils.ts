import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { type UtbetalingFilter, utbetalingFilterAtom } from 'src/components/Utbetaling/List/Filter';
import { useUtbetalinger } from 'src/lib/clients/modiapersonoversikt-api';
import { usePersonAtomValue } from 'src/lib/state/context';
import type { Utbetaling, Ytelse, YtelsePeriode } from 'src/lib/types/modiapersonoversikt-api';
import { datoSynkende } from 'src/utils/date-utils';
import { finnMiljoStreng } from 'src/utils/url-utils';

const filterUtbetalinger = (utbetalinger: Utbetaling[], filters: UtbetalingFilter): Utbetaling[] => {
    const { ytelseTyper, utbetaltTil, dateRange } = filters;

    if (!utbetalinger || utbetalinger.length === 0) {
        return [];
    }

    let filteredList = utbetalinger;
    if (ytelseTyper?.length) {
        filteredList = filteredList.filter((utbetaling) =>
            utbetaling.ytelser.some((item) => item.type && ytelseTyper.includes(item.type))
        );
    }

    if (utbetaltTil?.length) {
        filteredList = filteredList.filter(
            (utbetaling) =>
                (utbetaling.erUtbetaltTilOrganisasjon && utbetaltTil.includes(utbetaltTilOrganisasjon)) ||
                (utbetaling.erUtbetaltTilSamhandler && utbetaltTil.includes(utbetaltTilSamhandler)) ||
                (utbetaling.erUtbetaltTilPerson && utbetaltTil.includes(utbetaltTilBruker))
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

export const useFilterUtbetalinger = () => {
    const filters = useAtomValue(utbetalingFilterAtom);
    const startDato = filters.dateRange.from.format('YYYY-MM-DD');
    const sluttDato = filters.dateRange.to.format('YYYY-MM-DD');
    const { data } = useUtbetalinger(startDato, sluttDato);
    const utbetalinger = data?.utbetalinger ?? [];

    const sortedUtbetalinger = utbetalinger.toSorted(datoSynkende((t) => t.posteringsdato));

    return useMemo(() => filterUtbetalinger(sortedUtbetalinger, filters), [utbetalinger, filters]);
};

export const getNettoSumYtelser = (ytelser: Ytelse[]): number => {
    return ytelser.reduce((acc: number, ytelse: Ytelse) => acc + ytelse.nettobelop, 0);
};

export const getBruttoSumYtelser = (ytelser: Ytelse[]): number => {
    return ytelser.reduce((acc: number, ytelse: Ytelse) => acc + ytelse.ytelseskomponentersum, 0);
};

export const getTrekkSumYtelser = (ytelser: Ytelse[]): number => {
    return ytelser.reduce((acc: number, ytelse: Ytelse) => acc + ytelse.skattsum + ytelse.trekksum, 0);
};

export const filtrerBortUtbetalingerSomIkkeErUtbetalt = (utbetaling: Utbetaling): boolean => {
    return utbetaling.status.toLowerCase() === 'utbetalt';
};

export const reduceUtbetlingerTilYtelser = (utbetalinger: Utbetaling[]): Ytelse[] => {
    return utbetalinger.flatMap((utbetaling) => utbetaling.ytelser ?? []);
};

export const formaterNOK = (belop: number): string => {
    return belop.toLocaleString('no', { minimumFractionDigits: 2 });
};

export const summertBelopFraUtbetalinger = (
    utbetalinger: Utbetaling[],
    getSumFromYtelser: (ytelser: Ytelse[]) => number,
    fjernUtbetalingerSomIkkeErUtbetalt: boolean
): string => {
    const ytelser = utbetalinger
        .filter((utbetaling) => !fjernUtbetalingerSomIkkeErUtbetalt || utbetaling.status.toLowerCase() === 'utbetalt')
        .flatMap((utbetaling) => utbetaling.ytelser ?? []);
    const sum = getSumFromYtelser(ytelser);
    return formaterNOK(sum);
};

export const getTypeFromYtelse = (ytelse: Ytelse) => ytelse.type || 'Mangler beskrivelse';

export const getPeriodeFromYtelser = (ytelser: Ytelse[]): YtelsePeriode => {
    return ytelser.reduce(
        (acc: YtelsePeriode, ytelse: Ytelse) => {
            if (!ytelse.periode) {
                return acc;
            }
            return {
                start: dayjs(ytelse.periode.start).isBefore(dayjs(acc.start)) ? ytelse.periode.start : acc.start,
                slutt: dayjs(ytelse.periode.slutt).isAfter(dayjs(acc.slutt)) ? ytelse.periode.slutt : acc.slutt
            };
        },
        {
            start: dayjs().format(),
            slutt: dayjs(0).format()
        }
    );
};

export const arenaURL = () => {
    const utbetalingUrlPart = '?oppstart_skj=UB_22_MELDEHISTORIKK&fodselsnr=';
    const fnr = usePersonAtomValue();
    const domainUrlPart = `http://arena${finnMiljoStreng()}.adeo.no/`;
    const standardArenaUrlPart = `forms/arenaMod${finnMiljoStreng().replace('-', '_')}.html`;

    return domainUrlPart + standardArenaUrlPart + utbetalingUrlPart + fnr;
};

export const getUtbetalingId = (utbetaling: Utbetaling) =>
    `${utbetaling.ytelser?.map((item) => item.type?.replace(/\s+/g, ''))?.join('')}${utbetaling.posteringsdato}`;

const utbetaltTilBruker = 'Bruker';
const utbetaltTilOrganisasjon = 'Organisasjon';
const utbetaltTilSamhandler = 'Samhandler';

export const utbetalingMottakere = [utbetaltTilBruker, utbetaltTilOrganisasjon, utbetaltTilSamhandler];
