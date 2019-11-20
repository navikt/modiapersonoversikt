import { Action } from 'redux';
import { loggEvent } from '../../utils/frontendLogger';

export interface VisittkortAction extends Action {
    erApen?: boolean;
}

export interface DialogpanelAction extends Action {
    erApen?: boolean;
}

export enum UIActionTypes {
    TOGGLE_VISITTKORT = 'TOGGLE_VISITTKORT',
    TOGGLE_DIALOGPANEL = 'TOGGLE_DIALOGPANEL'
}

export interface UIState {
    visittkort: {
        apent: boolean;
    };
    dialogPanel: {
        ekspandert: boolean;
    };
}

export const initialUIState: UIState = {
    visittkort: {
        apent: false
    },
    dialogPanel: {
        ekspandert: true
    }
};

export function toggleVisittkort(erApent?: boolean): VisittkortAction {
    return {
        type: UIActionTypes.TOGGLE_VISITTKORT,
        erApen: erApent
    };
}

export function toggleDialogpanel(erApen?: boolean): DialogpanelAction {
    loggEvent('Toggle', 'MinimerDialogpanel');
    return {
        type: UIActionTypes.TOGGLE_DIALOGPANEL,
        erApen: erApen
    };
}

type Actions = VisittkortAction | DialogpanelAction;

function reducer(state: UIState = initialUIState, action: Actions) {
    switch (action.type) {
        case UIActionTypes.TOGGLE_VISITTKORT:
            const nesteVerdi = action.erApen !== undefined ? action.erApen : !state.visittkort.apent;
            return {
                ...state,
                visittkort: {
                    ...state.visittkort,
                    apent: nesteVerdi
                }
            };
        case UIActionTypes.TOGGLE_DIALOGPANEL:
            const ekspandert = action.erApen !== undefined ? action.erApen : !state.dialogPanel.ekspandert;
            return {
                ...state,
                dialogPanel: {
                    ...state.visittkort,
                    ekspandert: ekspandert
                }
            };
        default:
            return state;
    }
}

export default reducer;
