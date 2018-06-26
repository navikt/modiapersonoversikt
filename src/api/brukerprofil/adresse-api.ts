import { apiBaseUri } from '../config';
import { post } from '../api';
import { Gateadresse, Matrikkeladresse } from '../../models/personadresse';
import { Periode } from '../../models/periode';

export interface EndreAdresseRequest {
    norskAdresse: {
        gateadresse: EndreGateadresseRequest | null;
        matrikkeladresse: MatrikkeladresseRequest | null;
    } | null;
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

export interface MatrikkeladresseRequest {
    tilleggsadresse?: string;
    eiendomsnavn?: string;
    postnummer: string;
    gyldigTil: string;
}

function postEndreAdresse(fødselsnummer: string, request: EndreAdresseRequest): Promise<{}> {
    console.log(request);
    return post(`${apiBaseUri}/brukerprofil/${fødselsnummer}/adresse/`, request);
}

function getGyldigTil(periode?: Periode) {
    if (!periode) {
        throw 'Ugyldig periode for endring av adresse';
    }
    return periode.til;
}

export function postEndreNorskGateadresse(fødselsnummer: string, gateadresse: Gateadresse) {
    const {poststed, periode, ...mappedGateadresse} = gateadresse;
    const request: EndreAdresseRequest = {
        norskAdresse: {
            gateadresse: {
                ...mappedGateadresse,
                gyldigTil: getGyldigTil(gateadresse.periode)},
            matrikkeladresse: null
        }
    };
    return postEndreAdresse(fødselsnummer, request);
}

export function postEndreMatrikkeladresse(fødselsnummer: string, matrikkeladresse: Matrikkeladresse) {
    const {poststed, periode, ...mappedMatrikkeladresse} = matrikkeladresse;
    const request: EndreAdresseRequest = {
        norskAdresse: {
            gateadresse: null,
            matrikkeladresse: {
                ...mappedMatrikkeladresse,
                gyldigTil: getGyldigTil(matrikkeladresse.periode)},
        }
    };
    return postEndreAdresse(fødselsnummer, request);
}