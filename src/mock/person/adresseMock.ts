import * as faker from 'faker/locale/nb_NO';
import {
    Endringsinfo,
    Gateadresse,
    Matrikkeladresse,
    Personadresse,
    UstrukturertAdresse,
    Utlandsadresse
} from '../../models/personadresse';
import { getSistOppdatert, vektetSjanse } from '../utils/mock-utils';
import { getPeriode } from './periodeMock';

const gateadresse: Gateadresse = {
    tilleggsadresse: 'Tillegsgaten 1',
    gatenavn: 'Tilfeldighetsgaten',
    husnummer: '3',
    postnummer: '0666',
    poststed: 'HELL',
    periode: getPeriode()
};

const matrikkeladresse: Matrikkeladresse = {
    eiendomsnavn: 'Bogstad Gård',
    postnummer: '1234',
    poststed: 'OSLO',
    periode: getPeriode()
};

const utlandsadresse: Utlandsadresse = {
    landkode: 'BM',
    adresselinje: 'Hytte 2, Stranda, Bahamas',
    periode: getPeriode()
};

const ustrukturertAdresse: UstrukturertAdresse = {
    adresselinje: 'Storgata 1, 9876 NARVIK'
};

export function getTilfeldigAdresse(): Personadresse {
    if (vektetSjanse(faker, 0.2)) {
        return {
            endringsinfo: getEndringsinfo(),
            matrikkeladresse: matrikkeladresse
        };
    } else if (vektetSjanse(faker, 0.2)) {
        return {
            endringsinfo: getEndringsinfo(),
            utlandsadresse: utlandsadresse
        };
    } else if (vektetSjanse(faker, 0.2)) {
        return {
            endringsinfo: getEndringsinfo(),
            ustrukturert: ustrukturertAdresse
        };
    } else {
        return {
            endringsinfo: getEndringsinfo(),
            gateadresse: gateadresse
        };
    }

}

function getEndringsinfo(): Endringsinfo {
    return {
        sistEndret: getSistOppdatert(),
        sistEndretAv: 'AA001'
    };
}
