import faker from 'faker/locale/nb_NO';
import navfaker from 'nav-faker';
import { DittNavEvent, UnifiedVarsel, Varsel, Varselmelding, Varseltype, VarslerResult } from '../../models/varsel';
import { fyllRandomListe } from '../utils/mock-utils';
import dayjs from 'dayjs';
import { statiskVarselMock } from './statiskVarselMock';
import { backendDatoformat } from '../../utils/date-utils';
import { aremark } from '../persondata/aremark';

export function getMockVarsler(fnr: string): Varsel[] {
    faker.seed(Number(fnr));
    navfaker.seed(fnr + 'varsel');
    if (fnr === aremark.personIdent) {
        return statiskVarselMock;
    }

    return fyllRandomListe(getVarsel, 10, true);
}
export function getMockVarslerV2(fnr: string): VarslerResult {
    faker.seed(Number(fnr));
    navfaker.seed(fnr + 'varsel');
    if (fnr === aremark.personIdent) {
        return {
            feil: ['Feil ved uthenting av varsler', 'Annen feilmelding fra backend'],
            varsler: (statiskVarselMock as UnifiedVarsel[]).concat(getDittNavVarsler(fnr))
        };
    }
    const varsler = (fyllRandomListe(getVarsel, 10, true) as UnifiedVarsel[]).concat(
        new Array(15).fill(0).map(() => genererDittNavEventVarsel(fnr))
    );
    return {
        feil: [],
        varsler
    };
}

export function getDittNavVarsler(fnr: string): DittNavEvent[] {
    return new Array(5).fill(0).map(() => genererDittNavEventVarsel(fnr));
}

function genererDittNavEventVarsel(fnr: string): DittNavEvent {
    const tidspunkt = faker.date.recent(90);
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
        aktiv: faker.random.boolean()
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
