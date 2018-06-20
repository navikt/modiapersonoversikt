import { apiBaseUri } from '../config';
import { post } from '../api';
import { Gateadresse, Matrikkeladresse } from '../../models/personadresse';
import { Periode } from '../../models/periode';

export interface EndreAdresseRequest {
    norskAdresse: {
        gateadresse: EndreGateadresseRequest | null;
        matrikkeladresse: Matrikkeladresse | null;
    } | null;
}

export interface EndreGateadresseRequest {
    tilleggsadresse?: string;
    gatenavn: string;
    husnummer?: string;
    husbokstav?: string;
    postnummer: string;
    bolignummer?: string;
    periode?: Periode;
}

function postEndreAdresse(fødselsnummer: string, request: EndreAdresseRequest): Promise<{}> {
    console.log(request);
    return post(`${apiBaseUri}/brukerprofil/${fødselsnummer}/adresse/`, request);
}

export function postEndreNorskGateadresse(fødselsnummer: string, gateadresse: Gateadresse) {
    const {poststed, ...mappedGateadresse} = gateadresse;
    const request: EndreAdresseRequest = {
        norskAdresse: {
            gateadresse: mappedGateadresse,
            matrikkeladresse: null
        }
    };
    return postEndreAdresse(fødselsnummer, request);
}