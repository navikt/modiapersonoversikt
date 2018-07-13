import { Periode } from './periode';
import { Kodeverk } from './kodeverk';

export interface Endringsinfo {
    sistEndretAv: string;
    sistEndret: string;
}

export interface Personadresse {
    endringsinfo?: Endringsinfo;
    gateadresse?: Gateadresse;
    postboksadresse?: Postboksadresse;
    matrikkeladresse?: Matrikkeladresse;
    utlandsadresse?: Utlandsadresse;
    ustrukturert?: UstrukturertAdresse;
}

export interface Gateadresse {
    tilleggsadresse?: string;
    gatenavn: string;
    husnummer: string;
    husbokstav?: string;
    postnummer: string;
    poststed: string;
    bolignummer?: string;
    periode?: Periode;
}

export interface Postboksadresse {
    postboksnummer: string;
    postnummer: string;
    poststed: string;
    tilleggsadresse?: string;
    postboksanlegg?: string;
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
    landkode?: Kodeverk;
    adresselinjer: string[];
    periode?: Periode;
}

export interface UstrukturertAdresse {
    adresselinje: string;
}