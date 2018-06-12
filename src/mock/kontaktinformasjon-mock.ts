import * as faker from 'faker/locale/nb_NO';
import * as moment from 'moment';

import { Kontaktinformasjon } from '../models/kontaktinformasjon';
import { getPerson } from './person/personMock';
import { Person, PersonRespons } from '../models/person/person';
import { aremark } from './person/aremark';
import { vektetSjanse } from './utils/mock-utils';
import { erPersonResponsAvTypePerson } from '../models/person/person';

const aremarkKontaktinformasjon = {
    reservert: undefined,
    epost: {
        value: 'aremark@testfamilien.no',
        sistOppdatert: '2014-05-15T11:32:43+02:00'
    },
    mobiltelefon: {
        value: '11223344',
        sistOppdatert: '2014-05-15T11:32:43+02:00'
    }
};

export function getMockKontaktinformasjon(fødselsnummer: string): Kontaktinformasjon {
    if (fødselsnummer === aremark.fødselsnummer) {
        return aremarkKontaktinformasjon;
    }
    const personData = getPerson(fødselsnummer);
    faker.seed(Number(fødselsnummer));
    return {
        epost: vektetSjansePerson(0.7, personData) ? getEpost(personData as Person) : undefined,
        mobiltelefon: vektetSjansePerson(0.7, personData) ? getMobiltelefon() : undefined,
        reservasjon: vektetSjanse(faker, 0.7) ? undefined : 'true'
    };
}

function vektetSjansePerson(vekt: number, person: PersonRespons) {
    return vektetSjanse(faker, vekt) && erPersonResponsAvTypePerson(person);
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
