import moment from 'moment';

export interface VisOppfolgingFraTilDato {
    fra: Date;
    til: Date;
}

export interface OppfolgingState {
    valgtPeriode: VisOppfolgingFraTilDato;
    sykefraværEkspandert: boolean;
    ytelserEkspandert: boolean;
}

export const initialState: OppfolgingState = {
    valgtPeriode: {
        fra: moment()
            .subtract(2, 'month')
            .toDate(),
        til: moment()
            .add(1, 'month')
            .toDate()
    },
    sykefraværEkspandert: false,
    ytelserEkspandert: false
};

export enum OppfolgingActionTypes {
    SetValgtPeriode = 'SetValgtPeriode',
    SetSykefraværEkspandert = 'SetSykefraværEkspandert',
    SetYtelserEkspandert = 'SetYtelserEkspandert'
}

export interface SetValgtPeriode {
    type: OppfolgingActionTypes.SetValgtPeriode;
    periodeEndring: Partial<VisOppfolgingFraTilDato>;
}

export interface SetSykefraværEkspandertAction {
    type: OppfolgingActionTypes.SetSykefraværEkspandert;
    ekspandert: boolean;
}

export interface SetYtelserEkspandertAction {
    type: OppfolgingActionTypes.SetYtelserEkspandert;
    ekspandert: boolean;
}

export type OppfolgingActions = SetValgtPeriode | SetSykefraværEkspandertAction | SetYtelserEkspandertAction;
