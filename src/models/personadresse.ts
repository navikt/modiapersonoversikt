
export interface Endringsinfo {
    sistEndretAv: string;
    sistEndret: string;
}

export interface Personadresse {
    endringsinfo?: Endringsinfo;
    gateadresse?: Gateadresse;
    matrikkeladresse?: Matrikkeladresse;
    utlandsadresse?: Utlandsadresse;
    ustrukturert?: UstrukturertAdresse;
}

export interface Gateadresse extends Personadresse {
    tilleggsadresse?: string;
    gatenavn: string;
    husnummer?: string;
    husbokstav?: string;
    postnummer: string;
    poststed: string;
}

export interface Matrikkeladresse extends Personadresse {
    tillegsadresse?: string;
    eiendomsnavn?: string;
    postnummer: string;
    poststed: string;
}

export interface Utlandsadresse extends Personadresse {
    landkode?: string;
    adresselinje: string;
}

export interface UstrukturertAdresse extends Personadresse {
    adresselinje: string;
}