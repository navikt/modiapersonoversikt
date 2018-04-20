import FakerStatic = Faker.FakerStatic;
import { getPerson } from './personMock';
import { Familierelasjon, Relasjonstype, Sivilstand, SivilstandTyper } from '../../models/person';
import { vektetSjanse } from '../utils/mock-utils';
import { seededTilfeldigFodselsnummer } from '../utils/fnr-utils';

export function getFamilierelasjoner(faker: FakerStatic, alder: number, sivilstand: Sivilstand) {
    let relasjoner: Familierelasjon[] = [];
    if (alder >= 18) {
        relasjoner = relasjoner.concat(getMockBarn(faker, alder));
    }

    if (sivilstand.value === SivilstandTyper.Gift) {
        relasjoner.push(lagEktefelle(faker));
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
    const barnet = getPerson(seededTilfeldigFodselsnummer(faker, minAlder, maxAlder));
    return {
        harSammeBosted: vektetSjanse(faker, 0.7),
        rolle: Relasjonstype.Barn,
        tilPerson: {
            navn: barnet.navn,
            alder: barnet.alder,
            fødselsnummer: barnet.fødselsnummer,
            personstatus: barnet.personstatus
        },
    };
}

function lagEktefelle(faker: FakerStatic): Familierelasjon {
    const ektefelle = getPerson(seededTilfeldigFodselsnummer(faker, 18, 100));
    return {
        harSammeBosted: vektetSjanse(faker, 0.9),
        rolle: Relasjonstype.Ektefelle,
        tilPerson: {
            navn: ektefelle.navn,
            alder: ektefelle.alder,
            fødselsnummer: ektefelle.fødselsnummer,
            personstatus: ektefelle.personstatus
        }
    };
}