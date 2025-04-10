import { fakerNB_NO as faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import navfaker from 'nav-faker/dist/index';
import type { Arbeidsforhold } from '../../models/ytelse/arbeidsforhold';
import type {
    ForeldrepengerResponse,
    Foreldrepengerettighet,
    Foreldrepengerperiode
} from '../../models/ytelse/foreldrepenger';
import type { KommendeUtbetaling } from '../../models/ytelse/ytelse-utbetalinger';
import { backendDatoformat } from '../../utils/date-utils';
import { getPeriode } from '../periodeMock';
import { aremark } from '../persondata/aremark';
import { fyllRandomListe, vektetSjanse } from '../utils/mock-utils';
import { statiskForeldrepengeMock } from './statiskForeldrepengeMock';
import { getKommendeUtbetaling } from './ytelse-utbetalinger-mock';

export function getMockForeldrepenger(fødselsnummer: string): ForeldrepengerResponse {
    if (fødselsnummer === aremark.personIdent) {
        return {
            foreldrepenger: [statiskForeldrepengeMock]
        };
    }

    faker.seed(Number(fødselsnummer));
    navfaker.seed(`${fødselsnummer}foreldrepenger`);

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
    const erFødsel = !!vektetSjanse(faker, 0.5);
    return {
        forelder: fødselsnummer,
        andreForeldersFnr: navfaker.personIdentifikator.fødselsnummer(),
        antallBarn: navfaker.random.integer(5),
        barnetsFodselsdato: dayjs(faker.date.recent()).format(backendDatoformat),
        dekningsgrad: navfaker.random.integer(95),
        fedrekvoteTom: vektetSjanse(faker, 0.5) ? dayjs(faker.date.recent()).format(backendDatoformat) : null,
        modrekvoteTom: vektetSjanse(faker, 0.5) ? dayjs(faker.date.recent()).format(backendDatoformat) : null,
        foreldrepengetype: foreldrePengeType(),
        graderingsdager: navfaker.random.integer(100),
        restDager: navfaker.random.integer(50),
        rettighetFom: vektetSjanse(faker, 0.5) ? dayjs(faker.date.past({ years: 2 })).format(backendDatoformat) : null,
        eldsteIdDato: vektetSjanse(faker, 0.5) ? dayjs(faker.date.past({ years: 2 })).format(backendDatoformat) : null,
        foreldreAvSammeKjonn: vektetSjanse(faker, 0.5) ? 'Begge er pappaer' : null,
        periode: fyllRandomListe<Foreldrepengerperiode>(() => getForeldrepengerperiodeMock(fødselsnummer), 5),
        slutt: vektetSjanse(faker, 0.5) ? dayjs(faker.date.recent()).format(backendDatoformat) : null,
        arbeidsforhold: fyllRandomListe<Arbeidsforhold>(() => getArbeidsforholdMock(), 5),
        erArbeidsgiverperiode: vektetSjanse(faker, 0.5) ? faker.datatype.boolean() : null,
        arbeidskategori: vektetSjanse(faker, 0.5) ? 'Arbeidstaker' : null,
        omsorgsovertakelse: !erFødsel ? dayjs(faker.date.past({ years: 2 })).format(backendDatoformat) : undefined,
        termin: erFødsel ? dayjs(faker.date.recent()).format(backendDatoformat) : undefined
    } as Foreldrepengerettighet;
}

export function getForeldrepengerperiodeMock(fødselsnummer: string): Foreldrepengerperiode {
    return {
        fodselsnummer: fødselsnummer,
        harAleneomsorgFar: vektetSjanse(faker, 0.5) ? faker.datatype.boolean() : null,
        harAleneomsorgMor: vektetSjanse(faker, 0.5) ? faker.datatype.boolean() : null,
        arbeidsprosentMor: vektetSjanse(faker, 0.5) ? navfaker.random.integer(100) : null,
        avslagsaarsak: vektetSjanse(faker, 0.5) ? 'Avslag' : null,
        avslaatt: vektetSjanse(faker, 0.5) ? 'Avslått' : null,
        disponibelGradering: vektetSjanse(faker, 0.5) ? navfaker.random.integer(75) : null,
        erFedrekvote: vektetSjanse(faker, 0.5) ? faker.datatype.boolean() : null,
        erModrekvote: vektetSjanse(faker, 0.5) ? faker.datatype.boolean() : null,
        forskyvelsesaarsak1: vektetSjanse(faker, 0.5) ? 'FÅRSAK1' : null,
        forskyvelsesperiode1: vektetSjanse(faker, 0.5) ? getPeriode() : null,
        forskyvelsesaarsak2: vektetSjanse(faker, 0.5) ? 'FÅRSAK2' : null,
        forskyvelsesperiode2: vektetSjanse(faker, 0.5) ? getPeriode() : null,
        foreldrepengerFom: dayjs(faker.date.past({ years: 5 })).format(backendDatoformat),
        midlertidigStansDato: vektetSjanse(faker, 0.5) ? dayjs(faker.date.recent()).format(backendDatoformat) : null,
        morSituasjon: vektetSjanse(faker, 0.5) ? faker.lorem.words(5) : null,
        rettTilFedrekvote: vektetSjanse(faker, 0.5) ? 'Rett til fedrekvote' : 'Ingen rett til fedrekvote',
        rettTilModrekvote: vektetSjanse(faker, 0.5) ? 'Rett til mødrekvote' : 'Ingen rett til mødrekvote',
        stansaarsak: vektetSjanse(faker, 0.5) ? 'Avsluttet' : null,
        kommendeUtbetalinger: fyllRandomListe<KommendeUtbetaling>(() => getKommendeUtbetaling(faker), 3, true)
    };
}

function getArbeidsforholdMock(): Arbeidsforhold {
    return {
        arbeidsgiverNavn: faker.company.name(),
        arbeidsgiverKontonr: Number(faker.finance.accountNumber(11)).toString(),
        arbeidsgiverOrgnr: faker.string.numeric(11),
        arbeidskategori: undefined,
        inntektsperiode: vektetSjanse(faker, 0.5) ? 'Månedlig' : 'Årlig',
        inntektForPerioden: Math.round(Number(faker.finance.amount({ min: 5000, max: 50000 }))),
        sykepengerFom: vektetSjanse(faker, 0.5) ? dayjs(faker.date.recent()).format(backendDatoformat) : null,
        refusjonTom: vektetSjanse(faker, 0.5) ? dayjs(faker.date.recent()).format(backendDatoformat) : null,
        refusjonstype: 'Ikke refusjon'
    };
}

function foreldrePengeType(): string {
    return faker.helpers.arrayElement(['Fødselspenger', 'Svangerskapspenger', 'Engangsstønad']);
}
