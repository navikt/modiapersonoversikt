import * as faker from 'faker/locale/nb_NO';
import * as moment from 'moment';

import navfaker from 'nav-faker/dist/index';

import {
    Forsikring,
    SykepengerResponse,
    Sykmelding,
    Sykmeldingsperiode,
    Yrkesskade
} from '../../models/ytelse/sykepenger';
import { getPeriode } from '../person/periodeMock';
import { fyllRandomListe } from '../utils/mock-utils';
import { getHistoriskUtbetaling, getKommendeUtbetaling, getUtbetalingPåVent } from './ytelse-utbetalinger-mock';
import { HistoriskUtbetaling, KommendeUtbetaling, UtbetalingPåVent } from '../../models/ytelse/ytelse-utbetalinger';

export function getSykepenger(fødselsnummer: string): SykepengerResponse {
    faker.seed(Number(fødselsnummer));
    navfaker.seed(fødselsnummer);

    return {
        bruker: fødselsnummer,
        perioder: fyllRandomListe<Sykmeldingsperiode>(() => getSykmeldingsperiode(fødselsnummer), 10)
    };
}

function getSykmeldingsperiode(fødselsnummer: string): Sykmeldingsperiode {
    return {
        fødselsnummer: fødselsnummer,
        sykmeldtFom: moment(faker.date.recent()).format(moment.ISO_8601.__momentBuiltinFormatBrand),
        forbrukteDager: navfaker.random.integer(100),
        ferie1: getPeriode(),
        ferie2: getPeriode(),
        sanksjon: getPeriode(),
        stansårsak: faker.lorem.words(5),
        unntakAktivitet: faker.lorem.words(1),
        forsikring: getForsikring(),
        sykmeldinger: fyllRandomListe<Sykmelding>(() => getSykmelding(), 3),
        historiskeUtbetalinger: fyllRandomListe<HistoriskUtbetaling>(() => getHistoriskUtbetaling(faker), 5),
        kommendeUtbetalinger: fyllRandomListe<KommendeUtbetaling>(() => getKommendeUtbetaling(faker), 5),
        utbetalingerPåVent: fyllRandomListe<UtbetalingPåVent>(() => getUtbetalingPåVent(faker), 5),
        bruker: fødselsnummer,
        midlertidigStanset: moment(faker.date.recent()).format(moment.ISO_8601.__momentBuiltinFormatBrand)
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

function getSykmelding(): Sykmelding {
    return {
        sykmelder: faker.name.firstName() + ' ' + faker.name.lastName(),
        behandlet: moment(faker.date.recent()).format(moment.ISO_8601.__momentBuiltinFormatBrand),
        sykmeldt: getPeriode(),
        sykmeldingsgrad: navfaker.random.integer(100),
        gjelderYrkesskade: getYrkesskade()
    };
}

function getYrkesskade(): Yrkesskade {
    return {
        yrkesskadeart: faker.lorem.words(3),
        skadet: moment(faker.date.recent()).format(moment.ISO_8601.__momentBuiltinFormatBrand),
        vedtatt: moment(faker.date.recent()).format(moment.ISO_8601.__momentBuiltinFormatBrand)
    };
}