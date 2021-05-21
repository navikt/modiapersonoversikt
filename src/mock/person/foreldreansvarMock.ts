import { aremark } from './aremark';
import faker from 'faker/locale/nb_NO';
import navfaker from 'nav-faker';
import { vektetSjanse } from '../utils/mock-utils';
import { Foreldreansvar } from '../../models/foreldreansvar/foreldreansvar';
import { mockPersonnavn } from './doedsbo';

export function mockVergemal(fødselsnummer: string) {
    if (fødselsnummer === aremark.fødselsnummer) {
        return getAremarkForeldreansvar();
    }
    faker.seed(Number(fødselsnummer));
    navfaker.seed(fødselsnummer);
    if (vektetSjanse(faker, 0.7)) {
        return {};
    }
    return getForeldreansvar();
}

function getForeldreansvar(): Foreldreansvar {
    return {
        ansvar: getTilfeldigAnsvar(),
        ansvarlig: mockPersonnavn(faker),
        ansvarssubjekt: mockPersonnavn(faker)
    };
}

function getAremarkForeldreansvar(): Foreldreansvar {
    return {
        ansvar: 'felles',
        ansvarlig: {
            fornavn: 'Test',
            etternavn: 'Testesen',
            mellomnavn: '',
            sammensatt: 'Test Testesen'
        },
        ansvarssubjekt: {
            fornavn: 'Barn',
            etternavn: 'Barnesen',
            mellomnavn: '',
            sammensatt: 'Barn Barnesen'
        }
    };
}

function getTilfeldigAnsvar(): string {
    return ANSVARSTYPER[faker.random.number(ANSVARSTYPER.length - 1)];
}

const ANSVARSTYPER = ['felles', 'mor', 'far', 'medmor', 'medfar', 'andre', 'ukjent'];
