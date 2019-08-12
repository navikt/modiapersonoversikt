import { Traad } from '../../models/meldinger/meldinger';
import { OppgaveActionTypes, SetValgtTraad } from './types';

export function setDialogpanelTraad(traad?: Traad): SetValgtTraad {
    return {
        type: OppgaveActionTypes.SetDialogpanelTraad,
        traad: traad
    };
}
