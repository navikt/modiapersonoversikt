import dayjs from 'dayjs';
import { useAtomValue } from 'jotai/index';
import { useMemo } from 'react';
import { type YtelseFilter, ytelseFilterAtom } from 'src/components/ytelser/List/Filter';
import { useYtelser } from 'src/lib/clients/modiapersonoversikt-api';
import type {
    CommonPeriode,
    Foreldrepenger,
    PensjonSak,
    Pleiepenger,
    PleiepengerArbeidsforhold,
    PleiepengerPeriode,
    PleiepengerVedtak,
    Sykepenger,
    VedtakDto,
    YtelseVedtak
} from 'src/lib/types/modiapersonoversikt-api';
import { YtelseVedtakYtelseType } from 'src/lib/types/modiapersonoversikt-api';
import { ascendingDateComparator, backendDatoformat, datoStigende, datoSynkende } from 'src/utils/date-utils';
import { formaterDato } from 'src/utils/string-utils';

const filterYtelser = (ytelser: YtelseVedtak[], filters: YtelseFilter): YtelseVedtak[] => {
    const { ytelseTyper } = filters;

    if (!ytelser || ytelser.length === 0) {
        return [];
    }

    let filteredList = ytelser;
    if (ytelseTyper?.length) {
        filteredList = filteredList.filter((ytelse) => ytelseTyper.includes(ytelse.ytelseType));
    }

    return filteredList;
};

export const useFilterYtelser = () => {
    const filters = useAtomValue(ytelseFilterAtom);
    const startDato = filters.dateRange.from.format('YYYY-MM-DD');
    const sluttDato = filters.dateRange.to.format('YYYY-MM-DD');

    const ytelseResponse = useYtelser(startDato, sluttDato);
    const ytelser: YtelseVedtak[] = ytelseResponse.data?.ytelser ?? [];
    const ytelserSortert = ytelser.sort(datoSynkende((ytelse: YtelseVedtak) => getYtelseIdDato(ytelse)));

    return useMemo(() => filterYtelser(ytelserSortert, filters), [ytelser, filters]);
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

export function sorterArbeidsforholdEtterRefusjonTom(
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
