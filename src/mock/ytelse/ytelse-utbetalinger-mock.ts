import dayjs from 'dayjs';
import { KommendeUtbetaling, UtbetalingPåVent } from '../../models/ytelse/ytelse-utbetalinger';
import { backendDatoformat } from '../../utils/date-utils';
import { getPeriodeRange } from '../periodeMock';

export function getKommendeUtbetaling(faker: Faker.FakerStatic): KommendeUtbetaling {
    return {
        vedtak: getPeriodeRange(faker, 2),
        utbetalingsgrad: faker.random.number(100),
        utbetalingsdato: dayjs(faker.date.past(2)).format(backendDatoformat),
        bruttobeløp: Number(faker.commerce.price()),
        arbeidsgiverNavn: faker.company.companyName(),
        arbeidsgiverOrgNr: '1234567890',
        arbeidsgiverKontonr: Number(faker.finance.account(9)).toString(),
        dagsats: Number(faker.commerce.price()),
        saksbehandler: faker.name.firstName() + ' ' + faker.name.lastName(),
        type: 'KONTOØVERFØRING'
    };
}

export function getUtbetalingPåVent(faker: Faker.FakerStatic): UtbetalingPåVent {
    return {
        vedtak: getPeriodeRange(faker, 2),
        utbetalingsgrad: faker.random.number(100),
        oppgjørstype: 'Oppgjørstype',
        arbeidskategori: 'Arbeidskategori',
        stansårsak: faker.random.boolean() ? 'Pga mistenkelig oppførsel' : null,
        ferie1: getPeriodeRange(faker, 2),
        ferie2: getPeriodeRange(faker, 2),
        sanksjon: getPeriodeRange(faker, 2),
        sykmeldt: getPeriodeRange(faker, 2)
    };
}
