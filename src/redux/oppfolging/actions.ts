import {
    OppfolgingActionTypes,
    SetSykefraværEkspandertAction,
    SetValgtPeriode,
    SetYtelserEkspandertAction,
    VisOppfolgingFraTilDato
} from './types';

export function settValgtPeriode(change: Partial<VisOppfolgingFraTilDato>): SetValgtPeriode {
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

export function setSykefraværEkspandert(ekspandert: boolean): SetSykefraværEkspandertAction {
    return {
        type: OppfolgingActionTypes.SetSykefraværEkspandert,
        ekspandert: ekspandert
    };
}
