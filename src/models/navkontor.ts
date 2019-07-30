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

export interface NavKontor {
    enhetNavn: string;
    enhetId: string;
    publikumsmottak: PublikumsMottak[];
}

export type BrukersNavKontorResponse = NavKontor | null;
