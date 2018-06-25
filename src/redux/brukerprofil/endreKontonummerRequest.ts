import { BankAdresse } from '../../models/person/person';

export interface EndreKontonummerRequest {
    kontonummer: string;
    landkode?: string;
    valuta?: string;
    banknavn?: string | null;
    bankkode?: string;
    swift?: string;
    bankadresse?: BankAdresse;
}
