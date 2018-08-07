import * as moment from 'moment';

import {
    HistoriskUtbetaling,
    KommendeUtbetaling,
    KreditorTrekk,
    UtbetalingPåVent
} from '../../models/ytelse/ytelse-utbetalinger';
import { getPeriode } from '../person/periodeMock';
import FakerStatic = Faker.FakerStatic;
import { fyllRandomListe } from '../utils/mock-utils';

export function getHistoriskUtbetaling(faker: FakerStatic): HistoriskUtbetaling {
    return {
        vedtak: getPeriode(),
        utbetalingsgrad: faker.random.number(100),
        utbetalingsdato: moment(faker.date.recent()).format(moment.ISO_8601.__momentBuiltinFormatBrand),
        nettobeløp: Number(faker.commerce.price()),
        bruttobeløp: Number(faker.commerce.price()),
        skattetrekk: Number(faker.random.number(50)),
        arbeidsgiverNavn: faker.company.companyName(),
        arbeidsgiverOrgNr: '1234567890',
        dagsats: Number(faker.commerce.price()),
        type: 'KONTOØVERFØRING',
        trekk: fyllRandomListe(() => getKreditortrekk(faker), 3)
    };
}

export function getKommendeUtbetaling(faker: FakerStatic): KommendeUtbetaling {
    return {
        vedtak: getPeriode(),
        utbetalingsgrad: faker.random.number(100),
        utbetalingsdato: moment(faker.date.recent()).format(moment.ISO_8601.__momentBuiltinFormatBrand),
        bruttobeløp: Number(faker.commerce.price()),
        arbeidsgiverNavn: faker.company.companyName(),
        arbeidsgiverOrgNr: '1234567890',
        arbeidsgiverKontonr: Number(faker.finance.account(9)).toString(),
        dagsats: Number(faker.commerce.price()),
        saksbehandler: faker.name.firstName() + ' ' + faker.name.lastName(),
        type: 'KONTOØVERFØRING'
    };
}

export function getUtbetalingPåVent(faker: FakerStatic): UtbetalingPåVent {
    return {
        vedtak: getPeriode(),
        utbetalingsgrad: faker.random.number(100),
        oppgjørstype: 'Oppgjørstype',
        arbeidskategori: 'Arbeidskategori',
        stansårsak: 'Stansårsak',
        ferie1: getPeriode(),
        ferie2: getPeriode(),
        sanksjon: getPeriode(),
        sykmeldt: getPeriode()
    };
}

function getKreditortrekk(faker: FakerStatic): KreditorTrekk {
    return {
        kreditorsNavn: faker.company.companyName(),
        beløp: Number(faker.commerce.price())
    };
}