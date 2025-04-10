import { fakerNB_NO as faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import navfaker from 'nav-faker/dist/index';

import type { Arbeidsforhold } from 'src/models/ytelse/arbeidsforhold';
import type {
    Forsikring,
    Gradering,
    Sykepenger,
    SykepengerResponse,
    Sykmelding,
    Yrkesskade
} from 'src/models/ytelse/sykepenger';
import type { KommendeUtbetaling, UtbetalingPaaVent } from 'src/models/ytelse/ytelse-utbetalinger';
import { backendDatoformat } from 'src/utils/date-utils';
import { getPeriode } from '../periodeMock';
import { aremark } from '../persondata/aremark';
import { fyllRandomListe } from '../utils/mock-utils';
import { statiskSykepengerMock } from './statiskSykepengerMock';
import { getKommendeUtbetaling, getUtbetalingPåVent } from './ytelse-utbetalinger-mock';

export function getMockSykepengerRespons(fødselsnummer: string): SykepengerResponse {
    faker.seed(Number(fødselsnummer));
    navfaker.seed(`${fødselsnummer}sykepenger`);

    if (fødselsnummer === aremark.personIdent) {
        return {
            sykepenger: [statiskSykepengerMock]
        };
    }

    if (navfaker.random.vektetSjanse(0.3)) {
        return {
            sykepenger: null
        };
    }

    return {
        sykepenger: fyllRandomListe<Sykepenger>(() => getMockSykmepenger(fødselsnummer), 3)
    };
}

function getMockSykmepenger(fødselsnummer: string): Sykepenger {
    return {
        fodselsnummer: fødselsnummer,
        sykmeldtFom: dayjs(faker.date.past({ years: 1 })).format(backendDatoformat),
        forbrukteDager: navfaker.random.integer(100),
        ferie1: navfaker.random.vektetSjanse(0.3) ? getPeriode() : null,
        ferie2: navfaker.random.vektetSjanse(0.3) ? getPeriode() : null,
        sanksjon: navfaker.random.vektetSjanse(0.3) ? getPeriode() : null,
        stansaarsak: navfaker.random.vektetSjanse(0.3) ? 'Svindel og bedrag' : null,
        unntakAktivitet: navfaker.random.vektetSjanse(0.3) ? 'Untatt aktivitet' : null,
        forsikring: navfaker.random.vektetSjanse(0.3) ? getForsikring() : null,
        sykmeldinger: fyllRandomListe<Sykmelding>(() => getMockSykmelding(), 3),
        kommendeUtbetalinger: fyllRandomListe<KommendeUtbetaling>(() => getKommendeUtbetaling(faker), 3, true),
        utbetalingerPaaVent: fyllRandomListe<UtbetalingPaaVent>(() => getUtbetalingPåVent(faker), 2, true),
        bruker: fødselsnummer,
        midlertidigStanset: navfaker.random.vektetSjanse(0.3)
            ? dayjs(faker.date.past({ years: 1 })).format(backendDatoformat)
            : null,
        slutt: navfaker.random.vektetSjanse(0.7)
            ? null
            : dayjs(faker.date.past({ years: 1 })).format(backendDatoformat),
        arbeidsforholdListe: fyllRandomListe(() => getArbeidsforhold(), 10, true),
        erArbeidsgiverperiode: navfaker.random.vektetSjanse(0.5),
        arbeidskategori: 'Ærlig arbeid'
    };
}

function getForsikring(): Forsikring {
    return {
        forsikringsordning: faker.lorem.words(1),
        premiegrunnlag: Number(faker.commerce.price()),
        erGyldig: faker.datatype.boolean(),
        forsikret: navfaker.random.vektetSjanse(0.5) ? getPeriode() : null
    };
}

export function getMockSykmelding(): Sykmelding {
    return {
        sykmelder: `${faker.name.firstName()} ${faker.name.lastName()}`,
        behandlet: dayjs(faker.date.past({ years: 1 })).format(backendDatoformat),
        sykmeldt: getPeriode(),
        sykmeldingsgrad: navfaker.random.integer(100),
        gjelderYrkesskade: navfaker.random.vektetSjanse(0.0) ? getYrkesskade() : null,
        gradAvSykmeldingListe: fyllRandomListe(getGradering, 3)
    };
}

function getYrkesskade(): Yrkesskade {
    return {
        yrkesskadeart: faker.lorem.words(3),
        skadet: dayjs(faker.date.past({ years: 1 })).format(backendDatoformat),
        vedtatt: dayjs(faker.date.past({ years: 1 })).format(backendDatoformat)
    };
}

function getGradering(): Gradering {
    return {
        gradert: getPeriode(),
        sykmeldingsgrad: navfaker.random.integer(100)
    };
}

function getArbeidsforhold(): Arbeidsforhold {
    return {
        arbeidsgiverNavn: faker.company.name(),
        arbeidsgiverKontonr: Number(faker.finance.accountNumber(11)).toString(),
        arbeidsgiverOrgnr: faker.string.numeric(11),
        arbeidskategori: null,
        inntektsperiode: 'Månedssats',
        inntektForPerioden: Math.round(Number(faker.finance.amount({ min: 5000, max: 50000 }))),
        refusjonTom: dayjs(faker.date.past({ years: 2 })).format(backendDatoformat),
        refusjonstype: 'Ikke refusjon',
        sykepengerFom: dayjs(faker.date.past({ years: 2 })).format(backendDatoformat)
    };
}
