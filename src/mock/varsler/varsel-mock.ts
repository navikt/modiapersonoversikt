import { fakerNB_NO as faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import navfaker from 'nav-faker';
import type { DittNavEvent, VarslerResult } from '../../models/varsel';
import { backendDatoformat } from '../../utils/date-utils';
import { aremark } from '../persondata/aremark';
import { fyllRandomListe } from '../utils/mock-utils';
import { nArrayElement } from '../utils-mock';
import { statiskDittnavEventVarselMock } from './statiskVarselMock';

export function getMockVarsler(fnr: string): VarslerResult {
    faker.seed(Number(fnr));
    navfaker.seed(`${fnr}varsel`);
    if (fnr === aremark.personIdent) {
        return {
            feil: ['Feil ved uthenting av varsler', 'Annen feilmelding fra backend'],
            varsler: [...statiskDittnavEventVarselMock]
        };
    }

    return {
        feil: [],
        varsler: [...fyllRandomListe(() => genererDittNavEventVarsel(fnr), 15, true)]
    };
}

function genererDittNavEventVarsel(fnr: string): DittNavEvent {
    const tidspunkt = faker.date.recent({ days: 90 });
    const eksternVarsel = faker.datatype.boolean();
    const sendteKanaler = nArrayElement(['SMS', 'EPOST'], faker.number.int(2), false);
    return {
        fodselsnummer: fnr,
        grupperingsId: faker.string.uuid(),
        eventId: faker.string.uuid(),
        forstBehandlet: dayjs(tidspunkt).format(backendDatoformat),
        produsent: faker.string.alphanumeric(10),
        sikkerhetsnivaa: faker.helpers.arrayElement([3, 4]),
        sistOppdatert: dayjs(tidspunkt).format(backendDatoformat),
        tekst: faker.lorem.sentence(5 + faker.number.int(5)),
        link: faker.lorem.sentence(5 + faker.number.int(5)),
        aktiv: faker.datatype.boolean(),
        eksternVarslingSendt: eksternVarsel,
        eksternVarslingKanaler: eksternVarsel ? sendteKanaler : []
    };
}
