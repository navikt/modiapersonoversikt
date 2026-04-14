import dayjs from 'dayjs';
import type { SykepengerSpokelse } from 'src/generated/modiapersonoversikt-api';
import { backendDatoformat } from 'src/utils/date-utils';

export function getSykepengerSpokelseIdDato(ytelse: SykepengerSpokelse) {
    // see also src/components/ytelser/utils.ts
    return ytelse.utbetaltePerioder.firstOrNull()?.fom ?? dayjs().format(backendDatoformat);
}

export function getUnikSykepengerSpokelseKey(ytelse: SykepengerSpokelse) {
    return `spokelse-${ytelse.utbetaltePerioder.firstOrNull()?.fom}`;
}
