import { GateAdresse } from './gateadresse';
import { Klokkeslett } from './klokkeslett';

export interface ApningsTid {
    ukedag: string;
    apentFra: Klokkeslett;
    apentTil: Klokkeslett;
}

export interface PublikumsMottak {
    besoksadresse?: GateAdresse;
    apningstider: ApningsTid[];
}

export interface NavKontorInterface {
    enhetNavn: string;
    enhetId: string;
    publikumsmottak: PublikumsMottak[];
}
