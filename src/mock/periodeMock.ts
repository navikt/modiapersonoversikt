import dayjs from 'dayjs';
import { Periode } from '../models/tid';
import { backendDatoformat } from '../utils/date-utils';
import { getSistOppdatert } from './utils/mock-utils';

export function getPeriode(): Periode {
    return {
        fra: getSistOppdatert(),
        til: getSistOppdatert()
    };
}

export function getPeriodeRange(faker: Faker.FakerStatic, years: number): Periode {
    return {
        fra: dayjs(faker.date.past(years)).format(backendDatoformat),
        til: dayjs(faker.date.past(years)).format(backendDatoformat)
    };
}
