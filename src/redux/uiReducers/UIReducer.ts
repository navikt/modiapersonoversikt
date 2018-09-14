import { Action } from 'redux';

export interface VisittkortAction extends Action {
    erApen: boolean;
}

export enum actions {
    TOGGLE_VISITTKORT = 'TOGGLE_VISITTKORT',
    TOGGLE_DIALOGPANEL = 'TOGGLE_DIALOGPANEL'
}

export interface UIState {
    visittkort: {
        apent: boolean
    };
    dialogPanel: {
        ekspandert: boolean
    };
}

export const initialUIState: UIState = {
    visittkort: {
        apent: false
    },
    dialogPanel: {
        ekspandert: false
    }
};

export function toggleVisittkort(erApent?: boolean) {
    return {
        type: actions.TOGGLE_VISITTKORT,
        erApen: erApent
    };
}

export function toggleDialogpanel() {
    return {
        type: actions.TOGGLE_DIALOGPANEL
    };
}

export default function reducer(state: UIState = initialUIState, action: Action) {
    switch (action.type) {
        case actions.TOGGLE_VISITTKORT:
            const erApen = (action as VisittkortAction).erApen;
            const nesteVerdi = erApen !== undefined ? erApen : !state.visittkort.apent;
            return {
                ...state,
                visittkort: {
                    ...state.visittkort,
                    apent: nesteVerdi
                }
            };
        case actions.TOGGLE_DIALOGPANEL:
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
