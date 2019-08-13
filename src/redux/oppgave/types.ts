import { Traad } from '../../models/meldinger/meldinger';

export interface OppgaveState {
    dialogpanelTraad?: Traad;
}

export const initialState: OppgaveState = {
    dialogpanelTraad: undefined
};

export enum OppgaveActionTypes {
    SetDialogpanelTraad = 'SetValgtOppgavepanelTraad'
}

export interface SetValgtTraad {
    type: OppgaveActionTypes.SetDialogpanelTraad;
    traad?: Traad;
}

export type OppgaveActions = SetValgtTraad;
