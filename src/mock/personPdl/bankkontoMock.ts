import faker from 'faker/locale/nb_NO';

import { Bankkonto } from '../../models/personPdl/bankkonto';
import { getSistOppdatert, vektetSjanse } from '../utils/mock-utils';

export const bankkontoNorsk: Bankkonto = {
    kontonummer: Number(faker.finance.account(11)).toString(),
    banknavn: 'Nordea ASA',
    sistEndret: new Date(getSistOppdatert()),
    sistEndretAv: '1010800 BD03',

    bankkode: null,
    swift: faker.finance.bic(),
    landkode: null,
    adresse: {
        linje1: faker.address.streetAddress(),
        linje2: faker.address.zipCode('####') + faker.address.county(),
        linje3: null
    },
    valuta: {
        kode: 'NOK',
        beskrivelse: 'Norske kroner'
    }
};

export const bankkontoUtland: Bankkonto = {
    kontonummer: Number(faker.finance.account(9)).toString(),
    banknavn: 'BBVA',
    sistEndret: new Date(getSistOppdatert()),
    sistEndretAv: '1010800 BD03',
    swift: faker.finance.bic(),
    bankkode: null,
    landkode: {
        kode: faker.address.countryCode(),
        beskrivelse: faker.address.county()
    },
    adresse: {
        linje1: faker.address.streetAddress(),
        linje2: faker.address.zipCode('##### ') + faker.address.county(),
        linje3: null
    },
    valuta: {
        kode: faker.finance.currencyCode(),
        beskrivelse: faker.finance.currencyName()
    }
};

export function getBankKonto(): Bankkonto | null {
    if (vektetSjanse(faker, 0.7)) {
        return bankkontoNorsk;
    } else if (vektetSjanse(faker, 0.2)) {
        return bankkontoUtland;
    } else {
        return null;
    }
}
