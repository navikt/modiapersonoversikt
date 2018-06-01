import * as faker from 'faker/locale/nb_NO';

import { ApningsTid, NavKontor, PublikumsMottak } from '../models/navkontor';
import { tilfeldigGateadresse } from './person/adresseMock';
import { Gateadresse } from '../models/personadresse';

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

const aremarkGateadresse: Gateadresse = {
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
    const adresse = tilfeldigGateadresse(false);
    adresse.poststed = city.toUpperCase();
    return {
        besoksadresse: adresse,
        apningstider: mockApningsTider
    };
}
