import dayjs from 'dayjs';
import type { Utbetalingsperioder } from 'src/generated/modiapersonoversikt-api';
import { backendDatoformat } from 'src/utils/date-utils';

export function getSykepengerSpokelseIdDato(ytelse: Utbetalingsperioder) {
    return ytelse.utbetaltePerioder.firstOrNull()?.fom ?? dayjs().format(backendDatoformat);
}

export function getUnikSykepengerSpokelseKey(ytelse: Utbetalingsperioder) {
    return `spokelse-${ytelse.utbetaltePerioder.firstOrNull()?.fom}`;
}
