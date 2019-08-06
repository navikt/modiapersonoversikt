import { Klokkeslett } from './klokkeslett';
import { Gateadresse } from './personadresse';

export interface ApningsTid {
    ukedag: string;
    apentFra: Klokkeslett;
    apentTil: Klokkeslett;
}

export interface PublikumsMottak {
    besoksadresse?: Gateadresse;
    apningstider: ApningsTid[];
}

export interface NavKontorResponse {
    enhetNavn: string;
    enhetId: string;
    publikumsmottak: PublikumsMottak[];
}
