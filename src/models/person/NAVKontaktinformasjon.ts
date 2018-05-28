export interface NavKontaktinformasjon {
    mobil?: Telefon;
    jobbTelefon?: Telefon;
    hjemTelefon?: Telefon;
}

export interface Telefon {
    sistEndret: string;
    retningsnummer: string;
    telefonnummer: string;
    sistEndretAv: string;
}