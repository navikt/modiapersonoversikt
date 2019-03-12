import moment from 'moment';

export interface VisOppfolgingFraTilDato {
    fra: Date;
    til: Date;
}

export interface OppfolgingState {
    valgtPeriode: VisOppfolgingFraTilDato;
}

export const initialState: OppfolgingState = {
    valgtPeriode: {
        fra: moment()
            .subtract(2, 'month')
            .toDate(),
        til: moment()
            .add(1, 'month')
            .toDate()
    }
};

export enum OppfolgingActionTypes {
    SetValgtPeriode = 'SetValgtPeriode'
}

export interface SetValgtPeriode {
    type: OppfolgingActionTypes.SetValgtPeriode;
    periodeEndring: Partial<VisOppfolgingFraTilDato>;
}

export type OppfolgingActions = SetValgtPeriode;
