import { Traad } from '../../models/meldinger/meldinger';

export interface OppgaveState {
    dialogpanelTraad?: Traad;
}

export const initialState: OppgaveState = {
    dialogpanelTraad: undefined
};

export enum OppgaveActionTypes {
    SetDialogpanelTraad = 'SetValgtOppgavepanelTraad',
    NullstillDialogpanelTraad = 'NullstillDialogpanelTraad'
}

export interface SetValgtTraad {
    type: OppgaveActionTypes.SetDialogpanelTraad;
    traad?: Traad;
}

export interface NullstillValgtTraad {
    type: OppgaveActionTypes.NullstillDialogpanelTraad;
}

export type OppgaveActions = SetValgtTraad | NullstillValgtTraad;
