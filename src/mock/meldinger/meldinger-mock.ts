import { fakerNB_NO as faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import navfaker from 'nav-faker';
import { type AutofullforMap, autofullfor } from '../../app/personside/dialogpanel/sendMelding/autofullforUtils';
import { erMeldingFraNav, saksbehandlerTekst } from '../../app/personside/infotabs/meldinger/utils/meldingerUtils';
import {
    LestStatus,
    type Melding,
    type MeldingJournalpost,
    Meldingstype,
    type Saksbehandler,
    type Traad,
    TraadType
} from '../../models/meldinger/meldinger';
import { TemaSamtalereferat, Temagruppe } from '../../models/temagrupper';
import { backendDatoTidformat } from '../../utils/date-utils';
import standardTeksterMock from '../standardTeksterMock';
import { fyllRandomListe } from '../utils/mock-utils';
import standardTraader from './standardTraader';
import { statiskTraadMock } from './statiskTraadMock';

// Legger inn to konstanter for å sørge for at vi får korrelasjon på tvers av mocking (tråd-oppgave feks)
const MOCKED_TRAADID_1 = '123';
const MOCKED_TRAADID_2 = '321';
const MOCKED_TRAADID_3 = '987';

export function getMockTraader(fodselsnummer: string): Traad[] {
    faker.seed(Number(fodselsnummer));
    navfaker.seed(`${fodselsnummer}meldinger`);

    const randomTraader = navfaker.random.vektetSjanse(0.2)
        ? fyllRandomListe(getMockTraad, 300, true)
        : fyllRandomListe(getMockTraad, 30, true);

    const traadArray = [...randomTraader, ...getHardKodetTraader()];

    if (traadArray.length >= 3) {
        traadArray[0].traadId = MOCKED_TRAADID_1;
        traadArray[1].traadId = MOCKED_TRAADID_2;
        traadArray[2].traadId = MOCKED_TRAADID_3;
    }

    return traadArray
        .map((traad) => {
            const meldinger = traad.meldinger;
            meldinger[0].id = traad.traadId; // Første melding i en tråd har alltid id === traadId
            return {
                ...traad,
                meldinger
            };
        })
        .concat(getChatTraad());
}

function getMockTraad(): Traad {
    const traadType = faker.helpers.arrayElement(Object.entries(TraadType));
    const temagruppe = faker.helpers.arrayElement([...TemaSamtalereferat, null, Temagruppe.InnholdSlettet]);
    const meldinger = Array(navfaker.random.integer(4, 1))
        .fill(null)
        .map(() => getMelding(temagruppe));

    return {
        traadId: faker.string.alphanumeric(8),
        traadType: traadType[1] as TraadType,
        meldinger: meldinger,
        temagruppe: temagruppe ?? undefined,
        journalposter: fyllRandomListe(lagJournalpost, 3, false)
    };
}

function getHardKodetTraader(): Traad[] {
    return [
        ...standardTraader.map((traad) => ({
            ...traad,
            traadId: faker.string.alphanumeric(8)
        })),
        statiskTraadMock
    ];
}

function getMelding(temagruppe: Temagruppe | null): Melding {
    const visKontorsperre = navfaker.random.vektetSjanse(0.1);
    const visMarkertSomFeilsendt = navfaker.random.vektetSjanse(0.1);
    const meldingstype = faker.helpers.arrayElement(Object.values(Meldingstype));
    const sladdingNiva = faker.helpers.arrayElement([0, 0, 0, 0, 1, 1, 1, 1, 2]);

    let tekstFraNav = faker.helpers.arrayElement(Object.entries(standardTeksterMock).map((it) => it[1].innhold.nb_NO));

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
        ? autofullfor(tekstFraNav, getMockAutoFullforMap())
        : faker.lorem.sentences(faker.number.int(15));

    return {
        id: faker.string.alphanumeric(8),
        meldingsId: faker.string.alphanumeric(8),
        meldingstype: meldingstype,
        temagruppe: temagruppe,
        skrevetAvTekst: saksbehandlerTekst(getSaksbehandler()),
        fritekst: fritekst,
        lestDato: dayjs(faker.date.recent({ days: 40 })).format(backendDatoTidformat),
        status: faker.helpers.arrayElement([LestStatus.IkkeLest, LestStatus.Lest]),
        opprettetDato: dayjs(faker.date.recent({ days: 40 })).format(backendDatoTidformat),
        ferdigstiltDato: dayjs(faker.date.recent({ days: 40 })).format(backendDatoTidformat),
        kontorsperretAv: visKontorsperre ? getSaksbehandler() : undefined,
        kontorsperretEnhet: visKontorsperre ? faker.company.name() : undefined,
        sendtTilSladding: sladdingNiva !== 0,
        markertSomFeilsendtAv: visMarkertSomFeilsendt ? getSaksbehandler() : undefined
    };
}

function getChatTraad(): Traad {
    const temagruppe = faker.helpers.arrayElement([...TemaSamtalereferat, null, Temagruppe.InnholdSlettet]);
    const meldinger = Array(navfaker.random.integer(10, 3))
        .fill(null)
        .map(() => getChatMelding(temagruppe));

    return {
        traadId: meldinger[0].id,
        traadType: TraadType.CHAT,
        meldinger: meldinger,
        temagruppe: temagruppe ?? undefined,
        journalposter: fyllRandomListe(lagJournalpost, 3, true)
    };
}

function getChatMelding(temagruppe: Temagruppe | null): Melding {
    const meldingstype = faker.helpers.arrayElement([
        Meldingstype.CHATMELDING_FRA_NAV,
        Meldingstype.CHATMELDING_FRA_BRUKER
    ]);

    const tekstFraNav = faker.helpers.arrayElement(mockChatMeldinger);

    const fritekst = erMeldingFraNav(meldingstype)
        ? autofullfor(tekstFraNav, getMockAutoFullforMap())
        : faker.lorem.sentences(faker.number.int(2));

    return {
        id: faker.string.alphanumeric(8),
        meldingsId: faker.string.alphanumeric(8),
        meldingstype: meldingstype,
        temagruppe: temagruppe,
        skrevetAvTekst: saksbehandlerTekst(getSaksbehandler()),
        fritekst: fritekst,
        lestDato: dayjs(faker.date.recent({ days: 40 })).format(backendDatoTidformat),
        status: faker.helpers.arrayElement([LestStatus.IkkeLest, LestStatus.Lest]),
        opprettetDato: dayjs(faker.date.recent({ days: 1 })).format(backendDatoTidformat),
        ferdigstiltDato: dayjs(faker.date.recent({ days: 40 })).format(backendDatoTidformat),
        kontorsperretAv: undefined,
        kontorsperretEnhet: undefined,
        sendtTilSladding: false,
        markertSomFeilsendtAv: undefined,
        avsluttetDato: dayjs(faker.date.recent({ days: 10 })).format(backendDatoTidformat)
    };
}

const mockChatMeldinger = [
    'Hvis du logger inn her, så kan jeg se litt på saken.',
    'Hei:)',
    'Et øyeblikk:)',
    'Ja, det går an.',
    'Ha en fin dag videre.',
    'Ja, i søknaden din ser jeg at du har krysset for dette.',
    'Ok, da kan du sende bekreftelse på det, og en ny søknad.',
    'Ja, du har rett på dagpenger.'
];

const temaMap = {
    AAP: 'Arbeidsavklaringspenger',
    DAG: 'Dagpenger',
    BID: 'Bidrag',
    PEN: 'Pensjon'
};
function lagJournalpost(): MeldingJournalpost {
    const tema = faker.helpers.arrayElement(['DAG', 'BID', 'AAP', 'PEN'] as const);
    const saksbehandler = getSaksbehandler();
    return {
        journalfortDato: faker.date.recent({ days: 40 }).toISOString(),
        journalfortSaksid: faker.string.alphanumeric(5),
        journalfortTema: tema,
        journalfortTemanavn: temaMap[tema],
        journalfortAv: {
            //biome-ignore lint/style/noNonNullAssertion: biome migration
            ident: saksbehandler.ident!,
            navn: `${saksbehandler.fornavn} ${saksbehandler.etternavn}`
        }
    };
}

function sensorerEnkeltOrd(tekst: string): string {
    if (tekst.trim().length === 0) {
        return tekst;
    }
    const ord = tekst.split(' ');
    const sensorOrd = faker.helpers.arrayElement(ord.filter((it) => it.length > 2));
    const sensorering = '*'.repeat(sensorOrd.length);
    return ord.map((it) => (it === sensorOrd ? sensorering : it)).join(' ');
}

function getSaksbehandler(): Saksbehandler {
    return {
        ident: faker.string.alphanumeric(6),
        fornavn: faker.person.firstName(),
        etternavn: faker.person.lastName()
    };
}

function getMockAutoFullforMap(): AutofullforMap {
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
