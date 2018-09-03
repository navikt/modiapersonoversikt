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
import { fyllRandomListe } from './utils/mock-utils';
import FakerStatic = Faker.FakerStatic;

export function getMockUtbetalinger(fødselsnummer: string): UtbetalingerResponse {
    faker.seed(Number(fødselsnummer));
    navfaker.seed(fødselsnummer + 'utbetaling');

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

function randomDato(seededFaker: FakerStatic) {
    return moment(seededFaker.date.past(2)).format(moment.ISO_8601.__momentBuiltinFormatBrand);
}

export function getMockUtbetaling(): Utbetaling {
    const status = randomStatus();
    const utbetalingsDato = status === 'Utbetalt' ? randomDato(faker) : null;
    const ytelser = fyllRandomListe(() => getMockYtelse(), navfaker.random.vektetSjanse( 0.7) ? 1 : 3);
    const netto = ytelser.reduce((acc: number, ytelse: Ytelse) => acc + ytelse.nettobeløp, 0);
    return {
        utbetaltTil: faker.name.firstName() + ' ' + faker.name.lastName(),
        nettobeløp: netto,
        posteringsdato: randomDato(faker),
        utbetalingsdato: utbetalingsDato,
        forfallsdato: navfaker.random.vektetSjanse( 0.5) ? randomDato(faker) : null,
        melding: 'Utbetalingsmelding',
        metode: 'Bankkontooverføring',
        status: status,
        konto: Number(faker.finance.account(11)).toString(),
        ytelser: ytelser
    };
}

export function getMockYtelse(): Ytelse {
    const ytelseskomponentListe = fyllRandomListe<Ytelseskomponent>(() => getYtelseskomponent(), 5);
    const trekkListe = navfaker.random.vektetSjanse(0.7) ? fyllRandomListe<Trekk>(() => getTrekk(), 3) : [];
    const skattListe = navfaker.random.vektetSjanse(0.7) ? fyllRandomListe<Skatt>(() => getSkatt(), 2) : [];
    const brutto = ytelseskomponentListe.reduce((acc, komponent) => acc + komponent.ytelseskomponentbeløp, 0);
    const trekksum = trekkListe.reduce((acc, trekk) => acc + trekk.trekkbeløp, 0);
    const skattsum = skattListe.reduce((acc, skatt) => acc + skatt.skattebeløp, 0);
    return {
        type: navfaker.nav.ytelse(),
        ytelseskomponentListe: ytelseskomponentListe,
        ytelseskomponentersum: brutto,
        trekkListe: trekkListe,
        trekksum: trekksum,
        skattListe: skattListe,
        skattsum: skattsum,
        nettobeløp: brutto + trekksum + skattsum,
        periode: getPeriode(),
        bilagsnummer: faker.finance.account(10)
    };
}

function getYtelseskomponent(): Ytelseskomponent {
    const satsbeløp = Number(faker.commerce.price()) * 2;
    const satsantall = navfaker.random.integer(10, 1);
    return {
        ytelseskomponenttype: faker.commerce.product(),
        satsbeløp: satsbeløp,
        satstype: 'Satstype',
        satsantall: satsantall,
        ytelseskomponentbeløp: satsbeløp * satsantall
    };
}

function getTrekk(): Trekk {
    return {
        trekktype: 'Prosenttrekk',
        trekkbeløp: -Number(faker.commerce.price()) * 2,
        kreditor: faker.company.companyName()
    };
}

function getSkatt(): Skatt {
    return {
        skattebeløp: -Number(faker.commerce.price()) * 2
    };
}

function getPeriode(): YtelsePeriode {
    return {
        start: randomDato(faker),
        slutt: randomDato(faker)
    };
}

function randomStatus() {
    return navfaker.random.arrayElement([
        'Ligger hos banken',
        'Utbetalt',
        'Returnert til NAV for saksbehandling'
    ]);
}
