import faker from 'faker/locale/nb_NO';
import navfaker from 'nav-faker';
import { Varsel, Varselmelding } from '../models/varsel';
import { backendDatoformat, fyllRandomListe } from './utils/mock-utils';
import moment from 'moment';
import { aremark } from './person/aremark';

export function getMockVarsler(fødselsnummer: string): Varsel[] {
    faker.seed(Number(fødselsnummer));
    navfaker.seed(fødselsnummer + 'varsel');
    if (fødselsnummer === aremark.fødselsnummer) {
        return [getVarsel(), getVarsel()];
    }

    return fyllRandomListe(getVarsel, 10, true);
}

function getVarsel(): Varsel {
    return {
        varselType: navfaker.random.arrayElement([
            'IkkeLevMeldekortNO',
            'IkkeMeldtSegFristNO',
            'RettTil4UkerFerieKonvertertInn'
        ]),
        mottattTidspunkt: moment(faker.date.recent(90)).format(backendDatoformat),
        erRevarsling: faker.random.boolean(),
        meldingListe: fyllRandomListe(getVarselMelding, 5)
    };
}

function getVarselMelding(): Varselmelding {
    return {
        kanal: navfaker.random.arrayElement(['SMS', 'NAV.NO', 'EPOST']),
        innhold: 'Meldingsinnhold',
        mottakerInformasjon: 'mottakerinfo',
        utsendingsTidspunkt: moment(faker.date.recent(90)).format(backendDatoformat),
        feilbeskrivelse: 'Feil',
        epostemne: 'Epostemne',
        url: 'http://test.com',
        erRevarsel: faker.random.boolean()
    };
}
