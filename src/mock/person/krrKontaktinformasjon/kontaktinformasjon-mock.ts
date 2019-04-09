import faker from 'faker/locale/nb_NO';

import navfaker from 'nav-faker';

import { KRRKontaktinformasjon } from '../../../models/kontaktinformasjon';
import { getPerson } from '../personMock';
import { erPersonResponsAvTypePerson, Person } from '../../../models/person/person';
import { aremark } from '../aremark';
import { getSistOppdatert } from '../../utils/mock-utils';
import { moss } from '../moss';

const aremarkKontaktinformasjon: KRRKontaktinformasjon = {
    reservasjon: null,
    epost: {
        value: 'aremark@testfamilien.no',
        sistOppdatert: '2014-05-15T11:32:43+02:00'
    },
    mobiltelefon: {
        value: '11223344',
        sistOppdatert: '2014-05-15T11:32:43+02:00'
    }
};

const mossKontaktinformasjon: KRRKontaktinformasjon = {
    reservasjon: null,
    epost: null,
    mobiltelefon: null
};

export function getMockKontaktinformasjon(fødselsnummer: string): KRRKontaktinformasjon {
    if (fødselsnummer === aremark.fødselsnummer) {
        return aremarkKontaktinformasjon;
    }
    if (fødselsnummer === moss.fødselsnummer) {
        return mossKontaktinformasjon;
    }
    const personData = getPerson(fødselsnummer);
    if (!erPersonResponsAvTypePerson(personData)) {
        return {
            reservasjon: null,
            epost: null,
            mobiltelefon: null
        };
    }

    return {
        epost: navfaker.random.vektetSjanse(0.7) ? getEpost(personData) : null,
        mobiltelefon: navfaker.random.vektetSjanse(0.7) ? getMobiltelefon() : null,
        reservasjon: navfaker.random.vektetSjanse(0.7) ? null : 'true'
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
