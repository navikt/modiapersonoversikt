import FakerStatic = Faker.FakerStatic;
import { getPerson } from './personMock';
import { Familierelasjon, Relasjonstype } from '../../models/person';
import { vektetSjanse } from '../utils/mock-utils';
import { seededTilfeldigFodselsnummer } from '../utils/fnr-utils';

export function getFamilierelasjoner(faker: FakerStatic, foreldresAlder: number) {
    let relasjoner: Familierelasjon[] = [];
    if (foreldresAlder >= 18) {
        relasjoner = relasjoner.concat(getMockBarn(faker, foreldresAlder));
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
    const barnet = getPerson(seededTilfeldigFodselsnummer(faker, maxAlder));
    return {
        harSammeBosted: vektetSjanse(faker, 0.7),
        rolle: Relasjonstype.Barn,
        tilPerson: {
            navn: barnet.navn,
            alder: barnet.alder,
            fødselsnummer: barnet.fødselsnummer
        }
    };
}