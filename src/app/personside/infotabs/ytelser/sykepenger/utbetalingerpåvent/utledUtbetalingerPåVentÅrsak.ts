import dayjs from 'dayjs';
import isSameOrAfterPlugin from 'dayjs/plugin/isSameOrAfter';
import isSameOrBeforePlugin from 'dayjs/plugin/isSameOrBefore';
import type { Periode } from '../../../../../../models/tid';
import type { UtbetalingPåVent } from '../../../../../../models/ytelse/ytelse-utbetalinger';
dayjs.extend(isSameOrBeforePlugin);
dayjs.extend(isSameOrAfterPlugin);

export function utledUtbetalingPåVentÅrsak(utbetaling: UtbetalingPåVent): string {
    if (utbetaling.arbeidskategori === 'Inntektsopplysninger mangler') {
        return utbetaling.arbeidskategori;
    }
    if (utbetaling.stansårsak) {
        return utbetaling.stansårsak;
    }
    if (utbetalingPåVentPgaSanksjon(utbetaling)) {
        return 'Sanksjon';
    }
    if (erPåVentFordiSykemeldingMangler(utbetaling)) {
        return 'Sykmelding mangler for perioden';
    }
    if (erPåVentGrunnetFerie(utbetaling)) {
        return 'Ferie';
    }
    return '';
}

function utbetalingPåVentPgaSanksjon({ vedtak, sanksjon }: UtbetalingPåVent): boolean {
    if (sanksjon && vedtak && vedtak.til) {
        const sanksjonInnenforVedtaksperiode = dayjs(sanksjon.fra).isSameOrBefore(dayjs(vedtak.til));
        const sanksjonUtenSlutt = sanksjonInnenforVedtaksperiode && !sanksjon.til;
        const sanksjonFremdelesGjeldende = !!sanksjon.til && dayjs(sanksjon.til).isSameOrAfter(dayjs(vedtak.til));
        return sanksjonUtenSlutt || sanksjonFremdelesGjeldende;
    }
    return false;
}

function erPåVentFordiSykemeldingMangler({ vedtak, sykmeldt }: UtbetalingPåVent): boolean {
    if (vedtak && sykmeldt && vedtak.til && sykmeldt.til) {
        return dayjs(vedtak.til).isSameOrAfter(dayjs(sykmeldt.til));
    }
    return false;
}

function erPåVentGrunnetFerie({ vedtak, ferie1, ferie2 }: UtbetalingPåVent): boolean {
    if (vedtak) {
        return ferieEtterVedtakTom(ferie1, vedtak.til) || ferieEtterVedtakTom(ferie2, vedtak.til);
    }
    return false;
}

function ferieEtterVedtakTom(ferie: Periode | null, vedtakTil: string): boolean {
    return !!ferie && dayjs(vedtakTil).isSameOrBefore(dayjs(ferie.til));
}
