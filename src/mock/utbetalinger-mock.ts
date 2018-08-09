import * as faker from 'faker/locale/nb_NO';
import * as moment from 'moment';

import navfaker from 'nav-faker/dist/index';

import { Utbetaling, UtbetalingerResponse, Ytelse, YtelsePeriode } from '../models/utbetalinger';

export function getMockUtbetalinger(fødselsnummer: string): UtbetalingerResponse {
    faker.seed(Number(fødselsnummer));
    navfaker.seed(fødselsnummer);

    return {
        utbetalinger: getUtbetalinger()
    };
}

function getUtbetalinger() {
    if (navfaker.random.vektetSjanse(0.3)) {
        return [];
    }

    return Array(navfaker.random.integer(20, 1)).fill(null).map(getUtbetaling);
}

function getUtbetaling(): Utbetaling {
    return {
        utbetaltTil: faker.name.firstName() + ' ' + faker.name.lastName(),
        nettobeløp: Number(faker.commerce.price()),
        posteringsdato: moment(faker.date.recent()).format(moment.ISO_8601.__momentBuiltinFormatBrand),
        utbetalingsdato: moment(faker.date.recent()).format(moment.ISO_8601.__momentBuiltinFormatBrand),
        forfallsdato: moment(faker.date.recent()).format(moment.ISO_8601.__momentBuiltinFormatBrand),
        melding: 'Utbetalingsmelding',
        metode: 'Bankkontooverføring',
        status: randomStatus(),
        konto: Number(faker.finance.account(11)).toString(),
        ytelser: [getYtelse()]
    };
}

function getYtelse(): Ytelse {
    return {
        type: navfaker.nav.ytelse(),
        nettobeløp: Number(faker.commerce.price()),
        periode: getPeriode()
    };
}

function getPeriode(): YtelsePeriode {
    return {
        start: moment(faker.date.recent()).format(moment.ISO_8601.__momentBuiltinFormatBrand),
        slutt: moment(faker.date.recent()).format(moment.ISO_8601.__momentBuiltinFormatBrand)
    };
}

function randomStatus() {
    if (navfaker.random.vektetSjanse(0.2)) {
        return 'Venter';
    } else if (navfaker.random.vektetSjanse(0.2)) {
        return 'Avvist';
    } else {
        return 'Fullført';
    }
}
