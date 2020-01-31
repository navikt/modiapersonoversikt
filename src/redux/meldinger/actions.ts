import { MeldingerActionTypes, SetSkjulVarsler, HuskSok } from './types';

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
