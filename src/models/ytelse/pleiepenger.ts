import { getSistePeriodeForPleiepengerettighet } from '../../app/personside/infotabs/ytelser/pleiepenger/pleiepengerUtils';
import moment from 'moment';
import { backendDatoformat } from '../../mock/utils/mock-utils';

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

export interface Arbeidsforhold {
    arbeidsgiverNavn: string;
    arbeidsgiverKontonr: string | null;
    inntektsperiode: string | null;
    inntektForPerioden: number | null;
    refusjonTom: string | null;
    refusjonstype: string | null;
    arbeidsgiverOrgnr: string;
    arbeidskategori: string;
}

export interface Vedtak {
    periode: Periode;
    kompensasjonsgrad: number | null;
    utbetalingsgrad: number;
    anvistUtbetaling: string;
    bruttobeløp: number;
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
        : moment().format(backendDatoformat);
}

export function getUnikPleiepengerKey(pleiepengerettighet: Pleiepengerettighet) {
    return 'pleiepenger' + getPleiepengerIdDato(pleiepengerettighet);
}
