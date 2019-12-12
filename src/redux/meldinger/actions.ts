import { Traad } from '../../models/meldinger/meldinger';
import { MeldingerActionTypes, HuskValgtTraad, SetSkjulVarsler } from './types';

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
