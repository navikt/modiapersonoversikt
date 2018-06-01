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
import { FOLKEREGISTERET } from '../../utils/endretAvUtil';

export const tilfeldigGateadresse = (periode: boolean): Gateadresse => {
    return {
        tilleggsadresse: vektetSjanse(faker, 0.1) ? faker.address.secondaryAddress().toUpperCase() : undefined,
        gatenavn: tilfeldigGatenavn(),
        husnummer: String(faker.random.number(120)),
        postnummer: faker.address.zipCode('####'),
        poststed: faker.address.city().toUpperCase(),
        periode: periode ? getPeriode() : undefined
    };
};

function tilfeldigGatenavn() {
    return faker.address.streetName().replace(' ', '').toUpperCase();
}

const tilfeldigMatrikkeladresse = (periode: boolean): Matrikkeladresse => {
    return {
        eiendomsnavn: tilfeldigGatenavn() + ' GÅRD',
        postnummer: faker.address.zipCode('####'),
        poststed: faker.address.city().toUpperCase(),
        periode: periode ? getPeriode() : undefined
    };
};

const tilfeldigUtlandsadresse = (periode: boolean): Utlandsadresse => {
    return {
        landkode: faker.address.countryCode(),
        adresselinje: faker.address.streetAddress(true).toUpperCase(),
        periode: periode ? getPeriode() : undefined
    };
};

const ustrukturertAdresse: UstrukturertAdresse = {
    adresselinje: 'STORGATA 1, 9876 NARVIK'
};

export function getTilfeldigAdresse(periode: boolean): Personadresse {
    if (vektetSjanse(faker, 0.2)) {
        return {
            endringsinfo: getEndringsinfo(),
            matrikkeladresse: tilfeldigMatrikkeladresse(periode)
        };
    } else if (vektetSjanse(faker, 0.2)) {
        return {
            endringsinfo: getEndringsinfo(),
            utlandsadresse: tilfeldigUtlandsadresse(periode)
        };
    } else if (vektetSjanse(faker, 0.2)) {
        return {
            endringsinfo: getEndringsinfo(),
            ustrukturert: ustrukturertAdresse
        };
    } else {
        return {
            endringsinfo: getEndringsinfo(),
            gateadresse: tilfeldigGateadresse(periode)
        };
    }

}

function getEndringsinfo(): Endringsinfo {
    return {
        sistEndret: getSistOppdatert(),
        sistEndretAv: FOLKEREGISTERET
    };
}
