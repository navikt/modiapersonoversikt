import * as faker from 'faker/locale/nb_NO';

import { Bankkonto, Person } from '../models/person';
import { Diskresjonskoder } from '../constants';
import { vektetSjanse } from './utils';
import * as moment from 'moment';

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
    diskresjonskode: Diskresjonskoder.FORTROLIG_ADRESSE
};

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
        geografiskTilknytning: getGeografiskTilknytning(),
        alder: faker.random.number(100),
        navn: {
            fornavn: fornavn,
            etternavn: etternavn,
            mellomnavn: mellomnavn,
            sammensatt: `${fornavn} ${mellomnavn} ${etternavn}`
        },
        diskresjonskode: getDiskresjonskode(),
        bankkonto: getBankKonto()
    };
}

function getBankKonto(): Bankkonto | undefined {
    if (vektetSjanse(faker, 0.7)) {
        return bankkontoNorsk;
    } else if (vektetSjanse(faker, 0.2)) {
        return bankkontoUtland;
    } else {
        return undefined;
    }
}

function getDiskresjonskode() {
    if (vektetSjanse(faker, 0.1)) {
        return Diskresjonskoder.FORTROLIG_ADRESSE;
    } else if (vektetSjanse(faker, 0.1)) {
        return Diskresjonskoder.STRENGT_FORTROLIG_ADRESSE;
    } else {
        return undefined;
    }
}

function getFornavn(fødselsnummer: string): string {
    if (Number(fødselsnummer.charAt(8)) % 2 === 0 ) {
        return faker.name.firstName(1);
    } else {
        return faker.name.firstName(0);
    }
}

function getGeografiskTilknytning() {
    if (vektetSjanse(faker, 0.8)) {
        return String(faker.random.number(9999));
    } else {
        return undefined;
    }
}

function getSistOppdatert() {
    return moment(faker.date.past(5)).format(moment.ISO_8601.__momentBuiltinFormatBrand);
}