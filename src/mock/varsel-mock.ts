import faker from 'faker/locale/nb_NO';
import navfaker from 'nav-faker';
import { Varsel, Varselmelding, VarselResponse } from '../models/varsel';
import { backendDatoformat } from './utils/mock-utils';
import moment from 'moment';

export function getMockVarsler(fødselsnummer: string): VarselResponse {
    faker.seed(Number(fødselsnummer));
    navfaker.seed(fødselsnummer + 'varsel');

    return {
        data: Array(navfaker.random.integer(10, 1))
            .fill(null)
            .map(() => getVarsel())
    };
}

function getVarsel(): Varsel {
    return {
        varselType: navfaker.random.arrayElement([
            'IkkeLevMeldekortNO',
            'IkkeMeldtSegFristNO',
            'RettTil4UkerFerieKonvertertInn'
        ]),
        mottattTidspunkt: moment(faker.date.recent(30)).format(backendDatoformat),
        erRevarsling: faker.random.boolean(),
        meldingListe: Array(navfaker.random.integer(10, 1))
            .fill(null)
            .map(() => getVarselMelding())
    };
}

function getVarselMelding(): Varselmelding {
    return {
        kanal: navfaker.random.arrayElement(['SMS', 'NAV.NO']),
        innhold: 'Meldingsinnhold',
        mottakerInformasjon: 'mottakerinfo',
        utsendingsTidspunkt: moment(faker.date.recent(30)).format(backendDatoformat),
        feilbeskrivelse: 'Feil',
        epostemne: 'Epostemne',
        url: 'http://test.com',
        erRevarsel: faker.random.boolean()
    };
}
