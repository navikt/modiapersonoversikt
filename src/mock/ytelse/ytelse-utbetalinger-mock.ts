import * as moment from 'moment';

import {
    HistoriskUtbetaling,
    KommendeUtbetaling,
    KreditorTrekk,
    UtbetalingPåVent
} from '../../models/ytelse/ytelse-utbetalinger';
import { getPeriodeRange } from '../person/periodeMock';
import FakerStatic = Faker.FakerStatic;
import { backendDatoformat, fyllRandomListe } from '../utils/mock-utils';

export function getHistoriskUtbetaling(faker: FakerStatic): HistoriskUtbetaling {
    return {
        vedtak: getPeriodeRange(faker, 2),
        utbetalingsgrad: faker.random.number(100),
        utbetalingsdato: moment(faker.date.recent()).format(backendDatoformat),
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
        vedtak: getPeriodeRange(faker, 2),
        utbetalingsgrad: faker.random.number(100),
        utbetalingsdato: moment(faker.date.recent()).format(backendDatoformat),
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
        vedtak: getPeriodeRange(faker, 2),
        utbetalingsgrad: faker.random.number(100),
        oppgjørstype: 'Oppgjørstype',
        arbeidskategori: 'Arbeidskategori',
        stansårsak: 'Stansårsak',
        ferie1: getPeriodeRange(faker, 2),
        ferie2: getPeriodeRange(faker, 2),
        sanksjon: getPeriodeRange(faker, 2),
        sykmeldt: getPeriodeRange(faker, 2)
    };
}

function getKreditortrekk(faker: FakerStatic): KreditorTrekk {
    return {
        kreditorsNavn: faker.company.companyName(),
        beløp: Number(faker.commerce.price())
    };
}