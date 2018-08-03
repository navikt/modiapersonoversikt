import * as faker from 'faker/locale/nb_NO';

import navfaker from 'nav-faker';

import { KRRKontaktinformasjon } from '../../../models/kontaktinformasjon';
import { getPerson } from '../personMock';
import { erPersonResponsAvTypePerson, Person } from '../../../models/person/person';
import { aremark } from '../aremark';
import { getSistOppdatert } from '../../utils/mock-utils';

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

export function getMockKontaktinformasjon(fødselsnummer: string): KRRKontaktinformasjon {
    if (fødselsnummer === aremark.fødselsnummer) {
        return aremarkKontaktinformasjon;
    }
    const personData = getPerson(fødselsnummer);
    if (!erPersonResponsAvTypePerson(personData)) {
        return {};
    }

    return {
        epost: navfaker.random.vektetSjanse(0.7) ? getEpost(personData) : undefined,
        mobiltelefon: navfaker.random.vektetSjanse(0.7) ? getMobiltelefon() : undefined,
        reservasjon: navfaker.random.vektetSjanse(0.7) ? undefined : 'true'
    };
}

function getEpost(personData: Person) {
    const fornavn = personData.navn.fornavn || '';
    const etternavn = personData.navn.etternavn || '';
    return {
        value: faker.internet.email(fornavn.toLowerCase(), etternavn.toLowerCase()),
        sistOppdatert: getSistOppdatert()
    };
}

function getMobiltelefon() {
    return {
        value: faker.phone.phoneNumber('+479#######'),
        sistOppdatert: getSistOppdatert()
    };
}
