import * as faker from 'faker/locale/nb_NO';

import { Kontaktinformasjon } from '../models/kontaktinformasjon';
import { aremark, getPerson } from './person-mock';
import { vektetSjanse } from './utils';
import { Person } from '../models/person';

export function getKontaktinformasjon(fødselsnummer: string): Kontaktinformasjon {
    if (fødselsnummer === aremark.fødselsnummer) {
        return {
            reservert: undefined,
            epost: {
                value: 'aremark@testfamilien.no',
                sistOppdatert: getSistOppdatert()
            },
            mobiltelefon: {
                value: '11223344',
                sistOppdatert: getSistOppdatert()
            }
        };
    } else {
        const personData = getPerson(fødselsnummer);
        faker.seed(Number(fødselsnummer));
        return {
            epost: vektetSjanse(faker, 0.7) ? getEpost(personData) : undefined,
            mobiltelefon: vektetSjanse(faker, 0.7) ? getMobiltelefon() : undefined,
            reservert: vektetSjanse(faker, 0.7) ? undefined : 'Reservert'
        };
    }
}

function getEpost(personData: Person) {
    return {
        value: faker.internet.email(personData.navn.fornavn, personData.navn.etternavn),
        sistOppdatert: getSistOppdatert()
    };
}

function getMobiltelefon() {
    return {
        value: faker.phone.phoneNumber('9#######'),
        sistOppdatert: getSistOppdatert()
    };
}

function getSistOppdatert() {
    return '27.12.12';
}
