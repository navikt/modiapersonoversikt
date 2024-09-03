import { fakerNB_NO as faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import navfaker from 'nav-faker/dist/index';

import {
    Arbeidsgiver,
    Skatt,
    Trekk,
    Utbetaling,
    UtbetalingerResponse,
    Ytelse,
    YtelsePeriode,
    Ytelseskomponent
} from '../../models/utbetalinger';
import { fyllRandomListe, vektetSjanse } from '../utils/mock-utils';
import { backendDatoformat } from '../../utils/date-utils';
import { aremark } from '../persondata/aremark';

export function getMockUtbetalinger(fodselsnummer: string, startDato: string, sluttDato: string): UtbetalingerResponse {
    faker.seed(Number(fodselsnummer));
    navfaker.seed(fodselsnummer + 'utbetaling');

    return {
        utbetalinger: getUtbetalinger(fodselsnummer),
        periode: {
            startDato: startDato,
            sluttDato: sluttDato
        }
    };
}

const fjernDuplikatePosteringsdato = (utbetaling: Utbetaling, index: number, list: Utbetaling[]) =>
    list.findIndex((u) => u.posteringsdato === utbetaling.posteringsdato) === index;

function getUtbetalinger(fodselsnummer: string) {
    if (fodselsnummer === aremark.personIdent) {
        return [...new Array(5)].map(() => getMockUtbetaling());
    }
    if (navfaker.random.vektetSjanse(0.2)) {
        return [];
    }

    return fyllRandomListe(() => getMockUtbetaling(), 50).filter(fjernDuplikatePosteringsdato);
}

function randomDato(seededFaker: Faker.FakerStatic) {
    return dayjs(seededFaker.date.past(1.5)).startOf('day').format(backendDatoformat);
}

export function getMockUtbetaling(): Utbetaling {
    const status = randomStatus();
    const utbetalingsDato = status === 'Utbetalt' ? randomDato(faker) : null;
    const ytelser = fyllRandomListe(() => getMockYtelse(), navfaker.random.vektetSjanse(0.7) ? 1 : 3);
    const netto = ytelser.reduce((acc: number, ytelse: Ytelse) => acc + ytelse.nettobelop, 0);

    const utbetaltTilPerson = vektetSjanse(faker, 0.9);

    const posteringsdato = randomDato(faker);
    return {
        utbetaltTil: utbetaltTilPerson ? 'Person SomMottok Betaling' : 'Mottaker AS',
        erUtbetaltTilPerson: utbetaltTilPerson,
        erUtbetaltTilOrganisasjon: !utbetaltTilPerson,
        erUtbetaltTilSamhandler: !utbetaltTilPerson,
        nettobelop: netto,
        posteringsdato: posteringsdato,
        utbetalingsdato: utbetalingsDato,
        forfallsdato: navfaker.random.vektetSjanse(0.5) ? randomDato(faker) : null,
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
    const brutto = ytelseskomponentListe.reduce((acc, komponent) => acc + komponent.ytelseskomponentbelop, 0);
    const trekksum = trekkListe.reduce((acc, trekk) => acc + trekk.trekkbelop, 0);
    const skattsum = skattListe.reduce((acc, skatt) => acc + skatt.skattebelop, 0);
    return {
        type: navfaker.nav.ytelse(),
        ytelseskomponentListe: ytelseskomponentListe,
        ytelseskomponentersum: brutto,
        trekkListe: trekkListe,
        trekksum: trekksum,
        skattListe: skattListe,
        skattsum: skattsum,
        nettobelop: brutto + trekksum + skattsum,
        periode: getPeriode(),
        bilagsnummer: faker.finance.account(10),
        arbeidsgiver: navfaker.random.vektetSjanse(0.7) ? getArbeidsgiver() : null
    };
}

function getArbeidsgiver(): Arbeidsgiver {
    return {
        navn: faker.company.companyName(),
        orgnr: faker.finance.account(11)
    };
}

function getYtelseskomponent(): Ytelseskomponent {
    const satsbelop = Number(faker.commerce.price()) * 2;
    const satsantall = navfaker.random.integer(10, 1);
    return {
        ytelseskomponenttype: faker.commerce.product(),
        satsbelop: satsbelop,
        satstype: 'Satstype',
        satsantall: satsantall,
        ytelseskomponentbelop: satsbelop * satsantall
    };
}

function getTrekk(): Trekk {
    return {
        trekktype: 'Prosenttrekk',
        trekkbelop: -Number(faker.commerce.price()) * 2,
        kreditor: navfaker.random.vektetSjanse(0.7) ? faker.company.companyName() : null
    };
}

function getSkatt(): Skatt {
    return {
        skattebelop: -Number(faker.commerce.price()) * 2
    };
}

function getPeriode(): YtelsePeriode {
    return {
        start: randomDato(faker),
        slutt: randomDato(faker)
    };
}

function randomStatus() {
    return navfaker.random.arrayElement(['Ligger hos banken', 'Utbetalt', 'Returnert til NAV for saksbehandling']);
}
