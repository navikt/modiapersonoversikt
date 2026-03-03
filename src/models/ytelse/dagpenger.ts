import type { PseudoDagpengerVedtak } from 'src/generated/modiapersonoversikt-api';

/**
 * "Id Dato" = date formatted date string, used as an id
 */
export function getDagpengerIdDato(ytelse: PseudoDagpengerVedtak) {
    return ytelse.nyesteFraOgMedDato;
}

export function getUnikDagpengerKey(ytelse: PseudoDagpengerVedtak) {
    // TODO ensure this is actually unique
    return `dagpenger-${ytelse.nyesteFraOgMedDato}`;
}
