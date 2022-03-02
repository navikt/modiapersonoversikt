import { MeldingerActionTypes, HuskSok } from './types';

export function huskSokAction(sok: string): HuskSok {
    return {
        type: MeldingerActionTypes.HuskSok,
        sok: sok
    };
}
