import { ArrowCirclepathIcon, ChevronRightIcon, ClockIcon, PauseIcon, XMarkOctagonIcon } from '@navikt/aksel-icons';
import { BodyShort, HStack, Skeleton, Tag, VStack } from '@navikt/ds-react';
import { useNavigate } from '@tanstack/react-router';
import dayjs from 'dayjs';
import type { ReactNode } from 'react';
import { getUnikYtelseKey, useFilterYtelser, type YtelseVedtak } from 'src/components/ytelser/utils';
import { type Foreldrepenger, ForeldrepengerYtelse } from 'src/generated/modiapersonoversikt-api';
import type { Dagpenger, PensjonSak, Sykepenger, SykepengerSpokelse } from 'src/lib/types/modiapersonoversikt-api';
import type { Arbeidsavklaringspenger } from 'src/models/ytelse/arbeidsavklaringspenger';
import type { Tiltakspenger } from 'src/models/ytelse/tiltakspenger';
import { YtelseVedtakYtelseType } from 'src/models/ytelse/ytelse-utils';
import { formatterDato } from 'src/utils/date-utils';
import { NOKellerNull } from 'src/utils/string-utils';
import KlikkbartKort from '../KlikkbartKort';

type StatusKode = 'lopende' | 'tilBehandling' | 'stanset' | 'avsluttet';

type StatusInfo = {
    kode: StatusKode;
    label: string;
    dataColor: 'success' | 'warning' | 'neutral' | 'meta-purple';
    icon: ReactNode;
};

function hentYtelseStatus(ytelse: YtelseVedtak): StatusInfo {
    const lopende: StatusInfo = {
        kode: 'lopende',
        label: 'Løpende',
        dataColor: 'meta-purple',
        icon: <ArrowCirclepathIcon aria-hidden />
    };
    const tilBehandling: StatusInfo = {
        kode: 'tilBehandling',
        label: 'Til behandling',
        dataColor: 'warning',
        icon: <ClockIcon aria-hidden />
    };
    const stanset: StatusInfo = {
        kode: 'stanset',
        label: 'Stanset',
        dataColor: 'warning',
        icon: <PauseIcon aria-hidden />
    };
    const avsluttet: StatusInfo = {
        kode: 'avsluttet',
        label: 'Avsluttet',
        dataColor: 'neutral',
        icon: <XMarkOctagonIcon aria-hidden />
    };

    switch (ytelse.ytelseType) {
        case YtelseVedtakYtelseType.Sykepenger: {
            const sp = ytelse.ytelseData.data as Sykepenger;
            if (sp.utbetalingerPaaVent && sp.utbetalingerPaaVent.length > 0) return tilBehandling;
            if (sp.midlertidigStanset) return stanset;
            if (sp.slutt && dayjs(sp.slutt).isBefore(dayjs())) return avsluttet;
            return lopende;
        }
        case YtelseVedtakYtelseType.SykepengerSpokelse: {
            const sp = ytelse.ytelseData.data as SykepengerSpokelse;
            if (!sp.utbetaltePerioder.length) return avsluttet;
            const sisteTom = [...sp.utbetaltePerioder].sort((a, b) => dayjs(b.tom).diff(dayjs(a.tom))).at(0)?.tom;
            if (sisteTom && dayjs(sisteTom).isBefore(dayjs())) return avsluttet;
            return lopende;
        }
        case YtelseVedtakYtelseType.Arbeidsavklaringspenger: {
            const aap = ytelse.ytelseData.data as Arbeidsavklaringspenger;
            const s = aap.status?.toUpperCase() ?? '';
            if (s.includes('AVSL') || s.includes('OPPH')) return avsluttet;
            if (s.includes('BEH') || s.includes('VURDERES')) return tilBehandling;
            return lopende;
        }
        case YtelseVedtakYtelseType.Pensjon: {
            const p = ytelse.ytelseData.data as PensjonSak;
            const s = p.sakStatus?.toUpperCase() ?? '';
            if (s.includes('AVSL')) return avsluttet;
            if (s.includes('BEH') || s.includes('OPPRET')) return tilBehandling;
            return lopende;
        }
        case YtelseVedtakYtelseType.Foreldrepenger: {
            const fp = ytelse.ytelseData.data as Foreldrepenger;
            if (fp.tom && dayjs(fp.tom).isBefore(dayjs())) return avsluttet;
            return lopende;
        }
        case YtelseVedtakYtelseType.Tiltakspenger: {
            const tp = ytelse.ytelseData.data as Tiltakspenger;
            const sistePeriode = [...tp.innvilgelsesperioder]
                .sort((a, b) => dayjs(b.tilOgMed).diff(dayjs(a.tilOgMed)))
                .at(0);
            if (!sistePeriode || dayjs(sistePeriode.tilOgMed).isBefore(dayjs())) return avsluttet;
            return lopende;
        }
        case YtelseVedtakYtelseType.Dagpenger: {
            const dp = ytelse.ytelseData.data as Dagpenger;
            const sistePeriode = [...(dp.perioder ?? [])]
                .sort((a, b) => dayjs(b.tilOgMed).diff(dayjs(a.tilOgMed)))
                .at(0);
            if (!sistePeriode || dayjs(sistePeriode.tilOgMed).isBefore(dayjs())) return avsluttet;
            return lopende;
        }
        default:
            return lopende;
    }
}

function hentYtelsePeriode(ytelse: YtelseVedtak): string | null {
    switch (ytelse.ytelseType) {
        case YtelseVedtakYtelseType.Sykepenger: {
            const sp = ytelse.ytelseData.data as Sykepenger;
            if (!sp.sykmeldtFom) return null;
            return sp.slutt
                ? `${formatterDato(sp.sykmeldtFom)} – ${formatterDato(sp.slutt)}`
                : formatterDato(sp.sykmeldtFom);
        }
        case YtelseVedtakYtelseType.SykepengerSpokelse: {
            const sp = ytelse.ytelseData.data as SykepengerSpokelse;
            if (!sp.utbetaltePerioder.length) return null;
            const sortert = [...sp.utbetaltePerioder].sort((a, b) => dayjs(a.fom).diff(dayjs(b.fom)));
            const forste = sortert.at(0);
            const siste = sortert.at(-1);
            if (!forste || !siste) return null;
            return `${formatterDato(forste.fom)} – ${formatterDato(siste.tom)}`;
        }
        case YtelseVedtakYtelseType.Foreldrepenger: {
            const fp = ytelse.ytelseData.data as Foreldrepenger;
            if (!fp.fom) return null;
            return fp.tom ? `${formatterDato(fp.fom)} – ${formatterDato(fp.tom)}` : formatterDato(fp.fom);
        }
        case YtelseVedtakYtelseType.Arbeidsavklaringspenger: {
            const aap = ytelse.ytelseData.data as Arbeidsavklaringspenger;
            const fom = aap.periode?.fraOgMedDato;
            const tom = aap.periode?.tilOgMedDato;
            if (!fom) return null;
            return tom ? `${formatterDato(fom)} – ${formatterDato(tom)}` : formatterDato(fom);
        }
        case YtelseVedtakYtelseType.Pensjon: {
            const p = ytelse.ytelseData.data as PensjonSak;
            if (!p.fomDato) return null;
            return p.tomDato ? `${formatterDato(p.fomDato)} – ${formatterDato(p.tomDato)}` : formatterDato(p.fomDato);
        }
        case YtelseVedtakYtelseType.Tiltakspenger: {
            const tp = ytelse.ytelseData.data as Tiltakspenger;
            return `${formatterDato(tp.periode.fraOgMed)} – ${formatterDato(tp.periode.tilOgMed)}`;
        }
        case YtelseVedtakYtelseType.Dagpenger: {
            const dp = ytelse.ytelseData.data as Dagpenger;
            if (!dp.eldsteFraOgMedDato) return null;
            const sistePeriode = dp.perioder.at(-1);
            return sistePeriode
                ? `${formatterDato(dp.eldsteFraOgMedDato)} – ${formatterDato(sistePeriode.tilOgMed)}`
                : formatterDato(dp.eldsteFraOgMedDato);
        }
        default:
            return null;
    }
}

function hentYtelseEkstraInfo(ytelse: YtelseVedtak): string[] {
    if (ytelse.ytelseType === YtelseVedtakYtelseType.Sykepenger) {
        const sp = ytelse.ytelseData.data as Sykepenger;
        if (!sp.historiskeUtbetalinger?.length) return [];
        const siste = [...sp.historiskeUtbetalinger]
            .filter((u) => u.utbetalingsdato != null)
            .sort((a, b) => dayjs(b.utbetalingsdato).diff(dayjs(a.utbetalingsdato)))
            .at(0);
        if (!siste?.utbetalingsdato) return [];
        const belopTekst = siste.nettobelop != null ? ` – ${NOKellerNull(siste.nettobelop)}` : '';
        return [`Siste utbetaling: ${formatterDato(siste.utbetalingsdato)}${belopTekst}`];
    }
    if (ytelse.ytelseType === YtelseVedtakYtelseType.Arbeidsavklaringspenger) {
        const aap = ytelse.ytelseData.data as Arbeidsavklaringspenger;
        if (aap.dagsats == null) return [];
        return [`Dagsats: ${NOKellerNull(aap.dagsats)}`];
    }
    if (ytelse.ytelseType === YtelseVedtakYtelseType.Pensjon) {
        const p = ytelse.ytelseData.data as PensjonSak;
        if (!p.sakType) return [];
        return [`Pensjonstype: ${p.sakType}`];
    }
    if (ytelse.ytelseType === YtelseVedtakYtelseType.Tiltakspenger) {
        const tp = ytelse.ytelseData.data as Tiltakspenger;
        if (tp.sats == null) return [];
        return [`Dagsats: ${NOKellerNull(tp.sats)}`];
    }
    if (ytelse.ytelseType === YtelseVedtakYtelseType.Dagpenger) {
        const dp = ytelse.ytelseData.data as Dagpenger;
        const sistePeriode = [...(dp.perioder ?? [])].sort((a, b) => dayjs(b.tilOgMed).diff(dayjs(a.tilOgMed))).at(0);
        const linjer: string[] = [];
        if (sistePeriode?.sats != null) linjer.push(`Dagsats: ${NOKellerNull(sistePeriode.sats)}`);
        if (sistePeriode?.gjenståendeDager != null) linjer.push(`Gjenstående dager: ${sistePeriode.gjenståendeDager}`);
        return linjer;
    }
    return [];
}

function getYtelseTittel(ytelse: YtelseVedtak): string {
    switch (ytelse.ytelseType) {
        case YtelseVedtakYtelseType.Foreldrepenger: {
            const data = ytelse.ytelseData.data as Foreldrepenger;
            if (data.ytelse === ForeldrepengerYtelse.ENGANGSST_NAD) return 'Engangsstønad';
            if (data.ytelse === ForeldrepengerYtelse.SVANGERSKAPSPENGER) return 'Svangerskapspenger';
            return 'Foreldrepenger';
        }
        default:
            return ytelse.ytelseType;
    }
}

function YtelseKort({ ytelse }: { ytelse: YtelseVedtak }) {
    const navigate = useNavigate();
    const status = hentYtelseStatus(ytelse);
    const periode = hentYtelsePeriode(ytelse);
    const ekstraInfo = hentYtelseEkstraInfo(ytelse);
    const tittel = getYtelseTittel(ytelse);

    const aapneYtelse = () => navigate({ to: '/new/person/ytelser', search: { id: getUnikYtelseKey(ytelse) } });

    return (
        <KlikkbartKort
            padding="space-12"
            style={{ backgroundColor: 'var(--ax-bg-info-soft)' }}
            ariaLabel={`${tittel} – gå til ytelse`}
            onAktiver={aapneYtelse}
        >
            <HStack justify="space-between" align="center" wrap={false} gap="space-8">
                <VStack gap="space-24">
                    <VStack gap="space-4">
                        <BodyShort size="small" weight="semibold">
                            {tittel}
                        </BodyShort>
                        {periode && (
                            <BodyShort size="small" textColor="subtle">
                                {periode}
                            </BodyShort>
                        )}
                        {ekstraInfo.map((linje) => (
                            <BodyShort key={linje} size="small" textColor="subtle">
                                {linje}
                            </BodyShort>
                        ))}
                    </VStack>
                    <Tag
                        data-color={status.dataColor}
                        variant="moderate"
                        size="small"
                        icon={status.icon}
                        style={{ width: 'fit-content' }}
                    >
                        {status.label}
                    </Tag>
                </VStack>
                <ChevronRightIcon fontSize="1.5rem" aria-hidden style={{ flexShrink: 0 }} />
            </HStack>
        </KlikkbartKort>
    );
}

function YtelserOversikt() {
    const { data: alleYtelser = [], isLoading } = useFilterYtelser();

    if (isLoading) {
        return (
            <VStack gap="space-16">
                <Skeleton variant="rectangle" height={56} />
                <Skeleton variant="rectangle" height={56} />
            </VStack>
        );
    }

    const ytelser = alleYtelser.filter((ytelse) => {
        const kode = hentYtelseStatus(ytelse).kode;
        return kode !== 'avsluttet' && kode !== 'stanset';
    });

    if (ytelser.length === 0) {
        return (
            <BodyShort size="small" textColor="subtle">
                Ingen aktive ytelser
            </BodyShort>
        );
    }

    return (
        <VStack gap="space-16" as="ul" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {ytelser.map((ytelse) => (
                <li key={getUnikYtelseKey(ytelse)}>
                    <YtelseKort ytelse={ytelse} />
                </li>
            ))}
        </VStack>
    );
}

export default YtelserOversikt;
