import { Periode } from '../../models/periode';
import { getSistOppdatert } from '../utils/mock-utils';
import moment from 'moment';
import { backendDatoformat } from '../../utils/dateUtils';

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
