import { Foreldrepengerettighet } from '../../../../../models/ytelse/foreldrepenger';
import { ascendingDateComparator, datoStigende } from '../../../../../utils/dateUtils';
import { Arbeidsforhold } from '../../../../../models/ytelse/arbeidsforhold';

export function utledFraDatoForRettighet(foreldrepenger: Foreldrepengerettighet): Date {
    return foreldrepenger.periode.map(periode => new Date(periode.foreldrepengerFom)).sort(ascendingDateComparator)[0];
}

export function sorterArbeidsforholdEtterRefusjonTom(foreldrepenger: Foreldrepengerettighet): Arbeidsforhold[] {
    return foreldrepenger.arbeidsforhold.sort(datoStigende(a => a.refusjonTom || new Date(0))).reverse();
}
