import FakerStatic = Faker.FakerStatic;

import { datoForÅrSiden, vektetSjanse } from '../../../utils/mock-utils';
import { tilfeldigFodselsnummer } from '../../../utils/fnr-utils';
import { getPersonstatus } from '../../personMock';
import { lagNavn } from '../../../utils/person-utils';
import { getAlderFromFødselsnummer } from '../../../../utils/dateUtils';
import { Familierelasjon, Relasjonstype } from '../../../../models/person/person';
import navfaker from 'nav-faker';

export function getMockBarn(faker: FakerStatic, foreldresAlder: number) {
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
    const barnetsFødelsdato = navfaker.dato.mellom(datoForÅrSiden(maxAlder), datoForÅrSiden(minAlder));
    const barnetsFødselsnummer = tilfeldigFodselsnummer(barnetsFødelsdato);
    const alder = getAlderFromFødselsnummer(barnetsFødselsnummer);
    return {
        harSammeBosted: vektetSjanse(faker, 0.7),
        rolle: Relasjonstype.Barn,
        tilPerson: {
            navn: lagNavn(faker),
            alder: alder,
            alderMåneder: alder > 0 ? alder * 12 + 1 : 3,
            fødselsnummer: barnetsFødselsnummer,
            personstatus: getPersonstatus(alder)
        },
    };
}