import { Pleiepengeperiode, Pleiepengerettighet, Vedtak } from '../../../../../models/ytelse/pleiepenger';
import { genericAscendingDateComparator } from '../../../../../utils/dateUtils';

export function getSistePeriodeForPleiepengerettighet(pleiepenger: Pleiepengerettighet): Pleiepengeperiode {
    return pleiepenger.perioder
        .sort(genericAscendingDateComparator(p => p.fom))
        .reverse()[0];
}

export function getSisteVedtakForPleiepengerettighet(pleiepenger: Pleiepengerettighet): Vedtak {
    return getSistePeriodeForPleiepengerettighet(pleiepenger).vedtak
        .sort(genericAscendingDateComparator(vedtak => vedtak.periode.fom))
        .reverse()[0];
}
