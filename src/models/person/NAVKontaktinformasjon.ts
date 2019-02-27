import { Kodeverk } from '../kodeverk';

export interface NavKontaktinformasjon {
    mobil?: Telefon;
    jobbTelefon?: Telefon;
    hjemTelefon?: Telefon;
}

export interface Telefon {
    sistEndret: string;
    retningsnummer: Kodeverk | null;
    identifikator: string;
    sistEndretAv: string;
}
