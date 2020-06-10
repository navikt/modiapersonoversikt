import faker from 'faker/locale/nb_NO';
import moment from 'moment';

import navfaker from 'nav-faker/dist/index';

import {
    Foreldrepengerperiode,
    ForeldrepengerResponse,
    Foreldrepengerettighet
} from '../../models/ytelse/foreldrepenger';
import { getPeriode } from '../person/periodeMock';
import { fyllRandomListe, vektetSjanse } from '../utils/mock-utils';
import { getKommendeUtbetaling } from './ytelse-utbetalinger-mock';
import { KommendeUtbetaling } from '../../models/ytelse/ytelse-utbetalinger';
import { Arbeidsforhold } from '../../models/ytelse/arbeidsforhold';
import { aremark } from '../person/aremark';
import { statiskForeldrepengeMock } from './statiskForeldrepengeMock';
import { backendDatoformat } from '../../utils/dateUtils';

export function getMockForeldrepenger(fødselsnummer: string): ForeldrepengerResponse {
    if (fødselsnummer === aremark.fødselsnummer) {
        return {
            foreldrepenger: [statiskForeldrepengeMock]
        };
    }

    faker.seed(Number(fødselsnummer));
    navfaker.seed(fødselsnummer + 'foreldrepenger');

    if (navfaker.random.vektetSjanse(0.3)) {
        return {
            foreldrepenger: null
        };
    }

    return {
        foreldrepenger: fyllRandomListe<Foreldrepengerettighet>(() => getForeldrepengerettighetMock(fødselsnummer), 2)
    };
}

export function getForeldrepengerettighetMock(fødselsnummer: string, seed?: number): Foreldrepengerettighet {
    if (seed) {
        faker.seed(Number(seed));
        navfaker.seed(seed.toString());
    }
    const erFødsel = vektetSjanse(faker, 0.5) ? true : false;
    return {
        forelder: fødselsnummer,
        andreForeldersFnr: navfaker.personIdentifikator.fødselsnummer(),
        antallBarn: navfaker.random.integer(5),
        barnetsFødselsdato: moment(faker.date.recent()).format(backendDatoformat),
        dekningsgrad: navfaker.random.integer(95),
        fedrekvoteTom: vektetSjanse(faker, 0.5) ? moment(faker.date.recent()).format(backendDatoformat) : null,
        mødrekvoteTom: vektetSjanse(faker, 0.5) ? moment(faker.date.recent()).format(backendDatoformat) : null,
        foreldrepengetype: foreldrePengeType(),
        graderingsdager: navfaker.random.integer(100),
        restDager: navfaker.random.integer(50),
        rettighetFom: vektetSjanse(faker, 0.5) ? moment(faker.date.past(2)).format(backendDatoformat) : null,
        eldsteIdDato: vektetSjanse(faker, 0.5) ? moment(faker.date.past(2)).format(backendDatoformat) : null,
        foreldreAvSammeKjønn: vektetSjanse(faker, 0.5) ? 'Begge er pappaer' : null,
        periode: fyllRandomListe<Foreldrepengerperiode>(() => getForeldrepengerperiodeMock(fødselsnummer), 5),
        slutt: vektetSjanse(faker, 0.5) ? moment(faker.date.recent()).format(backendDatoformat) : null,
        arbeidsforhold: fyllRandomListe<Arbeidsforhold>(() => getArbeidsforholdMock(fødselsnummer), 5),
        erArbeidsgiverperiode: vektetSjanse(faker, 0.5) ? faker.random.boolean() : null,
        arbeidskategori: vektetSjanse(faker, 0.5) ? 'Arbeidstaker' : null,
        omsorgsovertakelse: !erFødsel ? moment(faker.date.past(2)).format(backendDatoformat) : undefined,
        termin: erFødsel ? moment(faker.date.recent()).format(backendDatoformat) : undefined
    } as Foreldrepengerettighet;
}

export function getForeldrepengerperiodeMock(fødselsnummer: string): Foreldrepengerperiode {
    return {
        fødselsnummer: fødselsnummer,
        harAleneomsorgFar: vektetSjanse(faker, 0.5) ? faker.random.boolean() : null,
        harAleneomsorgMor: vektetSjanse(faker, 0.5) ? faker.random.boolean() : null,
        arbeidsprosentMor: vektetSjanse(faker, 0.5) ? navfaker.random.integer(100) : null,
        avslagsårsak: vektetSjanse(faker, 0.5) ? 'Avslag' : null,
        avslått: vektetSjanse(faker, 0.5) ? 'Avslått' : null,
        disponibelGradering: vektetSjanse(faker, 0.5) ? navfaker.random.integer(75) : null,
        erFedrekvote: vektetSjanse(faker, 0.5) ? faker.random.boolean() : null,
        erMødrekvote: vektetSjanse(faker, 0.5) ? faker.random.boolean() : null,
        forskyvelsesårsak1: vektetSjanse(faker, 0.5) ? 'FÅRSAK1' : null,
        forskyvelsesperiode1: vektetSjanse(faker, 0.5) ? getPeriode() : null,
        forskyvelsesårsak2: vektetSjanse(faker, 0.5) ? 'FÅRSAK2' : null,
        forskyvelsesperiode2: vektetSjanse(faker, 0.5) ? getPeriode() : null,
        foreldrepengerFom: moment(faker.date.past(5)).format(backendDatoformat),
        midlertidigStansDato: vektetSjanse(faker, 0.5) ? moment(faker.date.recent()).format(backendDatoformat) : null,
        morSituasjon: vektetSjanse(faker, 0.5) ? faker.lorem.words(5) : null,
        rettTilFedrekvote: vektetSjanse(faker, 0.5) ? 'Rett til fedrekvote' : 'Ingen rett til fedrekvote',
        rettTilMødrekvote: vektetSjanse(faker, 0.5) ? 'Rett til mødrekvote' : 'Ingen rett til mødrekvote',
        stansårsak: vektetSjanse(faker, 0.5) ? 'Avsluttet' : null,
        kommendeUtbetalinger: fyllRandomListe<KommendeUtbetaling>(() => getKommendeUtbetaling(faker), 3, true)
    };
}

function getArbeidsforholdMock(fødselsnummer: string): Arbeidsforhold {
    return {
        arbeidsgiverNavn: faker.company.companyName(),
        arbeidsgiverKontonr: Number(faker.finance.account(11)).toString(),
        inntektsperiode: vektetSjanse(faker, 0.5) ? 'Månedlig' : 'Årlig',
        inntektForPerioden: Math.round(Number(faker.finance.amount(5000, 50000))),
        sykepengerFom: vektetSjanse(faker, 0.5) ? moment(faker.date.recent()).format(backendDatoformat) : null,
        refusjonTom: vektetSjanse(faker, 0.5) ? moment(faker.date.recent()).format(backendDatoformat) : null,
        refusjonstype: 'Ikke refusjon'
    };
}

function foreldrePengeType(): string {
    return navfaker.random.arrayElement(['Fødselspenger', 'Svangerskapspenger', 'Engangsstønad']);
}
