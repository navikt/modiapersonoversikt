export interface VisOppfolgingFraTilDato {
    fra: string;
    til: string;
}

export interface OppfolgingState {
    valgtPeriode: VisOppfolgingFraTilDato;
    sykefraværEkspandert: boolean;
    ytelserEkspandert: boolean;
}

const fraDato = () => {
    const dato = new Date();
    dato.setMonth(dato.getMonth() - 2);
    return dato.toLocaleDateString('en-CA');
};

const tilDato = () => {
    const dato = new Date();
    dato.setMonth(dato.getMonth() + 1);
    return dato.toLocaleDateString('en-CA');
};

export const initialState: OppfolgingState = {
    valgtPeriode: {
        fra: fraDato(),
        til: tilDato()
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
