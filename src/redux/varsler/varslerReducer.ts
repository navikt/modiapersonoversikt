import type { Action } from 'redux';
import type { UnifiedVarsel } from '../../models/varsel';

export interface VarslerState {
    aapneVarsler: UnifiedVarsel[];
}

const initialState: VarslerState = {
    aapneVarsler: []
};

enum actionKeys {
    TOGGLE_VIS_VARSEL = 'TOGGLE_VIS_VARSEL'
}

interface ToggleVisAction extends Action {
    type: actionKeys.TOGGLE_VIS_VARSEL;
    varsel: UnifiedVarsel;
    vis: boolean;
}

type Actions = ToggleVisAction;

// biome-ignore lint/style/useDefaultParameterLast: biome migration
function varslerReducer(state: VarslerState = initialState, action: Actions): VarslerState {
    switch (action.type) {
        case actionKeys.TOGGLE_VIS_VARSEL: {
            // eslint-disable-next-line no-case-declarations
            const aapneVarsler = action.vis
                ? [...state.aapneVarsler, action.varsel]
                : state.aapneVarsler.filter((it) => it !== action.varsel);
            return {
                ...state,
                aapneVarsler: aapneVarsler
            };
        }
        default:
            return state;
    }
}

export default varslerReducer;
