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
import { backendDatoTidformat, fyllRandomListe } from '../utils/mock-utils';
import { erMeldingFraNav, saksbehandlerTekst } from '../../app/personside/infotabs/meldinger/utils/meldingerUtils';
import { Temagruppe, TemaPlukkbare } from '../../models/Temagrupper';
import standardTeksterMock from '../standardTeksterMock';
import { autofullfor, AutofullforMap } from '../../app/personside/dialogpanel/sendMelding/autofullforUtils';

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

    return traadArray.map(traad => {
        const meldinger = traad.meldinger;
        meldinger[0].id = traad.traadId; // Første melding i en tråd har alltid id === traadId
        return {
            ...traad,
            meldinger
        };
    });
}

export function getMockTraad(): Traad {
    const temagruppe = navfaker.random.arrayElement([...TemaPlukkbare, null, Temagruppe.InnholdSlettet]);
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

    const tekstFraNav = navfaker.random.arrayElement(
        Object.entries(standardTeksterMock).map(it => it[1].innhold.nb_NO)
    );
    const fritekst = erMeldingFraNav(meldingstype)
        ? autofullfor(tekstFraNav, getMockAutoFullførMap())
        : faker.lorem.sentences(faker.random.number(15));

    return {
        id: faker.random.alphaNumeric(8),
        meldingstype: meldingstype,
        temagruppe: temagruppe,
        skrevetAvTekst: saksbehandlerTekst(getSaksbehandler()),
        journalfortAv: getSaksbehandler(),
        journalfortDato: navfaker.random.vektetSjanse(0.5)
            ? moment(faker.date.recent(50)).format(backendDatoTidformat)
            : undefined,
        journalfortSaksid: faker.random.alphaNumeric(5),
        journalfortTemanavn: navfaker.random.arrayElement(['Dagpenger', 'Arbeid', 'Pensjon', 'Bidrag']),
        fritekst: fritekst,
        lestDato: moment(faker.date.recent(40)).format(backendDatoTidformat),
        status: navfaker.random.arrayElement([LestStatus.IkkeLest, LestStatus.Lest]),
        opprettetDato: moment(faker.date.recent(40)).format(backendDatoTidformat),
        ferdigstiltDato: moment(faker.date.recent(40)).format(backendDatoTidformat),
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

function getMockAutoFullførMap(): AutofullforMap {
    return {
        'bruker.fnr': '10108000398',
        'bruker.fornavn': 'Aremark',
        'bruker.etternavn': 'Testfamilien',
        'bruker.navn': 'Aremark Testfamilien',
        'bruker.subjekt': 'han',
        'bruker.objekt': 'ham',
        'bruker.navkontor': 'NAV Norge',
        'saksbehandler.fornavn': 'Kari',
        'saksbehandler.etternavn': 'Etternavn',
        'saksbehandler.navn': 'Kari Veileder',
        'saksbehandler.enhet': 'NAV Testmark'
    };
}
