import { Traad } from '../../models/meldinger/meldinger';
import { NullstillValgtTraad, OppgaveActionTypes, SetValgtTraad } from './types';

export function setDialogpanelTraad(traad: Traad): SetValgtTraad {
    return {
        type: OppgaveActionTypes.SetDialogpanelTraad,
        traad: traad
    };
}

export function setIngenTraadBesvaresIDialogpanel(): NullstillValgtTraad {
    return {
        type: OppgaveActionTypes.NullstillDialogpanelTraad
    };
}
