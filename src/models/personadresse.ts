import { Periode } from './periode';

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

export interface Gateadresse {
    tilleggsadresse?: string;
    gatenavn: string;
    husnummer?: string;
    husbokstav?: string;
    postnummer: string;
    poststed: string;
    bolignummer?: string;
    periode?: Periode;
}

export interface Matrikkeladresse {
    tilleggsadresse?: string;
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