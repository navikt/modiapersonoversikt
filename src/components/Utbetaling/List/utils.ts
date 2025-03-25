import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { type UtbetalingFilter, utbetalingFilterAtom } from 'src/components/Utbetaling/List/Filter';
import { useUtbetalinger } from 'src/lib/clients/modiapersonoversikt-api';
import { usePersonAtomValue } from 'src/lib/state/context';
import type { Utbetaling, Ytelse } from 'src/lib/types/modiapersonoversikt-api';
import type { Periode } from 'src/models/tid';
import { datoSynkende, datoVerbose } from 'src/utils/date-utils';
import { loggError } from 'src/utils/logger/frontendLogger';
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
            return dato.isAfter(dateRange.from) && dato.isBefore(dateRange.to);
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

export const formaterNOK = (beløp: number): string => {
    return beløp.toLocaleString('no', { minimumFractionDigits: 2 });
};
export const getGjeldendeDatoForUtbetaling = (utbetaling: Utbetaling): string => {
    return utbetaling.utbetalingsdato || utbetaling.forfallsdato || utbetaling.posteringsdato;
};
export const maanedOgAarForUtbetaling = (utbetaling: Utbetaling) => {
    const verbose = datoVerbose(getGjeldendeDatoForUtbetaling(utbetaling));
    return `${verbose.måned} ${verbose.år}`;
};
export const utbetalingDatoComparator = (a: Utbetaling, b: Utbetaling) => {
    return dayjs(getGjeldendeDatoForUtbetaling(b)).unix() - dayjs(getGjeldendeDatoForUtbetaling(a)).unix();
};

export const summertBelopFraUtbetalinger = (
    utbetalinger: Utbetaling[],
    getSumFromYtelser: (ytelser: Ytelse[]) => number
): string => {
    try {
        const sum = utbetalinger
            .filter(filtrerBortUtbetalingerSomIkkeErUtbetalt)
            .reduce((acc: number, utbetaling: Utbetaling) => {
                if (!utbetaling.ytelser) {
                    loggError(
                        new Error('Kunne ikke beregne sum på utbetaling'),
                        '"ytelser" er ikke definert på utbetaling, sum må beregnes fra ytelser',
                        { utbetaling: utbetaling }
                    );
                    throw new Error();
                }

                return acc + getSumFromYtelser(utbetaling.ytelser);
            }, 0);

        return formaterNOK(sum);
    } catch {
        return 'Manglende data';
    }
};

export const getTypeFromYtelse = (ytelse: Ytelse) => ytelse.type || 'Mangler beskrivelse';

export const getPeriodeFromYtelser = (ytelser: Ytelse[]): Periode => {
    return ytelser.reduce(
        (acc: Periode, ytelse: Ytelse) => {
            if (!ytelse.periode) {
                return acc;
            }
            return {
                fra: dayjs(ytelse.periode.start).isBefore(dayjs(acc.fra)) ? ytelse.periode.start : acc.fra,
                til: dayjs(ytelse.periode.slutt).isAfter(dayjs(acc.til)) ? ytelse.periode.slutt : acc.til
            };
        },
        {
            fra: dayjs().format(),
            til: dayjs(0).format()
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
