import { apiBaseUri } from '../config';
import { post } from '../api';
import { Matrikkeladresse } from '../../models/personadresse';
import { GateadresseSkjemainput } from '../../app/brukerprofil/adresse/GateadresseForm';

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
    gyldigTil: string;
}

function postEndreAdresse(fødselsnummer: string, request: EndreAdresseRequest): Promise<{}> {
    console.log(request);
    return post(`${apiBaseUri}/brukerprofil/${fødselsnummer}/adresse/`, request);
}

export function postEndreNorskGateadresse(fødselsnummer: string, gateadresse: GateadresseSkjemainput) {
    const request: EndreAdresseRequest = {
        norskAdresse: {
            gateadresse: {
                gatenavn: gateadresse.gatenavn.value,
                bolignummer: gateadresse.bolignummer.value,
                husbokstav: gateadresse.husbokstav.value,
                husnummer: gateadresse.husnummer.value,
                postnummer: gateadresse.postnummer.value,
                gyldigTil: gateadresse.gyldigTil.value,
                tilleggsadresse: gateadresse.tilleggsadresse.value
            },
            matrikkeladresse: null
        }
    };
    return postEndreAdresse(fødselsnummer, request);
}