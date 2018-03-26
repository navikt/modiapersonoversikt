import * as faker from 'faker/locale/nb_NO';

import { Person } from '../models/person';

export const aremark = {
    fornavn: 'Aremark',
    etternavn: 'Testfamilien',
    fodselsnummer: '10108000398'
};

export function getPerson(fodselsnummer: string): Person {
    if (fodselsnummer === aremark.fodselsnummer) {
        return aremark;
    } else {
        faker.seed(Number(fodselsnummer));
        return getTilfeldigPerson(fodselsnummer);
    }
}

function getTilfeldigPerson(fodselsnummer: string): Person {
    return {
        fodselsnummer: fodselsnummer,
        fornavn: getFornavn(fodselsnummer),
        etternavn: faker.name.lastName()
    };
}

function getFornavn(fodselsnummer: string): string {
    if (Number(fodselsnummer.charAt(8)) % 2 === 0 ) {
        return faker.name.firstName(1);
    } else {
        return faker.name.firstName(0);
    }
}
