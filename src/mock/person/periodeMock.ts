import { Periode } from '../../models/periode';
import { backendDatoformat, getSistOppdatert } from '../utils/mock-utils';
import moment from 'moment';

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
