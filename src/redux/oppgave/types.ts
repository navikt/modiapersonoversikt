import { Traad } from '../../models/meldinger/meldinger';
import { Enhet } from '../../models/meldinger/oppgave';

export interface OppgaveState {
    dialogpanelTraad?: Traad;
    valgtEnhet?: Enhet;
}

export const initialState: OppgaveState = {
    dialogpanelTraad: undefined,
    valgtEnhet: undefined
};

export enum OppgaveActionTypes {
    SetDialogpanelTraad = 'SetValgtOppgavepanelTraad',
    SetValgtEnhet = 'SetValgtEnhet',
    NullstillDialogpanelTraad = 'NullstillDialogpanelTraad'
}

export interface SetValgtTraad {
    type: OppgaveActionTypes.SetDialogpanelTraad;
    traad?: Traad;
}

export interface SetValgtEnhet {
    type: OppgaveActionTypes.SetValgtEnhet;
    valgtEnhet?: Enhet;
}

export interface NullstillValgtTraad {
    type: OppgaveActionTypes.NullstillDialogpanelTraad;
}

export type OppgaveActions = SetValgtTraad | SetValgtEnhet | NullstillValgtTraad;
