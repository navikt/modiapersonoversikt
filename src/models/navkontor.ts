import { GateAdresse } from './gateadresse';
import { Klokkeslett } from './klokkeslett';
import { UkeDag } from './ukedager';

export interface ApningsTid {
    ukedag: UkeDag;
    apentFra: Klokkeslett;
    apentTil: Klokkeslett;
}

export interface KontaktInformasjon {
    gateAdresse: GateAdresse;
    apningsTider: Array<ApningsTid>;
}

export interface NavKontorInterface {
    enhetNavn: string;
    enhetId: string;
    kontaktInformasjon: Array<KontaktInformasjon>;
}
