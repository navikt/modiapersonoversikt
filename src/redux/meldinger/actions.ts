import { Traad } from '../../models/meldinger/meldinger';
import { MeldingerActionTypes, HuskValgtTraad, SetSkjulVarsler, HuskSok } from './types';

export function huskForrigeValgtTraad(traad?: Traad): HuskValgtTraad {
    return {
        type: MeldingerActionTypes.HuskValgtTraad,
        traad: traad
    };
}

export function setSkjulVarslerAction(skjul: boolean): SetSkjulVarsler {
    return {
        type: MeldingerActionTypes.SkjulVarsler,
        skjul: skjul
    };
}

export function huskSokAction(sok: string): HuskSok {
    return {
        type: MeldingerActionTypes.HuskSok,
        sok: sok
    };
}
