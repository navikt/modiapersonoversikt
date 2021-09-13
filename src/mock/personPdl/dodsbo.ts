import { fyllRandomListe, vektetSjanse } from '../utils/mock-utils';
import {
    Dodsbo,
    Adressat,
    AdvokatSomAdressat,
    PersonSomAdressat,
    OrganisasjonSomAdressat,
    Skifteform
} from '../../models/personPdl/dodsbo';
import { Navn } from '../../models/personPdl/person';

export function getMockDodsbo(faker: Faker.FakerStatic): Dodsbo[] {
    return fyllRandomListe<Dodsbo>(() => mockDodsbo(faker), 2, false);
}

function mockDodsbo(faker: Faker.FakerStatic): Dodsbo {
    return {
        adressat: mockAdressat(faker),
        adresse: {
            linje1: `${faker.address.streetAddress()} ${faker.address.city()} ${faker.address.zipCode('####')}`,
            linje2: null,
            linje3: null
        },
        registrert: new Date('2020-02-02'),
        skifteform: Skifteform.Offentlig
    };
}

function mockAdressat(faker: Faker.FakerStatic): Adressat {
    if (vektetSjanse(faker, 0.2)) {
        return {
            advokatSomAdressat: mockAdvokatSomAdressat(faker),
            organisasjonSomAdressat: null,
            personSomAdressat: null
        };
    } else if (vektetSjanse(faker, 0.2)) {
        return {
            organisasjonSomAdressat: mockOrganisasjonSomAdressat(faker),
            advokatSomAdressat: null,
            personSomAdressat: null
        };
    } else {
        return {
            advokatSomAdressat: null,
            organisasjonSomAdressat: null,
            personSomAdressat: mockPersonSomAdressat(faker)
        };
    }
}

function mockAdvokatSomAdressat(faker: Faker.FakerStatic): AdvokatSomAdressat {
    return {
        kontaktperson: mockPersonnavn(faker),
        organisasjonsnavn: faker.company.companyName(),
        organisasjonsnummer: `${faker.random.number()}`
    };
}

function mockOrganisasjonSomAdressat(faker: Faker.FakerStatic): OrganisasjonSomAdressat {
    return {
        kontaktperson: mockPersonnavn(faker),
        organisasjonsnavn: faker.company.companyName(),
        organisasjonsnummer: `${faker.random.number()}`
    };
}

function mockPersonSomAdressat(faker: Faker.FakerStatic): PersonSomAdressat {
    return {
        fnr: '10.10.1980',
        navn: mockPersonnavn(faker),
        fodselsdato: new Date('1980-10-10')
    };
}

export function mockPersonnavn(faker: Faker.FakerStatic): Navn {
    return {
        fornavn: faker.name.firstName(),
        etternavn: faker.name.lastName(),
        mellomnavn: null
    };
}
