import { LestStatus, Melding, Saksbehandler, Traad, Meldingstype } from '../../models/meldinger/meldinger';
import faker from 'faker/locale/nb_NO';
import navfaker from 'nav-faker';
import dayjs from 'dayjs';
import { fyllRandomListe } from '../utils/mock-utils';
import {
    erMeldingstypeSamtalereferat,
    erVarselMelding,
    erMeldingFraNav,
    saksbehandlerTekst
} from '../../app/personside/infotabs/meldinger/utils/meldingerUtils';
import { Temagruppe, TemaSamtalereferat } from '../../models/temagrupper';
import standardTeksterMock from '../standardTeksterMock';
import { autofullfor, AutofullforMap } from '../../app/personside/dialogpanel/sendMelding/autofullforUtils';
import { backendDatoTidformat } from '../../utils/date-utils';

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

    return traadArray.map((traad) => {
        const meldinger = traad.meldinger;
        meldinger[0].id = traad.traadId; // Første melding i en tråd har alltid id === traadId
        return {
            ...traad,
            meldinger
        };
    });
}

function getMockTraad(): Traad {
    const temagruppe = navfaker.random.arrayElement([...TemaSamtalereferat, null, Temagruppe.InnholdSlettet]);
    const meldinger = Array(navfaker.random.integer(4, 1))
        .fill(null)
        .map(() => getMelding(temagruppe));

    const enkeltStaaendeMelding = meldinger.find(
        (melding) => erVarselMelding(melding.meldingstype) || erMeldingstypeSamtalereferat(melding.meldingstype)
    );

    return {
        traadId: faker.random.alphaNumeric(8),
        meldinger: enkeltStaaendeMelding ? [enkeltStaaendeMelding] : meldinger
    };
}

function getMelding(temagruppe: Temagruppe): Melding {
    const visKontrosperre = navfaker.random.vektetSjanse(0.1);
    const ferdigstilUtenSvar = navfaker.random.vektetSjanse(0.1);
    const visMarkertSomFeilsendt = navfaker.random.vektetSjanse(0.1);
    const meldingstype = navfaker.random.arrayElement(Object.entries(Meldingstype))[0];
    const sladdingNiva = navfaker.random.arrayElement([0, 0, 0, 0, 1, 1, 1, 1, 2]);

    let tekstFraNav = navfaker.random.arrayElement(
        Object.entries(standardTeksterMock).map((it) => it[1].innhold.nb_NO)
    );

    if (sladdingNiva === 2) {
        tekstFraNav = tekstFraNav.replace(/./g, '*');
    } else if (sladdingNiva === 1) {
        const paragrafer = tekstFraNav.split('\r\n\r\n');
        if (paragrafer.length > 2) {
            paragrafer[0] = sensorerEnkeltOrd(paragrafer[0]);
            paragrafer[1] = paragrafer[1].replace(/\S/g, '*');
            paragrafer[2] = sensorerEnkeltOrd(paragrafer[2]);
        }
        tekstFraNav = paragrafer.join('\r\n\r\n');
    }

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
            ? dayjs(faker.date.recent(50)).format(backendDatoTidformat)
            : undefined,
        journalfortSaksid: faker.random.alphaNumeric(5),
        journalfortTemanavn: navfaker.random.arrayElement(['Dagpenger', 'Arbeid', 'Pensjon', 'Bidrag']),
        fritekst: fritekst,
        lestDato: dayjs(faker.date.recent(40)).format(backendDatoTidformat),
        status: navfaker.random.arrayElement([LestStatus.IkkeLest, LestStatus.Lest]),
        opprettetDato: dayjs(faker.date.recent(40)).format(backendDatoTidformat),
        ferdigstiltDato: dayjs(faker.date.recent(40)).format(backendDatoTidformat),
        erFerdigstiltUtenSvar: ferdigstilUtenSvar,
        ferdigstiltUtenSvarDato: ferdigstilUtenSvar
            ? dayjs(faker.date.recent(40)).format(backendDatoTidformat)
            : undefined,
        ferdigstiltUtenSvarAv: ferdigstilUtenSvar ? getSaksbehandler() : undefined,
        kontorsperretAv: visKontrosperre ? getSaksbehandler() : undefined,
        kontorsperretEnhet: visKontrosperre ? faker.company.companyName() : undefined,
        sendtTilSladding: sladdingNiva !== 0,
        markertSomFeilsendtAv: visMarkertSomFeilsendt ? getSaksbehandler() : undefined,
        erDokumentMelding: meldingstype === Meldingstype.DOKUMENT_VARSEL
    };
}

function sensorerEnkeltOrd(tekst: string): string {
    if (tekst.trim().length === 0) {
        return tekst;
    }
    const ord = tekst.split(' ');
    const sensorOrd = navfaker.random.arrayElement(ord.filter((it) => it.length > 2));
    const sensorering = '*'.repeat(sensorOrd.length);
    return ord.map((it) => (it === sensorOrd ? sensorering : it)).join(' ');
}

function getSaksbehandler(): Saksbehandler {
    return {
        ident: faker.random.alphaNumeric(6),
        fornavn: faker.name.firstName(),
        etternavn: faker.name.lastName()
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
