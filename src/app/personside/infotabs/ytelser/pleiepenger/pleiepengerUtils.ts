import type { Arbeidsforhold } from 'src/models/ytelse/arbeidsforhold';
import type { Pleiepengeperiode, Pleiepengerettighet, Vedtak } from 'src/models/ytelse/pleiepenger';
import { datoStigende } from 'src/utils/date-utils';

export function getSistePeriodeForPleiepengerettighet(pleiepenger: Pleiepengerettighet): Pleiepengeperiode | undefined {
    return pleiepenger.perioder.sort(datoStigende((p) => p.fom)).reverse()[0];
}

export function getSisteVedtakForPleiepengerettighet(pleiepenger: Pleiepengerettighet): Vedtak | undefined {
    const sistePeriodeForPleiepengerettighet = getSistePeriodeForPleiepengerettighet(pleiepenger);
    if (!sistePeriodeForPleiepengerettighet) {
        return undefined;
    }
    return sistePeriodeForPleiepengerettighet.vedtak.sort(datoStigende((vedtak) => vedtak.periode.fom)).reverse()[0];
}

export function getAlleArbiedsforholdSortert(pleiepenger: Pleiepengerettighet): Arbeidsforhold[] {
    const arbeidsforhold = pleiepenger.perioder.reduce(
        //biome-ignore lint/performance/noAccumulatingSpread: biome migration
        (acc: Arbeidsforhold[], periode) => [...acc, ...periode.arbeidsforhold],
        []
    );
    return sorterArbeidsforholdEtterRefusjonTom(arbeidsforhold);
}

export function sorterArbeidsforholdEtterRefusjonTom(arbeidsforhold: Arbeidsforhold[]): Arbeidsforhold[] {
    return arbeidsforhold.sort(datoStigende((a) => a.refusjonTom || new Date(0))).reverse();
}
