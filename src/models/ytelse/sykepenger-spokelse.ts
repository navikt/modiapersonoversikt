import dayjs from 'dayjs';
import type { SykpengerVedtak } from 'src/generated/modiapersonoversikt-api';
import { backendDatoformat } from 'src/utils/date-utils';

export function getSykepengerSpokelseIdDato(ytelse: SykpengerVedtak) {
    return ytelse.vedtattTidspunkt ?? dayjs().format(backendDatoformat);
}

export function getUnikSykepengerSpokelseKey(ytelse: SykpengerVedtak) {
    return `spokelse-${ytelse.vedtaksreferanse}`;
}
