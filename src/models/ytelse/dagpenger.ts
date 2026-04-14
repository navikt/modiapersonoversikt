import dayjs from 'dayjs';
import type { PseudoDagpengerVedtak } from 'src/generated/modiapersonoversikt-api';
import { backendDatoformat } from 'src/utils/date-utils';

export function getDagpengerIdDato(ytelse: PseudoDagpengerVedtak) {
    return ytelse.eldsteFraOgMedDato ?? dayjs().format(backendDatoformat);
}

export function getUnikDagpengerKey(ytelse: PseudoDagpengerVedtak) {
    // TODO ensure this is actually unique
    return `dagpenger-${ytelse.eldsteFraOgMedDato ?? 'NONE'}`;
}
