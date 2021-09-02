import dayjs from 'dayjs';

export interface VisOppfolgingFraTilDato {
    fra: string;
    til: string;
}

export interface OppfolgingState {
    valgtPeriode: VisOppfolgingFraTilDato;
    sykefravaerEkspandert: boolean;
    ytelserEkspandert: boolean;
}

export const initialState: OppfolgingState = {
    valgtPeriode: {
        fra: dayjs()
            .subtract(2, 'month')
            .format('YYYY-MM-DD'),
        til: dayjs()
            .add(1, 'month')
            .format('YYYY-MM-DD')
    },
    sykefravaerEkspandert: false,
    ytelserEkspandert: false
};

export enum OppfolgingActionTypes {
    SetValgtPeriode = 'SetValgtPeriode',
    SetSykefravaerEkspandert = 'SetSykefraværEkspandert',
    SetYtelserEkspandert = 'SetYtelserEkspandert'
}

export interface SetValgtPeriode {
    type: OppfolgingActionTypes.SetValgtPeriode;
    periodeEndring: Partial<VisOppfolgingFraTilDato>;
}

export interface SetSykefravaerEkspandertAction {
    type: OppfolgingActionTypes.SetSykefravaerEkspandert;
    ekspandert: boolean;
}

export interface SetYtelserEkspandertAction {
    type: OppfolgingActionTypes.SetYtelserEkspandert;
    ekspandert: boolean;
}

export type OppfolgingActions = SetValgtPeriode | SetSykefravaerEkspandertAction | SetYtelserEkspandertAction;
