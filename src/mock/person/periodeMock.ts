import { Periode } from '../../models/tid';
import { getSistOppdatert } from '../utils/mock-utils';
import moment from 'moment';
import { backendDatoformat } from '../../utils/date-utils';

export function getPeriode(): Periode {
    return {
        fra: getSistOppdatert(),
        til: getSistOppdatert()
    };
}

export function getPeriodeRange(faker: Faker.FakerStatic, years: number): Periode {
    return {
        fra: moment(faker.date.past(years)).format(backendDatoformat),
        til: moment(faker.date.past(years)).format(backendDatoformat)
    };
}
