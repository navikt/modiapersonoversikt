
export interface Endringsinfo {
    sistEndretAv: string;
    sistEndret: string;
}

export interface Periode {
    fra: string;
    til: string;
}

export interface Personadresse {
    endringsinfo?: Endringsinfo;
    gateadresse?: Gateadresse;
    matrikkeladresse?: Matrikkeladresse;
    utlandsadresse?: Utlandsadresse;
    ustrukturert?: UstrukturertAdresse;
}

export interface Gateadresse {
    tilleggsadresse?: string;
    gatenavn: string;
    husnummer?: string;
    husbokstav?: string;
    postnummer: string;
    poststed: string;
    periode?: Periode;
}

export interface Matrikkeladresse {
    tillegsadresse?: string;
    eiendomsnavn?: string;
    postnummer: string;
    poststed: string;
    periode?: Periode;
}

export interface Utlandsadresse {
    landkode?: string;
    adresselinje: string;
    periode?: Periode;
}

export interface UstrukturertAdresse {
    adresselinje: string;
}