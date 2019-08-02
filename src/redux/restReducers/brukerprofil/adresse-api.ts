import { Gateadresse, Matrikkeladresse, Postboksadresse, Utlandsadresse } from '../../../models/personadresse';
import { Periode } from '../../../models/periode';

export interface EndreAdresseRequest {
    norskAdresse: {
        gateadresse: EndreGateadresseRequest | null;
        matrikkeladresse: EndreMatrikkeladresseRequest | null;
        postboksadresse: EndrePostboksadresseRequest | null;
    } | null;
    utenlandskAdresse: EndreUtlandsadresseRequest | null;
    folkeregistrertAdresse: boolean | null;
}

export interface EndreGateadresseRequest {
    tilleggsadresse?: string;
    gatenavn: string;
    husnummer?: string;
    husbokstav?: string;
    postnummer: string;
    bolignummer?: string;
    gyldigTil: string;
}

export interface EndreMatrikkeladresseRequest {
    tilleggsadresse?: string;
    eiendomsnavn?: string;
    postnummer: string;
    gyldigTil: string;
}

interface EndrePostboksadresseRequest {
    postboksnummer: string;
    postnummer: string;
    tilleggsadresse?: string;
    postboksanlegg?: string;
    gyldigTil: string;
}

interface EndreUtlandsadresseRequest {
    landkode: string;
    adresselinje1: string;
    adresselinje2: string;
    adresselinje3: string;
    gyldigTil: string;
}

function getGyldigTil(periode?: Periode) {
    if (!periode) {
        // eslint-disable-next-line no-throw-literal
        throw 'Ugyldig periode for endring av adresse';
    }
    return periode.til;
}

export function getEndreNorskGateadresseRequest(gateadresse: Gateadresse): EndreAdresseRequest {
    const { poststed, periode, ...mappedGateadresse } = gateadresse;
    return {
        norskAdresse: {
            gateadresse: {
                ...mappedGateadresse,
                gyldigTil: getGyldigTil(gateadresse.periode)
            },
            matrikkeladresse: null,
            postboksadresse: null
        },
        utenlandskAdresse: null,
        folkeregistrertAdresse: false
    };
}

export function getEndreMatrikkeladresseRequest(matrikkeladresse: Matrikkeladresse): EndreAdresseRequest {
    const { poststed, periode, ...mappedMatrikkeladresse } = matrikkeladresse;
    return {
        norskAdresse: {
            gateadresse: null,
            postboksadresse: null,
            matrikkeladresse: {
                ...mappedMatrikkeladresse,
                gyldigTil: getGyldigTil(matrikkeladresse.periode)
            }
        },
        utenlandskAdresse: null,
        folkeregistrertAdresse: false
    };
}

export function getEndrePostboksadresseRequest(postboksadresse: Postboksadresse): EndreAdresseRequest {
    const { poststed, periode, ...mappedPostboksadresse } = postboksadresse;
    return {
        norskAdresse: {
            gateadresse: null,
            matrikkeladresse: null,
            postboksadresse: {
                ...mappedPostboksadresse,
                gyldigTil: getGyldigTil(postboksadresse.periode)
            }
        },
        utenlandskAdresse: null,
        folkeregistrertAdresse: false
    };
}

export function getSlettMidlertidigeAdresserRequest(): EndreAdresseRequest {
    return {
        norskAdresse: null,
        utenlandskAdresse: null,
        folkeregistrertAdresse: true
    };
}

export function getEndreUtenlandsadresseRequest(adresse: Utlandsadresse): EndreAdresseRequest {
    return {
        norskAdresse: null,
        utenlandskAdresse: {
            landkode: adresse.landkode ? adresse.landkode.kodeRef : '',
            adresselinje1: adresse.adresselinjer[0],
            adresselinje2: adresse.adresselinjer[1],
            adresselinje3: adresse.adresselinjer[2],
            gyldigTil: getGyldigTil(adresse.periode)
        },
        folkeregistrertAdresse: false
    };
}
