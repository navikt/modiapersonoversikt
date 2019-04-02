import moment from 'moment';

import navfaker from 'nav-faker';

import { tilfeldigFodselsnummer } from '../../../utils/fnr-utils';
import { getPersonstatus } from '../../personMock';
import { lagNavn } from '../../../utils/person-utils';
import { getAlderFromFødselsnummer } from '../../../../utils/dateUtils';
import { Familierelasjon, Relasjonstype } from '../../../../models/person/person';

export function mockBarn(foreldresFødselsnummer: string) {
    navfaker.seed(foreldresFødselsnummer);
    const foreldresFødseldato = navfaker.personIdentifikator.getFødselsdato(foreldresFødselsnummer);
    const alder = moment().diff(foreldresFødseldato, 'years');
    const antallBarn = kalkulerAntallBarn(alder);

    let barn = [];
    for (let i = 0; i < antallBarn; i++) {
        barn.push(lagBarn(alder));
    }
    return barn;
}

function kalkulerAntallBarn(foreldresAlder: number) {
    const maksAntallBarn = foreldresAlder - 18;
    if (navfaker.random.vektetSjanse(0.05)) {
        return navfaker.random.integer(Math.min(maksAntallBarn, 15), 0);
    } else if (navfaker.random.vektetSjanse(0.75)) {
        return navfaker.random.integer(Math.min(maksAntallBarn, 5));
    }
    return 0;
}

function lagBarn(foreldresAlder: number): Familierelasjon {
    const barnetsFødelsdato = getBarnetsAlder(foreldresAlder);
    const barnetsFødselsnummer = tilfeldigFodselsnummer(barnetsFødelsdato);
    const alder = getAlderFromFødselsnummer(barnetsFødselsnummer);
    return {
        harSammeBosted: navfaker.random.vektetSjanse(0.7),
        rolle: Relasjonstype.Barn,
        tilPerson: {
            navn: lagNavn(barnetsFødselsnummer),
            alder: alder,
            alderMåneder: alder > 0 ? alder * 12 + 1 : 3,
            fødselsnummer: barnetsFødselsnummer,
            personstatus: getPersonstatus(alder)
        }
    };
}

function getBarnetsAlder(foreldresAlder: number) {
    const maxAlder = foreldresAlder - 18;
    const minAlder = Math.max(foreldresAlder - 50, 0);
    return navfaker.dato.mellom(navfaker.dato.forÅrSiden(maxAlder), navfaker.dato.forÅrSiden(minAlder));
}
