import {
    OppfolgingActionTypes,
    SetSykefraverEkspandertAction,
    SetValgtPeriode,
    SetYtelserEkspandertAction
} from './types';
import { PeriodeOptions } from '../utbetalinger/types';

export function settValgtPeriode(change: PeriodeOptions): SetValgtPeriode {
    return {
        type: OppfolgingActionTypes.SetValgtPeriode,
        periodeEndring: change
    };
}

export function setYtelserEkspandert(ekspandert: boolean): SetYtelserEkspandertAction {
    return {
        type: OppfolgingActionTypes.SetYtelserEkspandert,
        ekspandert: ekspandert
    };
}

export function setSykefraverEkspandert(ekspandert: boolean): SetSykefraverEkspandertAction {
    return {
        type: OppfolgingActionTypes.SetSykefraverEkspandert,
        ekspandert: ekspandert
    };
}
