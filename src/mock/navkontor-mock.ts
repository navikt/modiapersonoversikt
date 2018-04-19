import * as faker from 'faker/locale/nb_NO';

import { ApningsTid, NavKontor, PublikumsMottak } from '../models/navkontor';
import { GateAdresse } from '../models/gateadresse';
import { vektetSjanse } from './utils/mock-utils';

export const geografiskTilknytningAremark = '0118';

const mockApningsTider: Array<ApningsTid> = [{
    ukedag: 'MANDAG',
    apentFra: { time: '9', minutt: '0', sekund: '0' },
    apentTil: { time: '14', minutt: '30', sekund: '0' }
}, {
    ukedag: 'TIRSDAG',
    apentFra: { time: '9', minutt: '0', sekund: '0' },
    apentTil: { time: '14', minutt: '30', sekund: '0' }
}, {
    ukedag: 'ONSDAG',
    apentFra: { time: '9', minutt: '0', sekund: '0' },
    apentTil: { time: '14', minutt: '30', sekund: '0' }
}, {
    ukedag: 'TORSDAG',
    apentFra: { time: '9', minutt: '0', sekund: '0' },
    apentTil: { time: '14', minutt: '30', sekund: '0' }
}, {
    ukedag: 'FREDAG',
    apentFra: { time: '9', minutt: '0', sekund: '0' },
    apentTil: { time: '14', minutt: '30', sekund: '0' }
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

export function getMockNavKontor(geografiskTilknytning: string): NavKontor {
    faker.seed(Number(geografiskTilknytning));
    if (geografiskTilknytning === geografiskTilknytningAremark) {
        return {
            enhetNavn: 'Nav Aremark',
            enhetId: geografiskTilknytning,
            publikumsmottak: [ mockKontaktInfo ]
        };
    } else {
        const city = faker.address.city();
        return {
            enhetNavn: 'NAV ' + city,
            enhetId: geografiskTilknytning,
            publikumsmottak: [getPublikumsmottak(city)]
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