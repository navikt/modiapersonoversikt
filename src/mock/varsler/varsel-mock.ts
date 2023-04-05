import faker from 'faker/locale/nb_NO';
import navfaker from 'nav-faker';
import { DittNavEvent, Varsel, Varselmelding, Varseltype, VarslerResult } from '../../models/varsel';
import { fyllRandomListe } from '../utils/mock-utils';
import dayjs from 'dayjs';
import { statiskDittnavEventVarselMock, statiskVarselMock } from './statiskVarselMock';
import { backendDatoformat } from '../../utils/date-utils';
import { aremark } from '../persondata/aremark';
import { nArrayElement } from '../utils-mock';

export function getMockVarsler(fnr: string): VarslerResult {
    faker.seed(Number(fnr));
    navfaker.seed(fnr + 'varsel');
    if (fnr === aremark.personIdent) {
        return {
            feil: ['Feil ved uthenting av varsler', 'Annen feilmelding fra backend'],
            varsler: [...statiskDittnavEventVarselMock, ...statiskVarselMock]
        };
    }

    return {
        feil: [],
        varsler: [
            ...fyllRandomListe(getVarsel, 10, true),
            ...fyllRandomListe(() => genererDittNavEventVarsel(fnr), 15, true)
        ]
    };
}

function genererDittNavEventVarsel(fnr: string): DittNavEvent {
    const tidspunkt = faker.date.recent(90);
    const eksternVarsel = faker.random.boolean();
    const sendteKanaler = nArrayElement(['SMS', 'EPOST'], faker.random.number(2), false);
    return {
        fodselsnummer: fnr,
        grupperingsId: faker.random.uuid(),
        eventId: faker.random.uuid(),
        forstBehandlet: dayjs(tidspunkt).format(backendDatoformat),
        produsent: faker.random.alphaNumeric(10),
        sikkerhetsnivaa: navfaker.random.arrayElement([3, 4]),
        sistOppdatert: dayjs(tidspunkt).format(backendDatoformat),
        tekst: faker.lorem.sentence(5 + faker.random.number(5)),
        link: faker.lorem.sentence(5 + faker.random.number(5)),
        aktiv: faker.random.boolean(),
        eksternVarslingSendt: eksternVarsel,
        eksternVarslingKanaler: eksternVarsel ? sendteKanaler : []
    };
}

function getVarsel(): Varsel {
    return {
        varselType: navfaker.random.arrayElement(Object.keys(Varseltype)),
        mottattTidspunkt: dayjs(faker.date.recent(90)).format(backendDatoformat),
        erRevarsling: faker.random.boolean(),
        meldingListe: fyllRandomListe(getVarselMelding, 5)
    };
}

function getVarselMelding(): Varselmelding {
    const kanal = navfaker.random.arrayElement(['SMS', 'NAV.NO', 'EPOST']);
    const motakerInfo = kanal === 'SMS' ? faker.phone.phoneNumber() : kanal === 'EPOST' ? 'fakemail@faker.no' : null;
    return {
        kanal: kanal,
        innhold: faker.lorem.sentence(faker.random.number(25)),
        mottakerInformasjon: motakerInfo,
        utsendingsTidspunkt: dayjs(faker.date.recent(90)).format(backendDatoformat),
        feilbeskrivelse: 'Feil',
        epostemne: 'Epostemne',
        url: 'http://test.com',
        erRevarsel: faker.random.boolean()
    };
}
