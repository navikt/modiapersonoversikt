import dayjs from 'dayjs';
import type { PseudoDagpengerVedtak } from 'src/generated/modiapersonoversikt-api';
import { backendDatoformat } from 'src/utils/date-utils';

/**
 * "Id Dato" = date formatted date string, used as an id
 */
export function getDagpengerIdDato(ytelse: PseudoDagpengerVedtak) {
    return ytelse.nyesteFraOgMedDato ?? dayjs().format(backendDatoformat);
}

export function getUnikDagpengerKey(ytelse: PseudoDagpengerVedtak) {
    // TODO ensure this is actually unique
    return `dagpenger-${ytelse.nyesteFraOgMedDato ?? 'NONE'}`;
}
