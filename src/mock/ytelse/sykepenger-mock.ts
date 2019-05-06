import faker from 'faker/locale/nb_NO';
import moment from 'moment';

import navfaker from 'nav-faker/dist/index';

import {
    Forsikring,
    SykepengerResponse,
    Sykmelding,
    Sykepenger,
    Yrkesskade,
    Gradering
} from '../../models/ytelse/sykepenger';
import { getPeriode } from '../person/periodeMock';
import { backendDatoformat, fyllRandomListe } from '../utils/mock-utils';
import { getHistoriskUtbetaling, getKommendeUtbetaling, getUtbetalingPåVent } from './ytelse-utbetalinger-mock';
import { HistoriskUtbetaling, KommendeUtbetaling, UtbetalingPåVent } from '../../models/ytelse/ytelse-utbetalinger';
import { aremark } from '../person/aremark';
import { Arbeidsforhold } from '../../models/ytelse/arbeidsforhold';
import { statiskSykepengerMock } from './statiskSykepengerMock';

export function getMockSykepengerRespons(fødselsnummer: string): SykepengerResponse {
    faker.seed(Number(fødselsnummer));
    navfaker.seed(fødselsnummer + 'sykepenger');

    if (fødselsnummer === aremark.fødselsnummer) {
        return {
            sykepenger: [statiskSykepengerMock, statiskSykepengerMock]
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

export function getMockSykmepenger(fødselsnummer: string): Sykepenger {
    return {
        fødselsnummer: fødselsnummer,
        sykmeldtFom: moment(faker.date.past(1)).format(backendDatoformat),
        forbrukteDager: navfaker.random.integer(100),
        ferie1: navfaker.random.vektetSjanse(0.3) ? getPeriode() : null,
        ferie2: navfaker.random.vektetSjanse(0.3) ? getPeriode() : null,
        sanksjon: navfaker.random.vektetSjanse(0.3) ? getPeriode() : null,
        stansårsak: navfaker.random.vektetSjanse(0.3) ? 'Svindel og bedrag' : null,
        unntakAktivitet: navfaker.random.vektetSjanse(0.3) ? 'Untatt aktivitet' : null,
        forsikring: navfaker.random.vektetSjanse(0.3) ? getForsikring() : null,
        sykmeldinger: fyllRandomListe<Sykmelding>(() => getMockSykmelding(), 3),
        historiskeUtbetalinger: fyllRandomListe<HistoriskUtbetaling>(() => getHistoriskUtbetaling(faker), 5, true),
        kommendeUtbetalinger: fyllRandomListe<KommendeUtbetaling>(() => getKommendeUtbetaling(faker), 3, true),
        utbetalingerPåVent: fyllRandomListe<UtbetalingPåVent>(() => getUtbetalingPåVent(faker), 2, true),
        bruker: fødselsnummer,
        midlertidigStanset: navfaker.random.vektetSjanse(0.3)
            ? moment(faker.date.past(1)).format(backendDatoformat)
            : null,
        slutt: navfaker.random.vektetSjanse(0.7) ? null : moment(faker.date.past(1)).format(backendDatoformat),
        arbeidsforholdListe: fyllRandomListe(() => getArbeidsforhold(), 10, true),
        erArbeidsgiverperiode: navfaker.random.vektetSjanse(0.5),
        arbeidsKategori: 'Ærlig arbeid'
    };
}

function getForsikring(): Forsikring {
    return {
        forsikringsordning: faker.lorem.words(1),
        premiegrunnlag: Number(faker.commerce.price()),
        erGyldig: faker.random.boolean(),
        forsikret: navfaker.random.vektetSjanse(0.5) ? getPeriode() : null
    };
}

export function getMockSykmelding(): Sykmelding {
    return {
        sykmelder: faker.name.firstName() + ' ' + faker.name.lastName(),
        behandlet: moment(faker.date.past(1)).format(backendDatoformat),
        sykmeldt: getPeriode(),
        sykmeldingsgrad: navfaker.random.integer(100),
        gjelderYrkesskade: navfaker.random.vektetSjanse(0.0) ? getYrkesskade() : null,
        gradAvSykmeldingListe: fyllRandomListe(getGradering, 3)
    };
}

function getYrkesskade(): Yrkesskade {
    return {
        yrkesskadeart: faker.lorem.words(3),
        skadet: moment(faker.date.past(1)).format(backendDatoformat),
        vedtatt: moment(faker.date.past(1)).format(backendDatoformat)
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
        arbeidsgiverNavn: faker.company.companyName(),
        arbeidsgiverKontonr: Number(faker.finance.account(11)).toString(),
        inntektsperiode: 'Månedssats',
        inntektForPerioden: Math.round(Number(faker.finance.amount(5000, 50000))),
        refusjonTom: moment(faker.date.past(2)).format(backendDatoformat),
        refusjonstype: 'Ikke refusjon',
        sykepengerFom: moment(faker.date.past(2)).format(backendDatoformat)
    };
}
