import { Traad } from '../../models/meldinger/meldinger';
import { MeldingerActionTypes, HuskValgtTraad } from './types';

export function huskForrigeValgtTraad(traad: Traad): HuskValgtTraad {
    return {
        type: MeldingerActionTypes.HuskValgtTraad,
        traad: traad
    };
}
