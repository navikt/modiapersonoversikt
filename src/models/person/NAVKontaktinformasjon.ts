export interface NavKontaktinformasjon {
    mobil?: Telefon;
    jobb?: Telefon;
    hjem?: Telefon;
}

export interface Telefon {
    sistEndret: string;
    retningsnummer: string;
    identifikator: string;
    sistEndretAv: string;
}