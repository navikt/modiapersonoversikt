import type { PeriodeOptions } from '../utbetalinger/types';
import { OppfolgingActionTypes, type SetValgtPeriode } from './types';

export function settValgtPeriode(change: PeriodeOptions): SetValgtPeriode {
    return {
        type: OppfolgingActionTypes.SetValgtPeriode,
        periodeEndring: change
    };
}
