import * as faker from 'faker/locale/nb_NO';
import * as moment from 'moment';

import navfaker from 'nav-faker/dist/index';

import {
    Skatt,
    Trekk,
    Utbetaling,
    UtbetalingerResponse,
    Ytelse,
    YtelsePeriode,
    Ytelseskomponent
} from '../models/utbetalinger';
import { fyllRandomListe, vektetSjanse } from './utils/mock-utils';

export function getMockUtbetalinger(fødselsnummer: string): UtbetalingerResponse {
    faker.seed(Number(fødselsnummer));
    navfaker.seed(fødselsnummer + 'utbetalinger');

    return {
        utbetalinger: getUtbetalinger()
    };
}

function getUtbetalinger() {
    if (navfaker.random.vektetSjanse(0.3)) {
        return [];
    }

    return Array(navfaker.random.integer(20, 1)).fill(null).map(getMockUtbetaling);
}

export function getMockUtbetaling(): Utbetaling {
    const randomDato = () => moment(faker.date.past(1)).format(moment.ISO_8601.__momentBuiltinFormatBrand);
    return {
        utbetaltTil: faker.name.firstName() + ' ' + faker.name.lastName(),
        nettobeløp: Number(faker.commerce.price()),
        posteringsdato: randomDato(),
        utbetalingsdato: vektetSjanse(faker, 0.5) ? randomDato() : null,
        forfallsdato: vektetSjanse(faker, 0.5) ? randomDato() : null,
        melding: 'Utbetalingsmelding',
        metode: 'Bankkontooverføring',
        status: randomStatus(),
        konto: Number(faker.finance.account(11)).toString(),
        ytelser: fyllRandomListe(() => getMockYtelse(), vektetSjanse(faker, 0.7) ? 1 : 3)
    };
}

export function getMockYtelse(): Ytelse {
    const nettobeløp = Number(faker.commerce.price()) * 10;
    const trekksum = -Number(faker.commerce.price());
    const skattsum = -Number(faker.commerce.price());
    return {
        type: navfaker.nav.ytelse(),
        ytelseskomponentListe: fyllRandomListe<Ytelseskomponent>(() => getYtelseskomponent(), 10),
        ytelseskomponentersum: nettobeløp,
        trekkListe: fyllRandomListe<Trekk>(() => getTrekk(), 5),
        trekksum: trekksum,
        skattListe: fyllRandomListe<Skatt>(() => getSkatt(), 5),
        skattsum: skattsum,
        nettobeløp: nettobeløp + trekksum + skattsum,
        periode: getPeriode(),
        bilagsnummer: faker.finance.account(10)
    };
}

function getYtelseskomponent(): Ytelseskomponent {
    return {
        ytelseskomponenttype: 'Komponenttype',
        satsbeløp: Number(faker.commerce.price()),
        satstype: 'Satstype',
        satsantall: navfaker.random.integer(10, 1),
        ytelseskomponentbeløp: Number(faker.commerce.price())
    };
}

function getTrekk(): Trekk {
    return {
        trekktype: 'Prosenttrekk',
        trekkbeløp: -Number(faker.commerce.price()),
        kreditor: faker.company.companyName()
    };
}

function getSkatt(): Skatt {
    return {
        skattebeløp: -Number(faker.commerce.price())
    };
}

function getPeriode(): YtelsePeriode {
    return {
        start: moment(faker.date.recent()).format(moment.ISO_8601.__momentBuiltinFormatBrand),
        slutt: moment(faker.date.recent()).format(moment.ISO_8601.__momentBuiltinFormatBrand)
    };
}

function randomStatus() {
    return navfaker.random.arrayElement([
        'Ligger hos banken',
        'Utbetalt',
        'Returnert for saksbehandling'
    ]);
}
