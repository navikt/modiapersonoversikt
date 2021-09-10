import { aremark } from './aremark';
import faker from 'faker/locale/nb_NO';
import navfaker from 'nav-faker';
import { vektetSjanse } from '../utils/mock-utils';
import { Foreldreansvar } from '../../models/personPdl/foreldreansvar';
import { mockPersonnavn } from './dodsbo';

export function mockVergemal(fodselsnummer: string) {
    if (fodselsnummer === aremark.fnr) {
        return getAremarkForeldreansvar();
    }
    faker.seed(Number(fodselsnummer));
    navfaker.seed(fodselsnummer);
    if (vektetSjanse(faker, 0.7)) {
        return {};
    }
    return getForeldreansvar();
}

function getForeldreansvar(): Foreldreansvar {
    return {
        ansvar: getTilfeldigAnsvar(),
        ansvarlig: mockPersonnavn(faker),
        ansvarsubject: mockPersonnavn(faker)
    };
}

export function getAremarkForeldreansvar(): Foreldreansvar {
    return {
        ansvar: 'felles',
        ansvarlig: {
            fornavn: 'Test',
            etternavn: 'Testesen',
            mellomnavn: null
        },
        ansvarsubject: {
            fornavn: 'Barn',
            etternavn: 'Barnesen',
            mellomnavn: null
        }
    };
}

function getTilfeldigAnsvar(): string {
    return ANSVARSTYPER[faker.random.number(ANSVARSTYPER.length - 1)];
}

const ANSVARSTYPER = ['felles', 'mor', 'far', 'medmor', 'medfar', 'andre', 'ukjent'];
