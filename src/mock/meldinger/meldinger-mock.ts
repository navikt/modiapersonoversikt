import {
    LestStatus,
    Melding,
    Saksbehandler,
    TypeKontakt,
    Temagruppe,
    Traad,
    Meldingstype
} from '../../models/meldinger/meldinger';
import faker from 'faker/locale/nb_NO';
import navfaker from 'nav-faker';
import moment from 'moment';
import { backendDatoformat } from '../utils/mock-utils';

export function getMockTraader(fødselsnummer: string): Traad[] {
    faker.seed(Number(fødselsnummer));
    navfaker.seed(fødselsnummer + 'meldinger');

    return Array(navfaker.random.integer(20, 5))
        .fill(null)
        .map(() => getTraad());
}

function getTraad(): Traad {
    const temagruppe = navfaker.random.arrayElement([Temagruppe.Arbeid, Temagruppe.Pensjon, Temagruppe.Uføretrygd]);
    const meldinger = Array(navfaker.random.integer(5, 1))
        .fill(null)
        .map(() => getMelding(temagruppe));
    return {
        traadId: faker.random.alphaNumeric(8),
        temagruppe: temagruppe,
        typeKontakt: navfaker.random.arrayElement([TypeKontakt.Monolog, TypeKontakt.Oppmøte, TypeKontakt.Telefon]),
        dato: moment(faker.date.recent(40)).format(backendDatoformat),
        meldinger: meldinger
    };
}

function getMelding(temagruppe: Temagruppe): Melding {
    return {
        id: faker.random.alphaNumeric(8),
        meldingstype: navfaker.random.arrayElement([
            Meldingstype.DelvisSvarSkriftlig,
            Meldingstype.SamtalereferatOppmøte,
            Meldingstype.SpørsmålSkriftlig,
            Meldingstype.SvarTelefon
        ]),
        temagruppe: temagruppe,
        skrevetAv: getSaksbehandler(),
        journalfortAv: getSaksbehandler(),
        fritekst: faker.lorem.sentences(4),
        lestDato: moment(faker.date.recent(40)).format(backendDatoformat),
        status: navfaker.random.arrayElement([LestStatus.IkkeLest, LestStatus.Lest]),
        opprettetDato: moment(faker.date.recent(40)).format(backendDatoformat),
        journalfortDato: moment(faker.date.recent(40)).format(backendDatoformat),
        ferdigstiltDato: moment(faker.date.recent(40)).format(backendDatoformat)
    };
}

function getSaksbehandler(): Saksbehandler {
    return {
        ident: faker.random.alphaNumeric(6),
        navn: faker.name.firstName() + ' ' + faker.name.lastName()
    };
}
