export interface DigitalKontaktinformasjon {
    personident: string | null;
    reservasjon: string | null;
    epostadresse: Epostadresse | null;
    mobiltelefonnummer: MobilTelefon | null;
}

export interface Epostadresse {
    value: string | null;
    sistOppdatert: Date | null;
    sisVerifisert: Date | null;
}

export interface MobilTelefon {
    value: string | null;
    sistOppdatert: Date | null;
    sisVerifisert: Date | null;
}
