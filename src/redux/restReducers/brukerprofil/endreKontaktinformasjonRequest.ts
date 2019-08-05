export interface EndreKontaktinformasjonRequest {
    mobil?: Telefon;
    jobb?: Telefon;
    hjem?: Telefon;
}

interface Telefon {
    retningsnummer: string;
    identifikator: string;
}
