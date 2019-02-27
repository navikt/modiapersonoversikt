import faker from 'faker/locale/nb_NO';

import {
    Endringsinfo,
    Gateadresse,
    Matrikkeladresse,
    Personadresse,
    Postboksadresse,
    UstrukturertAdresse,
    Utlandsadresse
} from '../../models/personadresse';
import { getSistOppdatert, vektetSjanse } from '../utils/mock-utils';
import { getPeriode } from './periodeMock';
import { FOLKEREGISTERET } from '../../utils/endretAvUtil';
import { mockLandKodeverk } from '../kodeverk/land-kodeverk-mock';
import { Kodeverk } from '../../models/kodeverk';

export const tilfeldigGateadresse = (adresseSkalHaPeriode: boolean): Gateadresse => {
    return {
        tilleggsadresse: vektetSjanse(faker, 0.1) ? faker.address.secondaryAddress().toUpperCase() : undefined,
        gatenavn: tilfeldigGatenavn(),
        husnummer: String(faker.random.number(120)),
        postnummer: faker.address.zipCode('####'),
        poststed: faker.address.city().toUpperCase(),
        periode: adresseSkalHaPeriode ? getPeriode() : undefined
    };
};

function tilfeldigGatenavn() {
    return faker.address
        .streetName()
        .replace(' ', '')
        .toUpperCase();
}

const tilfeldigMatrikkeladresse = (folkeregistrertAdresse: boolean): Matrikkeladresse => {
    return {
        eiendomsnavn: tilfeldigGatenavn() + ' GÅRD',
        postnummer: faker.address.zipCode('####'),
        poststed: faker.address.city().toUpperCase(),
        periode: folkeregistrertAdresse ? getPeriode() : undefined
    };
};

function getRandomLand(): Kodeverk {
    const landKodeverk = mockLandKodeverk().kodeverk;
    return landKodeverk[faker.random.number(landKodeverk.length - 1)];
}

const tilfeldigUtlandsadresse = (folkeregistrertAdresse: boolean): Utlandsadresse => {
    return {
        landkode: getRandomLand(),
        adresselinjer: [faker.address.streetAddress().toUpperCase(), faker.address.city()],
        periode: folkeregistrertAdresse ? getPeriode() : undefined
    };
};

const tilfeldigPostboksadresse = (folkeregistrertAdresse: boolean): Postboksadresse => {
    return {
        postboksnummer: faker.address.zipCode('####'),
        postnummer: faker.address.zipCode('####'),
        poststed: faker.address.city().toUpperCase(),
        periode: folkeregistrertAdresse ? getPeriode() : undefined
    };
};

const ustrukturertAdresse: UstrukturertAdresse = {
    adresselinje: 'STORGATA 1, 9876 NARVIK'
};

function getTilfeldigAdresse(adresseSkalHaPeriode: boolean): Personadresse {
    if (vektetSjanse(faker, 0.2)) {
        return {
            endringsinfo: getEndringsinfo(),
            matrikkeladresse: tilfeldigMatrikkeladresse(adresseSkalHaPeriode)
        };
    } else if (vektetSjanse(faker, 0.2)) {
        return {
            endringsinfo: getEndringsinfo(),
            utlandsadresse: tilfeldigUtlandsadresse(adresseSkalHaPeriode)
        };
    } else if (vektetSjanse(faker, 0.2)) {
        return {
            endringsinfo: getEndringsinfo(),
            postboksadresse: tilfeldigPostboksadresse(adresseSkalHaPeriode)
        };
    } else if (vektetSjanse(faker, 0.2)) {
        return {
            endringsinfo: getEndringsinfo(),
            ustrukturert: ustrukturertAdresse
        };
    } else {
        return {
            endringsinfo: getEndringsinfo(),
            gateadresse: tilfeldigGateadresse(adresseSkalHaPeriode)
        };
    }
}

export function getTilfeldigFolkeregistrertAdresse() {
    const adresseSkalHaPeriode = false;
    return getTilfeldigAdresse(adresseSkalHaPeriode);
}

export function getTilfeldigAdresseMedPeriode() {
    const adresseSkalHaPeriode = true;
    return getTilfeldigAdresse(adresseSkalHaPeriode);
}

function getEndringsinfo(): Endringsinfo {
    return {
        sistEndret: getSistOppdatert(),
        sistEndretAv: FOLKEREGISTERET
    };
}
