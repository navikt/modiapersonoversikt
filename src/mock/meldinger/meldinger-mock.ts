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
    const visKontrosperre = navfaker.random.vektetSjanse(0.1);
    const ferdigstilUtenSvar = navfaker.random.vektetSjanse(0.1);
    const visMarkertSomFeilsendt = navfaker.random.vektetSjanse(0.1);

    return {
        id: faker.random.alphaNumeric(8),
        meldingstype: navfaker.random.arrayElement([
            Meldingstype.DELVIS_SVAR_SKRIFTLIG,
            Meldingstype.SAMTALEREFERAT_OPPMOTE,
            Meldingstype.SPORSMAL_SKRIFTLIG,
            Meldingstype.SVAR_TELEFON,
            Meldingstype.DOKUMENT_VARSEL,
            Meldingstype.OPPGAVE_VARSEL
        ]),
        temagruppe: temagruppe,
        skrevetAv: getSaksbehandler(),
        journalfortAv: getSaksbehandler(),
        journalfortDato: moment(faker.date.recent(50)).format(backendDatoformat),
        journalfortSaksid: faker.random.alphaNumeric(5),
        journalfortTemanavn: navfaker.random.arrayElement(['Dagpenger', 'Arbeid', 'Pensjon', 'Bidrag']),
        fritekst: faker.lorem.sentences(4),
        lestDato: moment(faker.date.recent(40)).format(backendDatoformat),
        status: navfaker.random.arrayElement([LestStatus.IkkeLest, LestStatus.Lest]),
        opprettetDato: moment(faker.date.recent(40)).format(backendDatoformat),
        ferdigstiltDato: moment(faker.date.recent(40)).format(backendDatoformat),
        erFerdigstiltUtenSvar: ferdigstilUtenSvar,
        ferdigstiltUtenSvarAv: ferdigstilUtenSvar ? getSaksbehandler() : undefined,
        kontorsperretAv: visKontrosperre ? getSaksbehandler() : undefined,
        kontorsperretEnhet: visKontrosperre ? faker.company.companyName() : undefined,
        markertSomFeilsendtAv: visMarkertSomFeilsendt ? getSaksbehandler() : undefined,
        erDokumentMelding: faker.random.boolean()
    };
}

function getSaksbehandler(): Saksbehandler {
    return {
        ident: faker.random.alphaNumeric(6),
        fornavn: faker.name.firstName(),
        etternavn: faker.name.lastName()
    };
}
