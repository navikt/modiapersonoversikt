import { Traad } from '../../models/meldinger/meldinger';
import { NullstillValgtTraad, OppgaveActionTypes, SetValgtTraad } from './types';

export function setValgtTraadDialogpanel(traad: Traad): SetValgtTraad {
    return {
        type: OppgaveActionTypes.SetDialogpanelTraad,
        traad: traad
    };
}

export function setIngenValgtTraadDialogpanel(): NullstillValgtTraad {
    return {
        type: OppgaveActionTypes.NullstillDialogpanelTraad
    };
}
