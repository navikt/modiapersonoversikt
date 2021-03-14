import { aremark } from './aremark';
import faker from 'faker/locale/nb_NO';
import navfaker from 'nav-faker';
import { getSistOppdatert, vektetSjanse } from '../utils/mock-utils';
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
        ansvarligUtenIdentifikator: {
            navn: mockPersonnavn(faker),
            foedselsdato: getFodselsdato(),
            statsborgerskap: faker.address.country(),
            kjoenn: navfaker.person.kjønn().toString()
        }
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
        ansvarligUtenIdentifikator: {
            navn: {
                fornavn: 'Test',
                etternavn: 'Testesen',
                mellomnavn: '',
                sammensatt: 'Test Testesen'
            },
            foedselsdato: '2020-01-01',
            statsborgerskap: 'Norge',
            kjoenn: 'M'
        }
    };
}

export function getFodselsdato() {
    return getSistOppdatert();
}
function getTilfeldigAnsvar(): string {
    return ANSVARSTYPER[faker.random.number(ANSVARSTYPER.length - 1)];
}

const ANSVARSTYPER = ['felles', 'mor', 'far', 'medmor', 'medfar', 'andre', 'ukjent'];
