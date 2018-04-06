import * as faker from 'faker/locale/nb_NO';
const rand = require('random-seed');

import { Person } from '../models/person';
import { Diskresjonskoder } from '../constants';

function erMann(fødselsnummer: string) {
    return Number(fødselsnummer.charAt(8)) % 2 === 1;
}

export const aremark: Person = {
    fødselsnummer: '10108000398',
    kjønn: 'M',
    geografiskTilknytning: '0118',
    alder: 42,
    navn: {
        sammensatt: 'AREMARK TESTFAMILIEN',
        fornavn: 'AREMARK',
        mellomnavn: '',
        etternavn: 'TESTFAMILIEN',
    },
    diskresjonskode: Diskresjonskoder.FORTROLIG_ADRESSE,
    kontaktinformasjon: {
        epost: 'aremark@hotmail.com'
    }
};

export function getPerson(fødselsnummer: string): Person {
    if (fødselsnummer === aremark.fødselsnummer) {
        return aremark;
    } else {
        faker.seed(Number(fødselsnummer));
        return getTilfeldigPerson(fødselsnummer);
    }
}

function getTilfeldigPerson(fødselsnummer: string): Person {
    const fornavn = getFornavn(fødselsnummer);
    const etternavn = faker.name.lastName();
    const mellomnavn = '';
    return {
        fødselsnummer: fødselsnummer,
        kjønn: erMann(fødselsnummer) ? 'M' : 'K',
        geografiskTilknytning: '0118',
        alder: rand.create(fødselsnummer)(100),
        navn: {
            fornavn: fornavn,
            etternavn: etternavn,
            mellomnavn: mellomnavn,
            sammensatt: `${fornavn} ${mellomnavn} ${etternavn}`
        },
        diskresjonskode: getDiskresjonskode(fødselsnummer),
        kontaktinformasjon: {
            epost: getEpost(fødselsnummer, fornavn, etternavn)
        }
    };
}

function getDiskresjonskode(fødselsnummer: string) {
    if (tilfeldigSjanse(fødselsnummer, 10)) {
        return Diskresjonskoder.FORTROLIG_ADRESSE;
    } else if (tilfeldigSjanse(fødselsnummer, 10)) {
        return Diskresjonskoder.STRENGT_FORTROLIG_ADRESSE;
    } else {
        return undefined;
    }
}

function getEpost(fødselsnummer: string, fornavn: string, etternavn: string) {
    if (tilfeldigSjanse(fødselsnummer, 80)) {
        return faker.internet.email(fornavn, etternavn);
    }
    return undefined;
}

function getFornavn(fødselsnummer: string): string {
    if (Number(fødselsnummer.charAt(8)) % 2 === 0 ) {
        return faker.name.firstName(1);
    } else {
        return faker.name.firstName(0);
    }
}

function tilfeldigSjanse(fødselsnummer: string, sjanseFor: Number) {
    const randomNumber = rand.create(fødselsnummer)(100);
    return randomNumber <= sjanseFor;
}