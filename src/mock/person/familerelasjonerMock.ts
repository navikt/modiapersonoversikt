import FakerStatic = Faker.FakerStatic;
import * as moment from 'moment';

import { getPersonstatus } from './personMock';
import { Familierelasjon, Relasjonstype, Sivilstand, SivilstandTyper } from '../../models/person';
import { vektetSjanse } from '../utils/mock-utils';
import { getFodselsdato, seededTilfeldigFodselsnummer } from '../utils/fnr-utils';

export function getFamilierelasjoner(faker: FakerStatic, alder: number, sivilstand: Sivilstand) {
    let relasjoner: Familierelasjon[] = [];
    if (alder >= 18) {
        relasjoner = relasjoner.concat(getMockBarn(faker, alder));
    }

    if (sivilstand.value === SivilstandTyper.Gift) {
        relasjoner.push(lagPartner(faker, Relasjonstype.Ektefelle));
    } else if (sivilstand.value === SivilstandTyper.Samboer) {
        relasjoner.push(lagPartner(faker, Relasjonstype.Samboer));
    }

    return relasjoner;
}

function getMockBarn(faker: FakerStatic, foreldresAlder: number) {
    const antallBarn = kalkulerAntallBarn(faker, foreldresAlder);
    let barn = [];
    for (let i =  0; i < antallBarn; i++) {
        barn.push(lagBarn(faker, foreldresAlder));
    }
    return barn;
}

function kalkulerAntallBarn(faker: FakerStatic, foreldresAlder: number) {
    const maksAntallBarn = foreldresAlder - 18;
    if (vektetSjanse(faker, 0.05)) {
        return faker.random.number({min: 0, max: Math.min(maksAntallBarn, 15)});
    } else if (vektetSjanse(faker, 0.75)) {
        return faker.random.number(Math.min(maksAntallBarn, 5));
    }
    return 0;
}

function lagBarn(faker: FakerStatic, foreldresAlder: number): Familierelasjon {
    const maxAlder = foreldresAlder - 18;
    const minAlder = Math.max(foreldresAlder - 50, 0);
    const barnetsFødselsnummer = seededTilfeldigFodselsnummer(faker, minAlder, maxAlder);
    const alder = moment().diff(getFodselsdato(barnetsFødselsnummer), 'years');

    return {
        harSammeBosted: vektetSjanse(faker, 0.7),
        rolle: Relasjonstype.Barn,
        tilPerson: {
            navn: lagNavn(faker),
            alder: alder,
            fødselsnummer: barnetsFødselsnummer,
            personstatus: getPersonstatus(alder)
        },
    };
}

function lagPartner(faker: FakerStatic, relasjonstype: Relasjonstype): Familierelasjon {
    const partnersFødslesnummer = seededTilfeldigFodselsnummer(faker, 18, 100);
    const alder = moment().diff(getFodselsdato(partnersFødslesnummer), 'years');
    return {
        harSammeBosted: vektetSjanse(faker, 0.9),
        rolle: relasjonstype,
        tilPerson: {
            navn: lagNavn(faker),
            alder: alder,
            fødselsnummer: partnersFødslesnummer,
            personstatus: getPersonstatus(alder)
        }
    };
}

function lagNavn(faker: FakerStatic) {
    const fornavn = faker.name.firstName();
    const etternavn = faker.name.lastName();
    const mellomnavn = '';

    return {
        fornavn: fornavn,
        etternavn: etternavn,
        mellomnavn: mellomnavn,
        sammensatt: `${fornavn} ${mellomnavn} ${etternavn}`
    };
}