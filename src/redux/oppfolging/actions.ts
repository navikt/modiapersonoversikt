import { OppfolgingActionTypes, SetValgtPeriode, VisOppfolgingFraTilDato } from './types';

export function settValgtPeriode(change: Partial<VisOppfolgingFraTilDato>): SetValgtPeriode {
    return {
        type: OppfolgingActionTypes.SetValgtPeriode,
        periodeEndring: change
    };
}
