import { LestStatus, Melding, Saksbehandler, Temagruppe, Traad, Meldingstype } from '../../models/meldinger/meldinger';
import faker from 'faker/locale/nb_NO';
import navfaker from 'nav-faker';
import moment from 'moment';
import { backendDatoformat } from '../utils/mock-utils';

export function getMockTraader(fødselsnummer: string): Traad[] {
    faker.seed(Number(fødselsnummer));
    navfaker.seed(fødselsnummer + 'meldinger');

    const traadArray = Array(navfaker.random.integer(20, 5))
        .fill(null)
        .map(() => getMockTraad());

    traadArray[0].traadId = '123'; // Legger til denne for å tving at man har en matchende oppgave-id i mock

    return traadArray;
}

export function getMockTraad(): Traad {
    const temagruppe = navfaker.random.arrayElement([Temagruppe.Arbeid, Temagruppe.Pensjon, Temagruppe.Uføretrygd]);
    const meldinger = Array(navfaker.random.integer(5, 1))
        .fill(null)
        .map(() => getMelding(temagruppe));
    return {
        traadId: faker.random.alphaNumeric(8),
        meldinger: meldinger
    };
}

function getMelding(temagruppe: Temagruppe): Melding {
    return {
        id: faker.random.alphaNumeric(8),
        meldingstype: navfaker.random.arrayElement([
            Meldingstype.DELVIS_SVAR_SKRIFTLIG,
            Meldingstype.SAMTALEREFERAT_OPPMOTE,
            Meldingstype.SPORSMAL_SKRIFTLIG,
            Meldingstype.SVAR_TELEFON
        ]),
        temagruppe: temagruppe,
        skrevetAv: getSaksbehandler(),
        journalfortAv: getSaksbehandler(),
        fritekst: faker.lorem.sentences(4),
        lestDato: moment(faker.date.recent(40)).format(backendDatoformat),
        status: navfaker.random.arrayElement([LestStatus.IkkeLest, LestStatus.Lest]),
        opprettetDato: moment(faker.date.recent(40)).format(backendDatoformat),
        journalfortDato: moment(faker.date.recent(40)).format(backendDatoformat),
        ferdigstiltDato: moment(faker.date.recent(40)).format(backendDatoformat),
        erFerdigstiltUtenSvar: faker.random.boolean(),
        erDelsvar: faker.random.boolean()
    };
}

function getSaksbehandler(): Saksbehandler {
    return {
        ident: faker.random.alphaNumeric(6),
        fornavn: faker.name.firstName(),
        etternavn: faker.name.lastName()
    };
}
