import dayjs from 'dayjs';
import type { NonavaapapiinternVedtakUtenUtbetalingDto } from 'src/generated/modiapersonoversikt-api';
import { backendDatoformat } from 'src/utils/date-utils';

export type ArbeidsavklaringspengerResponse = NonavaapapiinternVedtakUtenUtbetalingDto[];

export type Arbeidsavklaringspenger = NonavaapapiinternVedtakUtenUtbetalingDto;

export function getArbeidsavklaringspengerIdDato(ytelse: Arbeidsavklaringspenger) {
    return ytelse.periode.fraOgMedDato ?? dayjs().format(backendDatoformat);
}

export function getUnikArbeidsavklaringspengerKey(ytelse: Arbeidsavklaringspenger) {
    return `arbeidsavklaringspenger${ytelse.vedtakId}`;
}
