export interface NavKontaktinformasjon {
    mobil?: Telefon;
    jobbTelefon?: Telefon;
    hjemTelefon?: Telefon;
}

export interface Telefon {
    sistEndret: string;
    nummer: string;
    endretAv: string;
}