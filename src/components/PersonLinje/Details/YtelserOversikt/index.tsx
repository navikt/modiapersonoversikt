import { BodyShort, LinkCard, Skeleton, VStack } from '@navikt/ds-react';
import { Link } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { getUnikYtelseKey, useFilterYtelser, type YtelseVedtak } from 'src/components/ytelser/utils';
import { type Foreldrepenger, ForeldrepengerYtelse } from 'src/generated/modiapersonoversikt-api';
import type { Dagpenger, PensjonSak, Sykepenger, SykepengerSpokelse } from 'src/lib/types/modiapersonoversikt-api';
import type { Arbeidsavklaringspenger } from 'src/models/ytelse/arbeidsavklaringspenger';
import type { Tiltakspenger } from 'src/models/ytelse/tiltakspenger';
import { YtelseVedtakYtelseType } from 'src/models/ytelse/ytelse-utils';
import { trackGenereltUmamiEvent, trackingEvents } from 'src/utils/analytics';
import { formatterDato, getNewestDate, getOldestDate } from 'src/utils/date-utils';
import { NOKellerNull } from 'src/utils/string-utils';
import { twMerge } from 'tailwind-merge';
import { SeksjonFeil } from '../components';

type YtelsePeriode = { fom: string; tom: string | null };

function hentYtelsePeriode(ytelse: YtelseVedtak): YtelsePeriode | null {
    switch (ytelse.ytelseType) {
        case YtelseVedtakYtelseType.Sykepenger: {
            const sp = ytelse.ytelseData.data as Sykepenger;
            if (!sp.sykmeldtFom) return null;
            return { fom: sp.sykmeldtFom, tom: sp.slutt ?? null };
        }
        case YtelseVedtakYtelseType.SykepengerSpokelse: {
            const sp = ytelse.ytelseData.data as SykepengerSpokelse;
            if (!sp.utbetaltePerioder.length) return null;
            const fom = sp.utbetaltePerioder.reduce(
                (eldst, p) => getOldestDate(eldst, p.fom),
                sp.utbetaltePerioder[0].fom
            );
            const tom = sp.utbetaltePerioder.reduce(
                (nyest, p) => getNewestDate(nyest, p.tom),
                sp.utbetaltePerioder[0].tom
            );
            return { fom, tom };
        }
        case YtelseVedtakYtelseType.Foreldrepenger: {
            const fp = ytelse.ytelseData.data as Foreldrepenger;
            if (!fp.fom) return null;
            return { fom: fp.fom, tom: fp.tom ?? null };
        }
        case YtelseVedtakYtelseType.Arbeidsavklaringspenger: {
            const aap = ytelse.ytelseData.data as Arbeidsavklaringspenger;
            const fom = aap.periode?.fraOgMedDato;
            if (!fom) return null;
            return { fom, tom: aap.periode?.tilOgMedDato ?? null };
        }
        case YtelseVedtakYtelseType.Pensjon: {
            const p = ytelse.ytelseData.data as PensjonSak;
            if (!p.fomDato) return null;
            return { fom: p.fomDato, tom: p.tomDato ?? null };
        }
        case YtelseVedtakYtelseType.Tiltakspenger: {
            const tp = ytelse.ytelseData.data as Tiltakspenger;
            return { fom: tp.periode.fraOgMed, tom: tp.periode.tilOgMed };
        }
        case YtelseVedtakYtelseType.Dagpenger: {
            const dp = ytelse.ytelseData.data as Dagpenger;
            if (!dp.eldsteFraOgMedDato) return null;
            const perioder = dp.perioder ?? [];
            if (!perioder.length) return { fom: dp.eldsteFraOgMedDato, tom: null };
            const tom = perioder.reduce((nyest, p) => getNewestDate(nyest, p.tilOgMed), perioder[0].tilOgMed);
            return { fom: dp.eldsteFraOgMedDato, tom };
        }
        default:
            return null;
    }
}

function formatterYtelsePeriode(periode: YtelsePeriode | null): string | null {
    if (!periode) return null;
    return periode.tom ? `${formatterDato(periode.fom)} – ${formatterDato(periode.tom)}` : formatterDato(periode.fom);
}

function erYtelsenAktiv(ytelse: YtelseVedtak, iDag = dayjs()): boolean {
    const periode = hentYtelsePeriode(ytelse);
    if (!periode) return true;

    const dagensDato = iDag.startOf('day');
    const harStartet = !dayjs(periode.fom).startOf('day').isAfter(dagensDato);
    const ikkeAvsluttet = !periode.tom || !dayjs(periode.tom).startOf('day').isBefore(dagensDato);

    return harStartet && ikkeAvsluttet;
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
    const periode = formatterYtelsePeriode(hentYtelsePeriode(ytelse));
    const ekstraInfo = hentYtelseEkstraInfo(ytelse);
    const tittel = getYtelseTittel(ytelse);

    return (
        <LinkCard size="small" className={twMerge('rounded-(--ax-radius-8)!', 'bg-ax-bg-info-soft!')}>
            <LinkCard.Title as="span">
                <LinkCard.Anchor asChild>
                    <Link
                        to="/new/person/ytelser"
                        search={{ id: getUnikYtelseKey(ytelse) }}
                        aria-label={`${tittel} – gå til ytelse`}
                        onClick={() =>
                            trackGenereltUmamiEvent(trackingEvents.lenkeKlikketFraHjem, {
                                fane: 'hjem',
                                kort: 'ytelser',
                                tekst: `lenke til ytelser (${tittel})`
                            })
                        }
                    >
                        {tittel}
                    </Link>
                </LinkCard.Anchor>
            </LinkCard.Title>
            {(periode || ekstraInfo.length > 0) && (
                <LinkCard.Description>
                    <VStack gap="space-4">
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
                </LinkCard.Description>
            )}
        </LinkCard>
    );
}

function YtelserOversikt() {
    const { data: alleYtelser = [], isLoading, errorMessages } = useFilterYtelser();
    const aktiveYtelser = alleYtelser.filter((ytelse) => erYtelsenAktiv(ytelse));

    if (isLoading) {
        return (
            <VStack gap="space-16">
                <Skeleton variant="rectangle" height={56} />
                <Skeleton variant="rectangle" height={56} />
            </VStack>
        );
    }

    if (aktiveYtelser.length === 0) {
        return errorMessages.length > 0 ? (
            <SeksjonFeil feilmeldinger={errorMessages} />
        ) : (
            <BodyShort size="small" textColor="subtle">
                Ingen aktive ytelser
            </BodyShort>
        );
    }

    return (
        <VStack gap="space-16">
            {errorMessages.length > 0 && <SeksjonFeil feilmeldinger={errorMessages} />}
            <VStack gap="space-16" as="ul" className="list-none p-0 m-0">
                {aktiveYtelser.map((ytelse) => (
                    <li key={getUnikYtelseKey(ytelse)}>
                        <YtelseKort ytelse={ytelse} />
                    </li>
                ))}
            </VStack>
        </VStack>
    );
}

export default YtelserOversikt;
