import { Traad } from '../../models/meldinger/meldinger';
import { NullstillValgtTraad, OppgaveActionTypes, SetValgtEnhet, SetValgtTraad } from './types';
import { Enhet } from '../../models/meldinger/oppgave';

export function setValgtTraadDialogpanel(traad: Traad): SetValgtTraad {
    return {
        type: OppgaveActionTypes.SetDialogpanelTraad,
        traad: traad
    };
}

export function setValgtEnhet(enhet: Enhet): SetValgtEnhet {
    return {
        type: OppgaveActionTypes.SetValgtEnhet,
        valgtEnhet: enhet
    };
}

export function setIngenValgtTraadDialogpanel(): NullstillValgtTraad {
    return {
        type: OppgaveActionTypes.NullstillDialogpanelTraad
    };
}
