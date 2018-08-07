import * as faker from 'faker/locale/nb_NO';
import * as moment from 'moment';

import navfaker from 'nav-faker/dist/index';

import {
    Foreldrepengerperiode,
    ForeldrepengerResponse,
    Foreldrepengerrettighet
} from '../../models/ytelse/foreldrepenger';
import { getPeriode } from '../person/periodeMock';
import { fyllRandomListe } from '../utils/mock-utils';
import { getHistoriskUtbetaling, getKommendeUtbetaling } from './ytelse-utbetalinger-mock';

export function getForeldrepenger(fødselsnummer: string): ForeldrepengerResponse {
    faker.seed(Number(fødselsnummer));
    navfaker.seed(fødselsnummer);

    return {
        foreldrepenger: getForeldrepengerrettighet(fødselsnummer)
    };
}

function getForeldrepengerrettighet(fødselsnummer: string): Foreldrepengerrettighet {
    return {
        forelder: fødselsnummer,
        andreForeldersFnr: navfaker.fødselsnummer.generer(),
        antallBarn: navfaker.random.number(5),
        barnetsFødselsdato: moment(faker.date.recent()).format(moment.ISO_8601.__momentBuiltinFormatBrand),
        dekningsgrad: navfaker.random.number(95),
        fedrekvoteTom: moment(faker.date.recent()).format(moment.ISO_8601.__momentBuiltinFormatBrand),
        mødrekvoteTom: moment(faker.date.recent()).format(moment.ISO_8601.__momentBuiltinFormatBrand),
        foreldrepengetype: 'FTYPE',
        graderingsdager: navfaker.random.number(100),
        restDager: navfaker.random.number(50),
        rettighetFom: moment(faker.date.recent()).format(moment.ISO_8601.__momentBuiltinFormatBrand),
        eldsteIdDato: moment(faker.date.recent()).format(moment.ISO_8601.__momentBuiltinFormatBrand),
        periode: fyllRandomListe(() => getForeldrepengerperiode(fødselsnummer), 10)
    };
}

function getForeldrepengerperiode(fødselsnummer: string): Foreldrepengerperiode {
    return {
        fødselsnummer: fødselsnummer,
        harAleneomsorgFar: faker.random.boolean(),
        harAleneomsorgMor: faker.random.boolean(),
        arbeidsprosentMor: navfaker.random.number(100),
        avslagsårsak: 'AVSLAG',
        avslått: 'AVSLÅTT',
        disponibelGradering: navfaker.random.number(75),
        erFedrekvote: faker.random.boolean(),
        erMødrekvote: faker.random.boolean(),
        forskyvelsesårsak1: 'FÅRSAK1',
        forskyvelsesperiode1: getPeriode(),
        forskyvelsesårsak2: 'FÅRSAK2',
        forskyvelsesperiode2: getPeriode(),
        foreldrepengerFom: moment(faker.date.recent()).format(moment.ISO_8601.__momentBuiltinFormatBrand),
        midlertidigStansDato: moment(faker.date.recent()).format(moment.ISO_8601.__momentBuiltinFormatBrand),
        morSituasjon: faker.lorem.words(5),
        rettTilFedrekvote: 'RETTF',
        rettTilMødrekvote: 'RETTM',
        stansårsak: 'STANS',
        historiskeUtbetalinger: fyllRandomListe(() => getHistoriskUtbetaling(faker), 5),
        kommendeUtbetalinger: fyllRandomListe(() => getKommendeUtbetaling(faker), 5)
    };
}