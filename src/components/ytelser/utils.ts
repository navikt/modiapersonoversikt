import type { UseQueryResult } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai/index';
import type { FetchError } from 'src/api/api';
import { type YtelseFilter, ytelseFilterAtom } from 'src/components/ytelser/List/Filter';
import {
    useArbeidsavklaringspenger,
    useDagpenger,
    useForeldrepengerFpSak,
    usePensjon,
    useSykepenger,
    useSykepengerSpokelse,
    useTiltakspenger
} from 'src/lib/clients/modiapersonoversikt-api';
import type {
    CommonPeriode,
    ForeldrepengerFpSak,
    PensjonSak,
    PseudoDagpengerVedtak,
    Sykepenger,
    Utbetalingsperioder,
    VedtakDto
} from 'src/lib/types/modiapersonoversikt-api';
import {
    type Arbeidsavklaringspenger,
    getUnikArbeidsavklaringspengerKey
} from 'src/models/ytelse/arbeidsavklaringspenger';
import { getDagpengerIdDato, getUnikDagpengerKey } from 'src/models/ytelse/dagpenger';
import { getForeldrepengerFpSakIdDato, getUnikForeldrepengerFpSakKey } from 'src/models/ytelse/foreldrepenger-fpsak';
import type { Pensjon } from 'src/models/ytelse/pensjon';
import type { Tiltakspenger } from 'src/models/ytelse/tiltakspenger';
import { YtelseVedtakYtelseType } from 'src/models/ytelse/ytelse-utils';
import { backendDatoformat, datoSynkende } from 'src/utils/date-utils';
import { formaterDato } from 'src/utils/string-utils';

type Ytelse =
    | Sykepenger
    | Tiltakspenger
    | Pensjon
    | Arbeidsavklaringspenger
    | ForeldrepengerFpSak
    | PseudoDagpengerVedtak
    | Utbetalingsperioder;

type Placeholder = { returnOnForbidden: string; returnOnError: string; returnOnNotFound: string };

export type YtelseVedtak = {
    ytelseData: {
        data: Ytelse;
    };
    ytelseType: YtelseVedtakYtelseType;
};

const filterForeldrepenger = (ytelse: YtelseVedtak, ytelsetyper: string[]): boolean => {
    return (
        ytelsetyper.includes(YtelseVedtakYtelseType.Foreldrepenger) &&
        ytelse.ytelseType === YtelseVedtakYtelseType.ForeldrepengerFpSak
    );
};

const filterDobleYtelseTyper = (ytelse: YtelseVedtak, ytelsetyper: string[]): boolean => {
    return filterForeldrepenger(ytelse, ytelsetyper);
};

const filterYtelser = (ytelser: YtelseVedtak[], filters: YtelseFilter): YtelseVedtak[] => {
    const { ytelseTyper, dateRange } = filters;

    if (!ytelser || ytelser.length === 0) {
        return [];
    }

    let filteredList = ytelser;
    if (ytelseTyper?.length) {
        filteredList = filteredList.filter(
            (ytelse) => ytelseTyper.includes(ytelse.ytelseType) || filterDobleYtelseTyper(ytelse, ytelseTyper)
        );
    }

    if (dateRange?.from && dateRange?.to) {
        filteredList = filteredList.filter((ytelse) => {
            const ytelseDato = getYtelseIdDato(ytelse);
            const dato = dayjs(ytelseDato);
            return dato.isSameOrAfter(dateRange.from) && dato.isSameOrBefore(dateRange.to);
        });
    }

    return filteredList;
};

export function getYtelseIdDato(ytelse: YtelseVedtak): string {
    switch (ytelse.ytelseType) {
        case YtelseVedtakYtelseType.Sykepenger:
            return getSykepengerDato(ytelse.ytelseData.data as Sykepenger);
        case YtelseVedtakYtelseType.SykepengerSpokelse:
            return getSykepengerSpokelseIdDato(ytelse.ytelseData.data as Utbetalingsperioder);
        case YtelseVedtakYtelseType.Tiltakspenge:
            return getTiltakspengerDato(ytelse.ytelseData.data as VedtakDto);
        case YtelseVedtakYtelseType.Pensjon:
            return getPensjonDato(ytelse.ytelseData.data as PensjonSak);
        case YtelseVedtakYtelseType.Arbeidsavklaringspenger:
            return getArbeidsavklaringspengerDato(ytelse.ytelseData.data as Arbeidsavklaringspenger);
        case YtelseVedtakYtelseType.ForeldrepengerFpSak:
            return getForeldrepengerFpSakIdDato(ytelse.ytelseData.data as ForeldrepengerFpSak);
        case YtelseVedtakYtelseType.Dagpenger:
            return getDagpengerIdDato(ytelse.ytelseData.data as PseudoDagpengerVedtak);
        default:
            return '';
    }
}

export function getUnikYtelseKey(ytelse: YtelseVedtak) {
    switch (ytelse.ytelseType) {
        case YtelseVedtakYtelseType.Sykepenger:
            return getUnikSykepengerKey(ytelse.ytelseData.data as Sykepenger);
        case YtelseVedtakYtelseType.SykepengerSpokelse:
            return getUnikSykepengerSpokelseKey(ytelse.ytelseData.data as Utbetalingsperioder);
        case YtelseVedtakYtelseType.Tiltakspenge:
            return getUnikTiltakspengerKey(ytelse.ytelseData.data as VedtakDto);
        case YtelseVedtakYtelseType.Pensjon:
            return getPensjonpengerKey(ytelse.ytelseData.data as PensjonSak);
        case YtelseVedtakYtelseType.Arbeidsavklaringspenger:
            return getUnikArbeidsavklaringspengerKey(ytelse.ytelseData.data as Arbeidsavklaringspenger);
        case YtelseVedtakYtelseType.ForeldrepengerFpSak:
            return getUnikForeldrepengerFpSakKey(ytelse.ytelseData.data as ForeldrepengerFpSak);
        case YtelseVedtakYtelseType.Dagpenger:
            return getUnikDagpengerKey(ytelse.ytelseData.data as PseudoDagpengerVedtak);
        default:
            return 'ukjent ytelse';
    }
}

function getUnikSykepengerKey(sykepenger: Sykepenger): string {
    return `sykepenger${getSykepengerDato(sykepenger)}`;
}

function getUnikSykepengerSpokelseKey(ytelse: Utbetalingsperioder) {
    return `spokelse-${ytelse.utbetaltePerioder.firstOrNull()?.fom}`;
}

function getUnikTiltakspengerKey(ytelse: VedtakDto) {
    return `tiltakspenger${ytelse.vedtakId}`;
}

function getPensjonpengerKey(ytelse: PensjonSak) {
    return `pensjon${ytelse.sakType}${ytelse.sakid}`;
}

function getSykepengerDato(sykepenger: Sykepenger) {
    return sykepenger.sykmeldtFom ?? dayjs().format(backendDatoformat);
}

function getSykepengerSpokelseIdDato(ytelse: Utbetalingsperioder) {
    return ytelse.utbetaltePerioder.firstOrNull()?.fom ?? dayjs().format(backendDatoformat);
}

function getTiltakspengerDato(ytelse: VedtakDto) {
    return ytelse.periode.fraOgMed ?? dayjs().format(backendDatoformat);
}

function getPensjonDato(pensjonSak: PensjonSak) {
    return pensjonSak.fomDato ?? dayjs().format(backendDatoformat);
}

function getArbeidsavklaringspengerDato(arbeidsavklaringspenger: Arbeidsavklaringspenger) {
    return arbeidsavklaringspenger.periode.fraOgMedDato ?? dayjs().format(backendDatoformat);
}

export function fjernEntriesUtenVerdi(obj: { [name: string]: string | number | null | undefined }) {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, v]) => v !== null && v !== undefined && !Number.isNaN(v))
    );
}

export function formaterPeriode(periode?: CommonPeriode | null): string | null {
    if (!periode || !periode.fra) {
        return null;
    }
    return `${formaterDato(periode.fra)} - ${periode.til ? formaterDato(periode.til) : ''}`;
}

export function formaterProsent(value?: number | null): string | null {
    if (!value) {
        return null;
    }
    return `${value}%`;
}

export function formaterBoolean(verdi?: boolean | null): string | null {
    switch (verdi) {
        case true:
            return 'Ja';
        case false:
            return 'Nei';
        default:
            return null;
    }
}

export function periodeEllerNull(periode?: CommonPeriode | null): string | null {
    if (!periode || !periode.fra) {
        return null;
    }
    return `${formaterDato(periode.fra)} – ${periode.til ? formaterDato(periode.til) : ''}`;
}

export const responseErrorMessage = (type: string) => ({
    returnOnError: `Kunne ikke laste ${type}`,
    returnOnNotFound: `Kunne ikke finne ${type}`,
    returnOnForbidden: `Du har ikke tilgang til ${type}`
});

export const errorPlaceholder = <T = unknown>(resource: UseQueryResult<T, FetchError>, tekster: Placeholder) => {
    if (!resource?.isError) {
        return;
    }

    if (resource?.error?.response?.status === 404) {
        return tekster.returnOnNotFound;
    }
    if (resource?.error?.response?.status === 403) {
        return tekster.returnOnForbidden;
    }

    return tekster.returnOnError;
};

export type QueryResult<T> = UseQueryResult<T, FetchError> & {
    data: T;
    errorMessages: string[];
};

export const useFilterYtelser = (): QueryResult<YtelseVedtak[]> => {
    const filters = useAtomValue(ytelseFilterAtom);
    const periode = filters.dateRange;
    const startDato = periode.from.format('YYYY-MM-DD');
    const sluttDato = periode.to.format('YYYY-MM-DD');

    const sykepengerResponse = useSykepenger(startDato, sluttDato);
    const tiltakspengerResponse = useTiltakspenger(startDato, sluttDato);
    const pensjonResponse = usePensjon(startDato, sluttDato);
    const arbeidsavklaringspengerResponse = useArbeidsavklaringspenger(startDato, sluttDato);
    const foreldrepengerFpSakResponse = useForeldrepengerFpSak(startDato, sluttDato);
    const dagpengerResponse = useDagpenger(startDato, sluttDato);
    const sykepengerSpokelseResponse = useSykepengerSpokelse(startDato, sluttDato);

    const ytelser: YtelseVedtak[] = [];

    sykepengerResponse.data?.sykepenger?.map((ytelse) =>
        ytelser.push({
            ytelseData: { data: ytelse },
            ytelseType: YtelseVedtakYtelseType.Sykepenger
        })
    );
    if (sykepengerSpokelseResponse.data && sykepengerSpokelseResponse.data.utbetaltePerioder.length > 0) {
        ytelser.push({
            ytelseData: { data: sykepengerSpokelseResponse.data },
            ytelseType: YtelseVedtakYtelseType.SykepengerSpokelse
        });
    }
    tiltakspengerResponse?.data?.map((ytelse) =>
        ytelser.push({
            ytelseData: { data: ytelse },
            ytelseType: YtelseVedtakYtelseType.Tiltakspenge
        })
    );
    pensjonResponse.data?.map((ytelse) =>
        ytelser.push({
            ytelseData: { data: ytelse },
            ytelseType: YtelseVedtakYtelseType.Pensjon
        })
    );
    arbeidsavklaringspengerResponse.data?.map((ytelse) =>
        ytelser.push({
            ytelseData: { data: ytelse },
            ytelseType: YtelseVedtakYtelseType.Arbeidsavklaringspenger
        })
    );

    foreldrepengerFpSakResponse.data?.map((ytelse) =>
        ytelser.push({
            ytelseData: { data: ytelse },
            ytelseType: YtelseVedtakYtelseType.ForeldrepengerFpSak
        })
    );

    if (dagpengerResponse.data?.perioder.length) {
        ytelser.push({
            ytelseData: { data: dagpengerResponse.data },
            ytelseType: YtelseVedtakYtelseType.Dagpenger
        });
    }

    const ytelserSortert = ytelser.sort(datoSynkende((ytelse: YtelseVedtak) => getYtelseIdDato(ytelse)));

    const placeholders = [
        errorPlaceholder(sykepengerResponse, responseErrorMessage('sykepenger')),
        errorPlaceholder(sykepengerSpokelseResponse, responseErrorMessage('sykepenger')),
        errorPlaceholder(tiltakspengerResponse, responseErrorMessage('tiltakspenger')),
        errorPlaceholder(pensjonResponse, responseErrorMessage('pensjon')),
        errorPlaceholder(arbeidsavklaringspengerResponse, responseErrorMessage('arbeidsavklaringspenger')),
        errorPlaceholder(foreldrepengerFpSakResponse, responseErrorMessage('foreldrepenger')),
        errorPlaceholder(dagpengerResponse, responseErrorMessage('dagpenger'))
    ];

    const response =
        sykepengerResponse ||
        sykepengerSpokelseResponse ||
        tiltakspengerResponse ||
        pensjonResponse ||
        arbeidsavklaringspengerResponse ||
        foreldrepengerFpSakResponse ||
        dagpengerResponse;

    const isLoading =
        sykepengerResponse.isLoading ||
        sykepengerSpokelseResponse.isLoading ||
        tiltakspengerResponse.isLoading ||
        pensjonResponse.isLoading ||
        arbeidsavklaringspengerResponse.isLoading ||
        foreldrepengerFpSakResponse.isLoading ||
        dagpengerResponse.isLoading;

    return {
        ...response,
        isLoading,
        data: filterYtelser(ytelserSortert, filters) ?? [],
        errorMessages: placeholders.filter(Boolean)
    } as QueryResult<YtelseVedtak[]>;
};
