import { Action } from 'redux';
import { Varsel } from '../../models/varsel';

export interface VarslerState {
    aapneVarsler: Varsel[];
}

const initialState: VarslerState = {
    aapneVarsler: []
};

enum actionKeys {
    TOGGLE_VIS_VARSEL = 'TOGGLE_VIS_VARSEL'
}

interface ToggleVisAction extends Action {
    type: actionKeys.TOGGLE_VIS_VARSEL;
    varsel: Varsel;
    vis: boolean;
}

export function toggleVisVarsel(varsel: Varsel, vis: boolean): ToggleVisAction {
    return {
        type: actionKeys.TOGGLE_VIS_VARSEL,
        varsel: varsel,
        vis: vis
    };
}

type Actions = ToggleVisAction;

export function varslerReducer(state: VarslerState = initialState, action: Actions): VarslerState {
    switch (action.type) {
        case actionKeys.TOGGLE_VIS_VARSEL:
            const aapneVarsler = action.vis
                ? [...state.aapneVarsler, action.varsel]
                : state.aapneVarsler.filter(it => it !== action.varsel);
            return {
                ...state,
                aapneVarsler: aapneVarsler
            };
        default:
            return state;
    }
}

export default varslerReducer;
