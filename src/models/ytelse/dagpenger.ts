import dayjs from 'dayjs';
import type { Dagpenger } from 'src/generated/modiapersonoversikt-api';
import { backendDatoformat } from 'src/utils/date-utils';

export function getDagpengerIdDato(ytelse: Dagpenger) {
    return ytelse.eldsteFraOgMedDato ?? dayjs().format(backendDatoformat);
}

export function getUnikDagpengerKey(ytelse: Dagpenger) {
    // TODO ensure this is actually unique
    return `dagpenger-${ytelse.eldsteFraOgMedDato ?? 'NONE'}`;
}
