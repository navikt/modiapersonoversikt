import * as faker from 'faker/locale/nb_NO';
import * as moment from 'moment';

import { Kontaktinformasjon } from '../models/kontaktinformasjon';
import { getPerson } from './person/personMock';
import { Person } from '../models/person/person';
import { aremark } from './person/aremark';
import { vektetSjanse } from './utils/mock-utils';

const aremarkKontaktinformasjon = {
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

export function getMockKontaktinformasjon(fødselsnummer: string): Kontaktinformasjon {
    if (fødselsnummer === aremark.fødselsnummer) {
        return aremarkKontaktinformasjon;
    }
    const personData = getPerson(fødselsnummer);
    faker.seed(Number(fødselsnummer));
    return {
        epost: vektetSjanse(faker, 0.7) ? getEpost(personData) : undefined,
        mobiltelefon: vektetSjanse(faker, 0.7) ? getMobiltelefon() : undefined,
        reservert: vektetSjanse(faker, 0.7) ? undefined : 'Reservert'
    };
}

function getEpost(personData: Person) {
    const fornavn = personData.navn.fornavn || '';
    const etternavn = personData.navn.etternavn || '';
    return {
        value: faker.internet.email(fornavn, etternavn),
        sistOppdatert: getSistOppdatert()
    };
}

function getMobiltelefon() {
    return {
        value: faker.phone.phoneNumber('+479#######'),
        sistOppdatert: getSistOppdatert()
    };
}

function getSistOppdatert() {
    return moment(faker.date.past(5)).format(moment.ISO_8601.__momentBuiltinFormatBrand);
}
