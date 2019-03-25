import faker from 'faker/locale/nb_NO';
import moment from 'moment';

import navfaker from 'nav-faker/dist/index';

import { Forsikring, SykepengerResponse, Sykmelding, Sykepenger, Yrkesskade } from '../../models/ytelse/sykepenger';
import { getPeriode } from '../person/periodeMock';
import { backendDatoformat, fyllRandomListe } from '../utils/mock-utils';
import { getHistoriskUtbetaling, getKommendeUtbetaling, getUtbetalingPåVent } from './ytelse-utbetalinger-mock';
import { HistoriskUtbetaling, KommendeUtbetaling, UtbetalingPåVent } from '../../models/ytelse/ytelse-utbetalinger';
import { aremark } from '../person/aremark';

export function getMockSykepengerRespons(fødselsnummer: string): SykepengerResponse {
    faker.seed(Number(fødselsnummer));
    navfaker.seed(fødselsnummer + 'sykepenger');

    if (fødselsnummer === aremark.fødselsnummer) {
        return {
            sykepenger: [
                getMockSykmepenger(fødselsnummer),
                getMockSykmepenger(fødselsnummer),
                getMockSykmepenger(fødselsnummer)
            ]
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
        ferie1: getPeriode(),
        ferie2: getPeriode(),
        sanksjon: getPeriode(),
        stansårsak: faker.lorem.words(5),
        unntakAktivitet: faker.lorem.words(1),
        forsikring: getForsikring(),
        sykmeldinger: fyllRandomListe<Sykmelding>(() => getMockSykmelding(), 3),
        historiskeUtbetalinger: fyllRandomListe<HistoriskUtbetaling>(() => getHistoriskUtbetaling(faker), 5),
        kommendeUtbetalinger: fyllRandomListe<KommendeUtbetaling>(() => getKommendeUtbetaling(faker), 5),
        utbetalingerPåVent: fyllRandomListe<UtbetalingPåVent>(() => getUtbetalingPåVent(faker), 5),
        bruker: fødselsnummer,
        midlertidigStanset: moment(faker.date.past(1)).format(backendDatoformat)
    };
}

function getForsikring(): Forsikring {
    return {
        forsikringsordning: faker.lorem.words(1),
        premiegrunnlag: Number(faker.commerce.price()),
        erGyldig: faker.random.boolean(),
        forsikret: getPeriode()
    };
}

export function getMockSykmelding(): Sykmelding {
    return {
        sykmelder: faker.name.firstName() + ' ' + faker.name.lastName(),
        behandlet: moment(faker.date.past(1)).format(backendDatoformat),
        sykmeldt: getPeriode(),
        sykmeldingsgrad: navfaker.random.integer(100),
        gjelderYrkesskade: getYrkesskade(),
        gradAvSykmeldingListe: []
    };
}

function getYrkesskade(): Yrkesskade {
    return {
        yrkesskadeart: faker.lorem.words(3),
        skadet: moment(faker.date.past(1)).format(backendDatoformat),
        vedtatt: moment(faker.date.past(1)).format(backendDatoformat)
    };
}
