import * as faker from 'faker/locale/nb_NO';

import { ApningsTid, NavKontor, PublikumsMottak } from '../models/navkontor';
import { GateAdresse } from '../models/gateadresse';
import { vektetSjanse } from './utils/mock-utils';

export const geografiskTilknytningAremark = '0118';
const apentFra = { time: '9', minutt: '0', sekund: '0' };
const apentTil = { time: '14', minutt: '30', sekund: '0' };

const mockApningsTider: Array<ApningsTid> = [{
    ukedag: 'MANDAG',
    apentFra,
    apentTil
}, {
    ukedag: 'TIRSDAG',
    apentFra,
    apentTil
}, {
    ukedag: 'ONSDAG',
    apentFra,
    apentTil
}, {
    ukedag: 'TORSDAG',
    apentFra,
    apentTil
}, {
    ukedag: 'FREDAG',
    apentFra,
    apentTil
}];

const aremarkGateadresse: GateAdresse = {
    gatenavn: 'Rådhuset',
    husnummer: '6',
    husbokstav: 'A',
    postnummer: '1798',
    poststed: 'Aremark'
};

const mockKontaktInfo: PublikumsMottak = {
    besoksadresse: aremarkGateadresse,
    apningstider: mockApningsTider
};

export function getMockNavKontor(geografiskTilknytning: string, diskresjonskode?: string): NavKontor {
    faker.seed(Number(geografiskTilknytning));
    if (diskresjonskode) {
        return {
            enhetNavn: 'NAV Norge',
            enhetId: '9999',
            publikumsmottak: []
        };
    }

    if (geografiskTilknytning === geografiskTilknytningAremark) {
        return {
            enhetNavn: 'NAV Aremark',
            enhetId: geografiskTilknytning,
            publikumsmottak: [ mockKontaktInfo ]
        };
    } else {
        const city = faker.address.city();
        return {
            enhetNavn: 'NAV ' + city,
            enhetId: geografiskTilknytning,
            publikumsmottak: [getPublikumsmottak(city), getPublikumsmottak(city)]
        };
    }
}

function getPublikumsmottak(city: string) {
    return {
        besoksadresse: getGateadresse(city),
        apningstider: mockApningsTider
    };
}

function getGateadresse(city: string): GateAdresse {
    return {
        gatenavn: faker.address.streetName().replace(' ', ''),
        husnummer: String(faker.random.number(130)),
        husbokstav: vektetSjanse(faker, 0.7) ? undefined : faker.random.alphaNumeric(1),
        postnummer: faker.address.zipCode('####'),
        poststed: city
    };
}