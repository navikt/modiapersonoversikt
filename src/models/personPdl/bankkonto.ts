import { Adresse, KodeBeskrivelse } from './person';

export interface Bankkonto {
    kontonummer: string;
    banknavn: string;
    sistEndret: Date;
    sistEndretAv: string;

    bankkode: string | null;
    swift: string | null;
    landkode: KodeBeskrivelse<String> | null;
    adresse: Adresse | null;
    valuta: KodeBeskrivelse<String> | null;
}
