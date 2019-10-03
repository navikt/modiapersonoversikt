import { Oppgave } from '../models/oppgave';
import faker from 'faker/locale/nb_NO';
import navfaker from 'nav-faker';
import { MOCKED_TRAADID_1, MOCKED_TRAADID_2, MOCKED_TRAADID_3 } from './meldinger/meldinger-mock';

export function getTilfeldigeOppgaver(): Oppgave[] {
    if (navfaker.random.vektetSjanse(0.05)) {
        return [];
    }

    const fodselsnummer = navfaker.personIdentifikator.fødselsnummer();

    const oppgaveArray = Array.from({ length: navfaker.random.integer(3, 1) }, () => {
        return {
            fødselsnummer: fodselsnummer,
            henvendelseid: faker.random.alphaNumeric(5),
            oppgaveid: faker.random.alphaNumeric(5)
        };
    });

    oppgaveArray[0].henvendelseid = MOCKED_TRAADID_1;

    if (oppgaveArray.length > 1) {
        oppgaveArray[1].henvendelseid = MOCKED_TRAADID_2;
    }

    if (oppgaveArray.length === 3) {
        oppgaveArray[2].henvendelseid = MOCKED_TRAADID_3;
    }

    return oppgaveArray;
}
