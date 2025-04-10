import type { Arbeidsforhold } from 'src/models/ytelse/arbeidsforhold';
import type { Foreldrepengerettighet } from 'src/models/ytelse/foreldrepenger';
import { ascendingDateComparator, datoStigende } from 'src/utils/date-utils';

export function utledFraDatoForRettighet(foreldrepenger: Foreldrepengerettighet): Date {
    return foreldrepenger.periode
        .map((periode) => new Date(periode.foreldrepengerFom))
        .sort(ascendingDateComparator)[0];
}

export function sorterArbeidsforholdEtterRefusjonTom(foreldrepenger: Foreldrepengerettighet): Arbeidsforhold[] {
    return foreldrepenger.arbeidsforhold.sort(datoStigende((a) => a.refusjonTom || new Date(0))).reverse();
}
