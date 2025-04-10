import type { Faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import type { KommendeUtbetaling, UtbetalingPaaVent } from 'src/models/ytelse/ytelse-utbetalinger';
import { backendDatoformat } from 'src/utils/date-utils';
import { getPeriodeRange } from '../periodeMock';

export function getKommendeUtbetaling(faker: Faker): KommendeUtbetaling {
    return {
        vedtak: getPeriodeRange(faker, 2),
        utbetalingsgrad: faker.number.int(100),
        utbetalingsdato: dayjs(faker.date.past({ years: 2 })).format(backendDatoformat),
        bruttobelop: Number(faker.commerce.price()),
        arbeidsgiverNavn: faker.company.name(),
        arbeidsgiverOrgNr: '1234567890',
        arbeidsgiverKontonr: Number(faker.finance.accountNumber(9)).toString(),
        dagsats: Number(faker.commerce.price()),
        saksbehandler: `${faker.person.firstName()} ${faker.person.lastName()}`,
        type: 'KONTOØVERFØRING'
    };
}

export function getUtbetalingPåVent(faker: Faker): UtbetalingPaaVent {
    return {
        vedtak: getPeriodeRange(faker, 2),
        utbetalingsgrad: faker.number.int(100),
        oppgjorstype: 'Oppgjørstype',
        arbeidskategori: 'Arbeidskategori',
        stansaarsak: faker.datatype.boolean() ? 'Pga mistenkelig oppførsel' : null,
        ferie1: getPeriodeRange(faker, 2),
        ferie2: getPeriodeRange(faker, 2),
        sanksjon: getPeriodeRange(faker, 2),
        sykmeldt: getPeriodeRange(faker, 2)
    };
}
