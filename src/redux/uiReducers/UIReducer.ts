import { Action } from 'redux';

export interface VisittkortAction extends Action {
    erApen: boolean;
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

export function toggleVisittkort(erApent?: boolean) {
    return {
        type: UIActionTypes.TOGGLE_VISITTKORT,
        erApen: erApent
    };
}

export function toggleDialogpanel() {
    return {
        type: UIActionTypes.TOGGLE_DIALOGPANEL
    };
}

function reducer(state: UIState = initialUIState, action: Action) {
    switch (action.type) {
        case UIActionTypes.TOGGLE_VISITTKORT:
            const erApen = (action as VisittkortAction).erApen;
            const nesteVerdi = erApen !== undefined ? erApen : !state.visittkort.apent;
            return {
                ...state,
                visittkort: {
                    ...state.visittkort,
                    apent: nesteVerdi
                }
            };
        case UIActionTypes.TOGGLE_DIALOGPANEL:
            return {
                ...state,
                dialogPanel: {
                    ...state.visittkort,
                    ekspandert: !state.dialogPanel.ekspandert
                }
            };
        default:
            return state;
    }
}

export default reducer;
