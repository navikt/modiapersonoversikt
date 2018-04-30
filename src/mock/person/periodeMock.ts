import { Periode } from '../../models/periode';
import { getSistOppdatert } from '../utils/mock-utils';

export function getPeriode(): Periode {
    return {
        fra: getSistOppdatert(),
        til: getSistOppdatert()
    };
}