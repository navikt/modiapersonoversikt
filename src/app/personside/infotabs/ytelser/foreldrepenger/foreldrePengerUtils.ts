import { Arbeidsforhold, Foreldrepengerettighet } from '../../../../../models/ytelse/foreldrepenger';
import { ascendingDateComparator, genericAscendingDateComparator } from '../../../../../utils/dateUtils';

export function utledFraDatoForRettighet(foreldrepenger: Foreldrepengerettighet): Date {
    return foreldrepenger.periode.map(periode => new Date(periode.foreldrepengerFom)).sort(ascendingDateComparator)[0];
}

export function sorterArbeidsforholdEtterRefusjonTom(foreldrepenger: Foreldrepengerettighet): Arbeidsforhold[] {
    return foreldrepenger.arbeidsforhold
        .sort(genericAscendingDateComparator(a => a.refusjonTom || new Date(0)))
        .reverse();
}
