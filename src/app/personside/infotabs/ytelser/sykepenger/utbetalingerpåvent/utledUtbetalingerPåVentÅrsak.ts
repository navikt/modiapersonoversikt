import { UtbetalingPåVent } from '../../../../../../models/ytelse/ytelse-utbetalinger';
import moment from 'moment';
import { Periode } from '../../../../../../models/periode';

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
        const sanksjonInnenforVedtaksperiode = moment(sanksjon.fra).isSameOrBefore(moment(vedtak.til));
        const sanksjonUtenSlutt = sanksjonInnenforVedtaksperiode && !sanksjon.til;
        const sanksjonFremdelesGjeldende = !!sanksjon.til && moment(sanksjon.til).isSameOrAfter(moment(vedtak.til));
        return sanksjonUtenSlutt || sanksjonFremdelesGjeldende;
    }
    return false;
}

function erPåVentFordiSykemeldingMangler({ vedtak, sykmeldt }: UtbetalingPåVent): boolean {
    if (vedtak && sykmeldt && vedtak.til && sykmeldt.til) {
        return moment(vedtak.til).isSameOrAfter(moment(sykmeldt.til));
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
    return !!ferie && moment(vedtakTil).isSameOrBefore(moment(ferie.til));
}
