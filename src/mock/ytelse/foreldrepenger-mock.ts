import * as faker from 'faker/locale/nb_NO';
import * as moment from 'moment';

import navfaker from 'nav-faker/dist/index';

import {
    Foreldrepengerperiode,
    ForeldrepengerResponse,
    Foreldrepengerrettighet
} from '../../models/ytelse/foreldrepenger';
import { getPeriode } from '../person/periodeMock';
import { backendDatoformat, fyllRandomListe, vektetSjanse } from '../utils/mock-utils';
import { getHistoriskUtbetaling, getKommendeUtbetaling } from './ytelse-utbetalinger-mock';
import { HistoriskUtbetaling, KommendeUtbetaling } from '../../models/ytelse/ytelse-utbetalinger';

export function getMockForeldrepenger(fødselsnummer: string): ForeldrepengerResponse {
    faker.seed(Number(fødselsnummer));
    navfaker.seed(fødselsnummer + 'foreldrepenger');

    if (navfaker.random.vektetSjanse(0.3)) {
        return {
            foreldrepenger: null
        };
    }

    return {
        foreldrepenger: getForeldrepengerrettighetMock(fødselsnummer)
    };
}

export function getForeldrepengerrettighetMock(fødselsnummer: string): Foreldrepengerrettighet {
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
        rettighetFom: vektetSjanse(faker, 0.5) ? moment(faker.date.recent()).format(backendDatoformat) : null,
        eldsteIdDato: vektetSjanse(faker, 0.5) ? moment(faker.date.recent()).format(backendDatoformat) : null,
        periode: fyllRandomListe<Foreldrepengerperiode>(() => getForeldrepengerperiodeMock(fødselsnummer), 5),
        foreldreAvSammeKjønn: vektetSjanse(faker, 0.5) ? 'Begge er pappaer' : null,
    };
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
        midlertidigStansDato: vektetSjanse(faker, 0.5) ?  moment(faker.date.recent()).format(backendDatoformat) : null,
        morSituasjon: vektetSjanse(faker, 0.5) ? faker.lorem.words(5) : null,
        rettTilFedrekvote: vektetSjanse(faker, 0.5) ? 'Rett til fedrekvote' : 'Ingen rett til fedrekvote',
        rettTilMødrekvote: vektetSjanse(faker, 0.5) ? 'Rett til mødrekvote' : 'Ingen rett til mødrekvote',
        stansårsak: vektetSjanse(faker, 0.5) ? 'Avsluttet' : null,
        historiskeUtbetalinger: fyllRandomListe<HistoriskUtbetaling>(() => getHistoriskUtbetaling(faker), 5),
        kommendeUtbetalinger: fyllRandomListe<KommendeUtbetaling>(() => getKommendeUtbetaling(faker), 5)
    };
}

function foreldrePengeType(): string {
    return navfaker.random.arrayElement([
        'Fødselspenger'
    ]);
}