import * as faker from 'faker/locale/nb_NO';

import { Bankkonto } from '../../models/person/person';
import { getSistOppdatert, vektetSjanse } from '../utils/mock-utils';

export const bankkontoNorsk: Bankkonto = {
    banknavn: 'Nordea ASA',
    kontonummer: Number(faker.finance.account(11)).toString(),
    sistEndretAv: '1010800 BD03',
    sistEndret: getSistOppdatert(),
};

export const bankkontoUtland: Bankkonto = {
    banknavn: 'BBVA',
    kontonummer: Number(faker.finance.account(9)).toString(),
    swift: faker.finance.bic(),
    landkode: { kodeRef: faker.address.countryCode(), beskrivelse: faker.address.country() },
    valuta: { kodeRef: faker.finance.currencyCode(), beskrivelse: faker.finance.currencyName() },
    adresse: {
        linje1: faker.address.streetAddress(),
        linje2: faker.address.zipCode('##### ') + faker.address.county(),
        linje3: ''
    },
    sistEndretAv: '1010800 BD03',
    sistEndret: getSistOppdatert(),
};

export function getBankKonto(): Bankkonto | undefined {
    if (vektetSjanse(faker, 0.7)) {
        return bankkontoNorsk;
    } else if (vektetSjanse(faker, 0.2)) {
        return bankkontoUtland;
    } else {
        return undefined;
    }
}
