import {
    LestStatus,
    Melding,
    Saksbehandler,
    Traad,
    Meldingstype,
    SlaaSammenResponse
} from '../../models/meldinger/meldinger';
import faker from 'faker/locale/nb_NO';
import navfaker from 'nav-faker';
import moment from 'moment';
import { backendDatoformat, fyllRandomListe } from '../utils/mock-utils';
import { saksbehandlerTekst } from '../../app/personside/infotabs/meldinger/utils/meldingerUtils';
import { Temagruppe, TemaPlukkbare } from '../../models/Temagrupper';

// Legger inn to konstanter for å sørge for at vi får korrelasjon på tvers av mocking (tråd-oppgave feks)
export const MOCKED_TRAADID_1 = '123';
export const MOCKED_TRAADID_2 = '321';
export const MOCKED_TRAADID_3 = '987';

export function getMockTraader(fødselsnummer: string): Traad[] {
    faker.seed(Number(fødselsnummer));
    navfaker.seed(fødselsnummer + 'meldinger');

    const traadArray = navfaker.random.vektetSjanse(0.2)
        ? fyllRandomListe(getMockTraad, 300, true)
        : fyllRandomListe(getMockTraad, 30, true);

    if (traadArray.length >= 3) {
        traadArray[0].traadId = MOCKED_TRAADID_1;
        traadArray[1].traadId = MOCKED_TRAADID_2;
        traadArray[2].traadId = MOCKED_TRAADID_3;
    }

    return traadArray;
}

export function getMockTraad(): Traad {
    const temagruppe = navfaker.random.arrayElement(TemaPlukkbare);
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
    const meldingstype = navfaker.random.arrayElement(Object.entries(Meldingstype))[0];

    return {
        id: faker.random.alphaNumeric(8),
        meldingstype: meldingstype,
        temagruppe: temagruppe,
        skrevetAvTekst: saksbehandlerTekst(getSaksbehandler()),
        journalfortAv: getSaksbehandler(),
        journalfortDato: navfaker.random.vektetSjanse(0.5)
            ? moment(faker.date.recent(50)).format(backendDatoformat)
            : undefined,
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
        erDokumentMelding: meldingstype === Meldingstype.DOKUMENT_VARSEL
    };
}

function getSaksbehandler(): Saksbehandler {
    return {
        ident: faker.random.alphaNumeric(6),
        fornavn: faker.name.firstName(),
        etternavn: faker.name.lastName()
    };
}

export function getMockSlaaSammen(fødselsnummer: string): SlaaSammenResponse {
    const traader = getMockTraader(fødselsnummer);

    return {
        nyTraadId: MOCKED_TRAADID_1,
        traader: traader
    };
}
