import { Oppgave } from '../models/oppgave';
import faker from 'faker/locale/nb_NO';
import navfaker from 'nav-faker';
import { MOCKED_TRAADID_1, MOCKED_TRAADID_2, MOCKED_TRAADID_3 } from './meldinger/meldinger-mock';
import { fyllRandomListe } from './utils/mock-utils';

export function getTilfeldigeOppgaver(): Oppgave[] {
    if (navfaker.random.vektetSjanse(0.05)) {
        return [];
    }

    const fodselsnummer = navfaker.personIdentifikator.fødselsnummer();

    const oppgaveArray = fyllRandomListe(() => lagOppgave(fodselsnummer), 5);

    oppgaveArray[0].traadId = MOCKED_TRAADID_1;

    if (oppgaveArray.length > 1) {
        oppgaveArray[1].traadId = MOCKED_TRAADID_2;
    }

    if (oppgaveArray.length > 2) {
        oppgaveArray[2].traadId = MOCKED_TRAADID_3;
    }

    return oppgaveArray;
}

function lagOppgave(fodselsnummer: string): Oppgave {
    return {
        fødselsnummer: fodselsnummer,
        traadId: faker.random.alphaNumeric(5),
        oppgaveId: faker.random.alphaNumeric(5)
    };
}
