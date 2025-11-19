import type { UseBaseQueryResult, UseSuspenseQueryResult } from '@tanstack/react-query';
import dayjs from 'dayjs';
import {useAtomValue} from 'jotai/index';
import {useMemo} from 'react';
import {type YtelseFilter, ytelseFilterAtom} from 'src/components/ytelser/List/Filter';
import {
    useArbeidsavklaringspenger,
    useForeldrepenger,
    useForeldrepengerFpSak,
    usePensjon,
    usePleiepenger,
    useSykepenger,
    useTiltakspenger
} from 'src/lib/clients/modiapersonoversikt-api';
import type {
    CommonPeriode,
    Foreldrepenger,
    ForeldrepengerFpSak,
    PensjonSak,
    Pleiepenger,
    PleiepengerArbeidsforhold,
    PleiepengerPeriode,
    PleiepengerVedtak,
    Sykepenger,
    VedtakDto
} from 'src/lib/types/modiapersonoversikt-api';
import {
    type Arbeidsavklaringspenger,
    getUnikArbeidsavklaringspengerKey
} from 'src/models/ytelse/arbeidsavklaringspenger';
import {YtelseVedtakYtelseType} from 'src/models/ytelse/ytelse-utils';
import {ascendingDateComparator, backendDatoformat, datoStigende, datoSynkende} from 'src/utils/date-utils';
import {formaterDato} from 'src/utils/string-utils';

import {getForeldrepengerFpSakIdDato, getUnikForeldrepengerFpSakKey} from 'src/models/ytelse/foreldrepenger-fpsak';
import type {Pensjon} from 'src/models/ytelse/pensjon';
import type {Tiltakspenger} from 'src/models/ytelse/tiltakspenger';

export type Ytelse =
    | Foreldrepenger
    | Pleiepenger
    | Sykepenger
    | Tiltakspenger
    | Pensjon
    | Arbeidsavklaringspenger
    | ForeldrepengerFpSak;

type Placeholder = { returnOnForbidden: string; returnOnError: string; returnOnNotFound: string };

interface Returns {
    ytelser: YtelseVedtak[];
    pending: boolean;
    placeholders: (string | undefined)[];
    harFeil: boolean;
}

export type YtelseVedtak = {
    ytelseData: {
        data: Ytelse;
    };
    ytelseType: YtelseVedtakYtelseType;
};

const filterForeldrepenger = (ytelse: YtelseVedtak, ytelsetyper: string[]): boolean => {
    return ytelsetyper.includes(YtelseVedtakYtelseType.Foreldrepenger) && ytelse.ytelseType === YtelseVedtakYtelseType.ForeldrepengerFpSak;

}

const filterYtelser = (ytelser: YtelseVedtak[], filters: YtelseFilter): YtelseVedtak[] => {
    const { ytelseTyper, dateRange } = filters;

    if (!ytelser || ytelser.length === 0) {
        return [];
    }

    let filteredList = ytelser;
    if (ytelseTyper?.length) {
        filteredList = filteredList.filter((ytelse) =>
         ytelseTyper.includes(ytelse.ytelseType) || filterForeldrepenger(ytelse, ytelseTyper))}


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
        case YtelseVedtakYtelseType.Foreldrepenger:
            return getForeldepengerDato(ytelse.ytelseData.data as Foreldrepenger);
        case YtelseVedtakYtelseType.Sykepenger:
            return getSykepengerDato(ytelse.ytelseData.data as Sykepenger);
        case YtelseVedtakYtelseType.Pleiepenger:
            return getPleiepengerDato(ytelse.ytelseData.data as Pleiepenger);
        case YtelseVedtakYtelseType.Tiltakspenge:
            return getTiltakspengerDato(ytelse.ytelseData.data as VedtakDto);
        case YtelseVedtakYtelseType.Pensjon:
            return getPensjonDato(ytelse.ytelseData.data as PensjonSak);
        case YtelseVedtakYtelseType.Arbeidsavklaringspenger:
            return getArbeidsavklaringspengerDato(ytelse.ytelseData.data as Arbeidsavklaringspenger);
        case YtelseVedtakYtelseType.ForeldrepengerFpSak:
            return getForeldrepengerFpSakIdDato(ytelse.ytelseData.data as ForeldrepengerFpSak);
        default:
            return '';
    }
}

export function getUnikYtelseKey(ytelse: YtelseVedtak) {
    switch (ytelse.ytelseType) {
        case YtelseVedtakYtelseType.Foreldrepenger:
            return getUnikForeldrepengerKey(ytelse.ytelseData.data as Foreldrepenger);
        case YtelseVedtakYtelseType.Sykepenger:
            return getUnikSykepengerKey(ytelse.ytelseData.data as Sykepenger);
        case YtelseVedtakYtelseType.Pleiepenger:
            return getUnikPleiepengerKey(ytelse.ytelseData.data as Pleiepenger);
        case YtelseVedtakYtelseType.Tiltakspenge:
            return getUnikTiltakspengerKey(ytelse.ytelseData.data as VedtakDto);
        case YtelseVedtakYtelseType.Pensjon:
            return getPensjonpengerKey(ytelse.ytelseData.data as PensjonSak);
        case YtelseVedtakYtelseType.Arbeidsavklaringspenger:
            return getUnikArbeidsavklaringspengerKey(ytelse.ytelseData.data as Arbeidsavklaringspenger);
        case YtelseVedtakYtelseType.ForeldrepengerFpSak:
            return getUnikForeldrepengerFpSakKey(ytelse.ytelseData.data as ForeldrepengerFpSak);
        default:
            return 'ukjent ytelse';
    }
}

function getUnikPleiepengerKey(pleiePenger: Pleiepenger): string {
    return `pleiepenger${getPleiepengerDato(pleiePenger)}`;
}

function getUnikForeldrepengerKey(foreldrepenger: Foreldrepenger): string {
    return `foreldrepenger${getForeldepengerDato(foreldrepenger)}`;
}

function getUnikSykepengerKey(sykepenger: Sykepenger): string {
    return `sykepenger${getSykepengerDato(sykepenger)}`;
}

function getUnikTiltakspengerKey(ytelse: VedtakDto) {
    return `tiltakspenger${ytelse.vedtakId}`;
}

function getPensjonpengerKey(ytelse: PensjonSak) {
    return `pensjon${ytelse.sakType}${ytelse.sakid}`;
}

function getForeldepengerDato(foreldrepenger: Foreldrepenger) {
    return foreldrepenger.rettighetFom ?? dayjs().format(backendDatoformat);
}

function getSykepengerDato(sykepenger: Sykepenger) {
    return sykepenger.sykmeldtFom ?? dayjs().format(backendDatoformat);
}

function getTiltakspengerDato(ytelse: VedtakDto) {
    return ytelse.periode.fraOgMed ?? dayjs().format(backendDatoformat);
}

function getPleiepengerDato(pleiePenger: Pleiepenger) {
    const sistePeriodeForPleiepengerettighet = getSistePeriodeForPleiepenger(pleiePenger);
    return sistePeriodeForPleiepengerettighet?.fom ?? dayjs().format(backendDatoformat);
}

function getPensjonDato(pensjonSak: PensjonSak) {
    return pensjonSak.fomDato ?? dayjs().format(backendDatoformat);
}

function getArbeidsavklaringspengerDato(arbeidsavklaringspenger: Arbeidsavklaringspenger) {
    return arbeidsavklaringspenger.periode.fraOgMedDato ?? dayjs().format(backendDatoformat);
}

function getSistePeriodeForPleiepenger(pleiePenger: Pleiepenger) {
    const perioder = pleiePenger.perioder ?? [];
    return perioder?.sort(datoStigende((p) => new Date(p.fom ?? 0))).reverse()[0];
}

export function fjernEntriesUtenVerdi(obj: {
    [name: string]: string | number | null | undefined;
}) {
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

export function getSisteVedtakForPleiepenger(pleiePenger: Pleiepenger): PleiepengerVedtak | undefined {
    const sistePeriode = getSistePeriodeForPleiepenger(pleiePenger);
    if (!sistePeriode) {
        return undefined;
    }
    const vedtakter = sistePeriode.vedtak ?? [];
    return vedtakter.sort(datoStigende((vedtak) => new Date(vedtak.periode?.fom ?? 0))).reverse()[0];
}

export function sorterPleiepengerPerioder(pleiePenger: Pleiepenger): PleiepengerPeriode[] {
    const perioder = pleiePenger.perioder ?? [];
    return perioder.sort(datoStigende((p) => new Date(p.fom ?? 0))).reverse();
}

export function getPleiepengerArbiedsforholdSortert(pleiePenger: Pleiepenger): PleiepengerArbeidsforhold[] {
    const perioder = pleiePenger.perioder ?? [];
    const arbeidsforhold = perioder.flatMap((periode) => periode.arbeidsforhold ?? []) ?? [];
    return sorterArbeidsforholdEtterRefusjonTom(arbeidsforhold);
}

function sorterArbeidsforholdEtterRefusjonTom(
    arbeidsforhold: PleiepengerArbeidsforhold[]
): PleiepengerArbeidsforhold[] {
    return arbeidsforhold.sort(datoStigende((a) => a.refusjonTom || new Date(0))).reverse();
}

export function utledFraDatoForForeldrePenger(foreldrepenger: Foreldrepenger): Date {
    const periode = foreldrepenger.periode ?? [];
    return periode.map((periode) => new Date(periode.foreldrepengerFom ?? 0)).sort(ascendingDateComparator)[0];
}

export function periodeEllerNull(periode?: CommonPeriode | null): string | null {
    if (!periode || !periode.fra) {
        return null;
    }
    return `${formaterDato(periode.fra)} - ${periode.til ? formaterDato(periode.til) : ''}`;
}

const foreldrepengerPlaceholder = {
    returnOnError: 'Kunne ikke laste foreldrepenger',
    returnOnNotFound: 'Kunne finne foreldrepenger',
    returnOnForbidden: 'Du har ikke tilgang til foreldrepenger'
};
const pleiepengerPlaceholder = {
    returnOnError: 'Kunne ikke laste pleiepenger',
    returnOnNotFound: 'Kunne finne pleiepenger',
    returnOnForbidden: 'Du har ikke tilgang til pleiepenger'
};
const sykepengerPlaceholder = {
    returnOnError: 'Kunne ikke laste sykepenger',
    returnOnNotFound: 'Kunne finne sykepenger',
    returnOnForbidden: 'Du har ikke tilgang til sykepenger'
};
const tiltakspengerPlaceholder = {
    returnOnError: 'Kunne ikke laste tiltakspenger',
    returnOnNotFound: 'Kunne finne tiltakspenger',
    returnOnForbidden: 'Du har ikke tilgang til tiltakspenger'
};
const pensjonPlaceholder = {
    returnOnError: 'Kunne ikke laste pensjon',
    returnOnNotFound: 'Kunne finne pensjon',
    returnOnForbidden: 'Du har ikke tilgang til pensjon'
};
const arbeidsavklaringsPengerPlaceholder = {
    returnOnError: 'Kunne ikke laste arbeidsavklaringspenger',
    returnOnNotFound: 'Kunne finne arbeidsavklaringspenger',
    returnOnForbidden: 'Du har ikke tilgang til arbeidsavklaringspenger'
};

const foreldrepengerFpSakPlaceholder = {
    returnOnError: 'Kunne ikke laste foreldrepenger',
    returnOnNotFound: 'Kunne finne foreldrepenger',
    returnOnForbidden: 'Du har ikke tilgang til foreldrepenger'
};

const placeholder = (resource: UseSuspenseQueryResult | UseBaseQueryResult, tekster: Placeholder) => {
    if (!resource?.isError) {
        return;
    }

    return tekster.returnOnError;
};

export const useFilterYtelser = (): Returns => {
    const filters = useAtomValue(ytelseFilterAtom);
    const periode = filters.dateRange;
    const startDato = periode.from.format('YYYY-MM-DD');
    const sluttDato = periode.to.format('YYYY-MM-DD');
    const foreldrepengerResponse = useForeldrepenger(startDato, sluttDato);
    const pleiepengerResponse = usePleiepenger(startDato, sluttDato);
    const sykepengerResponse = useSykepenger(startDato, sluttDato);
    const tiltakspengerResponse = useTiltakspenger(startDato, sluttDato);
    const pensjonResponse = usePensjon(startDato, sluttDato);
    const arbeidsavklaringspengerResponse = useArbeidsavklaringspenger(startDato, sluttDato);
    const foreldrepengerFpSakResponse = useForeldrepengerFpSak(startDato, sluttDato);

    return useMemo(() => {
        const pending =
            pleiepengerResponse.isLoading ||
            foreldrepengerResponse.isLoading ||
            sykepengerResponse.isLoading ||
            tiltakspengerResponse.isLoading ||
            pensjonResponse.isLoading ||
            arbeidsavklaringspengerResponse.isLoading ||
            foreldrepengerResponse.isLoading;

        const ytelser: YtelseVedtak[] = [];
        foreldrepengerResponse.data?.foreldrepenger?.map((ytelse) =>
            ytelser.push({
                ytelseData: { data: ytelse },
                ytelseType: YtelseVedtakYtelseType.Foreldrepenger
            })
        );
        pleiepengerResponse.data?.pleiepenger?.map((ytelse) =>
            ytelser.push({
                ytelseData: { data: ytelse },
                ytelseType: YtelseVedtakYtelseType.Pleiepenger
            })
        );
        sykepengerResponse.data?.sykepenger?.map((ytelse) =>
            ytelser.push({
                ytelseData: { data: ytelse },
                ytelseType: YtelseVedtakYtelseType.Sykepenger
            })
        );
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

        const ytelserSortert = ytelser.sort(datoSynkende((ytelse: YtelseVedtak) => getYtelseIdDato(ytelse)));

        const placeholders = [
            placeholder(foreldrepengerResponse, foreldrepengerPlaceholder),
            placeholder(pleiepengerResponse, pleiepengerPlaceholder),
            placeholder(sykepengerResponse, sykepengerPlaceholder),
            placeholder(tiltakspengerResponse, tiltakspengerPlaceholder),
            placeholder(pensjonResponse, pensjonPlaceholder),
            placeholder(arbeidsavklaringspengerResponse, arbeidsavklaringsPengerPlaceholder),
            placeholder(foreldrepengerFpSakResponse, foreldrepengerFpSakPlaceholder)
        ];

        const harFeil =
            foreldrepengerResponse.isError ||
            pleiepengerResponse.isError ||
            sykepengerResponse.isError ||
            tiltakspengerResponse.isError ||
            pensjonResponse.isError ||
            arbeidsavklaringspengerResponse.isError ||
            foreldrepengerFpSakResponse.isError;

        return {
            ytelser: filterYtelser(ytelserSortert, filters),
            pending: pending,
            placeholders: placeholders.filter(Boolean),
            harFeil: harFeil
        };
    }, [
        foreldrepengerResponse,
        pleiepengerResponse,
        sykepengerResponse,
        tiltakspengerResponse,
        pensjonResponse,
        arbeidsavklaringspengerResponse,
        foreldrepengerFpSakResponse
    ]);
};
