import type { Traad, TraadType } from '../../../../models/meldinger/meldinger';
import type { Temagruppe } from '../../../../models/temagrupper';
import type { JournalforingsSak } from '../../infotabs/meldinger/traadvisning/verktoylinje/journalforing/JournalforingPanel';
import type { OppgavelisteValg } from '../sendMelding/SendNyMelding';

export enum DialogPanelStatus {
    UNDER_ARBEID = 0,
    POSTING = 1,
    ERROR = 2,
    SVAR_SENDT = 3
}

export type KvitteringsData = {
    fritekst: string;
    temagruppe?: Temagruppe;
    traad: Traad;
};

interface DialogStatusInterface {
    type: DialogPanelStatus;
}

interface UnderArbeid extends DialogStatusInterface {
    type: DialogPanelStatus.UNDER_ARBEID | DialogPanelStatus.POSTING | DialogPanelStatus.ERROR;
}

interface SvarSendtSuccess extends DialogStatusInterface {
    type: DialogPanelStatus.SVAR_SENDT;
    kvitteringsData: KvitteringsData;
}

export type FortsettDialogPanelState = UnderArbeid | SvarSendtSuccess;

export interface FortsettDialogState {
    tekst: string;
    traadType: TraadType;
    temagruppe?: Temagruppe;
    oppgaveListe: OppgavelisteValg;
    sak?: JournalforingsSak;
    visFeilmeldinger: boolean;
    errors?: Error[];
    avsluttet?: boolean;
}
