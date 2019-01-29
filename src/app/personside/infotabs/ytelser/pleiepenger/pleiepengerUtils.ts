import {
    Arbeidsforhold,
    Pleiepengeperiode,
    Pleiepengerettighet,
    Vedtak
} from '../../../../../models/ytelse/pleiepenger';
import { genericAscendingDateComparator } from '../../../../../utils/dateUtils';

export function getSistePeriodeForPleiepengerettighet(pleiepenger: Pleiepengerettighet): Pleiepengeperiode | undefined {
    return pleiepenger.perioder
        .sort(genericAscendingDateComparator(p => p.fom))
        .reverse()[0];
}

export function getSisteVedtakForPleiepengerettighet(pleiepenger: Pleiepengerettighet): Vedtak | undefined {
    const sistePeriodeForPleiepengerettighet = getSistePeriodeForPleiepengerettighet(pleiepenger);
    if (!sistePeriodeForPleiepengerettighet) {
        return undefined;
    }
    return sistePeriodeForPleiepengerettighet.vedtak
        .sort(genericAscendingDateComparator(vedtak => vedtak.periode.fom))
        .reverse()[0];
}

export function getAlleArbiedsforholdSortert(pleiepenger: Pleiepengerettighet): Arbeidsforhold[] {
    const arbeidsforhold =  pleiepenger.perioder.reduce(
        (acc: Arbeidsforhold[], periode) => [
            ...acc,
            ...periode.arbeidsforhold
        ],
        []
    );
    return sorterArbeidsforholdEtterRefusjonTom(arbeidsforhold);
}

export function sorterArbeidsforholdEtterRefusjonTom(arbeidsforhold: Arbeidsforhold[]): Arbeidsforhold[] {
    return arbeidsforhold
        .sort(genericAscendingDateComparator(a => a.refusjonTom || new Date(0)))
        .reverse();
}
