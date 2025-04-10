import dayjs from 'dayjs';
import { getSistePeriodeForPleiepengerettighet } from 'src/app/personside/infotabs/ytelser/pleiepenger/pleiepengerUtils';
import type { Arbeidsforhold } from 'src/models/ytelse/arbeidsforhold';
import { backendDatoformat } from 'src/utils/date-utils';

export interface PleiepengerResponse {
    pleiepenger: Pleiepengerettighet[] | null;
}

export interface Pleiepengerettighet {
    barnet: string;
    omsorgsperson: string;
    andreOmsorgsperson: string | null;
    restDagerFomIMorgen: number;
    forbrukteDagerTomIDag: number;
    pleiepengedager: number;
    restDagerAnvist: number;
    perioder: Pleiepengeperiode[];
}

export interface Pleiepengeperiode {
    fom: string;
    antallPleiepengedager: number;
    arbeidsforhold: Arbeidsforhold[];
    vedtak: Vedtak[];
}

export interface Vedtak {
    periode: Periode;
    kompensasjonsgrad: number | null;
    utbetalingsgrad: number;
    anvistUtbetaling: string;
    bruttobelop: number;
    dagsats: number;
    pleiepengegrad: number | null;
}

export interface Periode {
    fom: string;
    tom: string;
}

export function getPleiepengerIdDato(pleiepengerettighet: Pleiepengerettighet) {
    const sistePeriodeForPleiepengerettighet = getSistePeriodeForPleiepengerettighet(pleiepengerettighet);
    return sistePeriodeForPleiepengerettighet
        ? sistePeriodeForPleiepengerettighet.fom
        : dayjs().format(backendDatoformat);
}

export function getUnikPleiepengerKey(pleiepengerettighet: Pleiepengerettighet): string {
    return `pleiepenger${getPleiepengerIdDato(pleiepengerettighet)}`;
}
