import * as faker from 'faker/locale/nb_NO';

import { Bankkonto } from '../../models/person';
import { getSistOppdatert, vektetSjanse } from '../utils/mock-utils';

export const bankkontoNorsk: Bankkonto = {
    erNorskKonto: true,
    bank: 'Nordea ASA',
    kontonummer: Number(faker.finance.account(11)),
    sistEndretAv: '1010800 BD03',
    sistEndret: getSistOppdatert(),
};

export const bankkontoUtland: Bankkonto = {
    erNorskKonto: false,
    bank: 'BBVA',
    kontonummer: Number(faker.finance.account(9)),
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
